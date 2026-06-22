import { connect } from '@/app/lib/dbConnect';

const VALID_IPN_STATUSES = ['VALID', 'VALIDATED'];
const SSL_VALIDATION_URL =
  'https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php';

export async function POST(req) {
  const form = await req.formData();
  const data = Object.fromEntries(form.entries());

  const tran_id = data.tran_id?.toString();
  const val_id = data.val_id?.toString();

  if (!tran_id || !val_id) {
    return new Response(
      JSON.stringify({ error: 'Missing tran_id or val_id' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const orderCollection = await connect('orders');
  const order = await orderCollection.findOne({ tran_id });

  if (!order) {
    return new Response(JSON.stringify({ error: 'Order not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const storeId = process.env.SSLC_STORE_ID;
  const storePasswd = process.env.SSLC_STORE_PASSWORD;

  if (!storeId || !storePasswd) {
    return new Response(
      JSON.stringify({ error: 'Payment gateway credentials not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const validationUrl = `${SSL_VALIDATION_URL}?val_id=${encodeURIComponent(
    val_id,
  )}&store_id=${encodeURIComponent(storeId)}&store_passwd=${encodeURIComponent(
    storePasswd,
  )}&v=1&format=json`;

  const validationResponse = await fetch(validationUrl);
  if (!validationResponse.ok) {
    return new Response(
      JSON.stringify({ error: 'SSLCommerz validation failed' }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const validationData = await validationResponse.json();
  const status = validationData.status?.toUpperCase();

  if (!VALID_IPN_STATUSES.includes(status)) {
    return new Response(
      JSON.stringify({
        error: 'Payment validation rejected',
        validation: validationData,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  if (validationData.tran_id !== tran_id) {
    return new Response(JSON.stringify({ error: 'Transaction ID mismatch' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const amount = Number(validationData.amount ?? validationData.amount); // fallback
  const expectedAmount = Number(order.total ?? 0);

  if (Number.isFinite(amount) && amount !== expectedAmount) {
    return new Response(
      JSON.stringify({
        error: 'Amount mismatch',
        expected: expectedAmount,
        received: amount,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  if (order.paymentStatus === 'paid') {
    return new Response(JSON.stringify({ status: 'already_paid' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await orderCollection.updateOne(
    { tran_id },
    {
      $set: {
        paymentStatus: 'paid',
        paymentVerified: true,
        paymentVerification: {
          status: validationData.status,
          val_id: validationData.val_id,
          bank_tran_id: validationData.bank_tran_id,
          currency: validationData.currency,
          amount: Number(validationData.amount ?? 0),
          card_type: validationData.card_type,
          card_no: validationData.card_no,
          verify_sign: validationData.verify_sign,
          tran_date: validationData.tran_date,
        },
      },
    },
  );

  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
