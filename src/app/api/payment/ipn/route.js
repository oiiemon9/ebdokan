import { connect } from '@/app/lib/dbConnect';

// SSLCommerz validation URL
const VALIDATION_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://securepay.sslcommerz.com/validator/api/validationserverAPI.php'
    : 'https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php';

// Helper: Parse form data
async function parseFormData(req) {
  try {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await req.text();
      return Object.fromEntries(new URLSearchParams(text));
    }

    if (contentType.includes('application/json')) {
      return await req.json();
    }

    const formData = await req.formData();
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  } catch (error) {
    console.error('❌ Parse error:', error);
    return {};
  }
}

// Helper: Validate with SSLCommerz
async function validateTransaction(val_id) {
  const params = new URLSearchParams({
    val_id: val_id,
    store_id: process.env.SSLC_STORE_ID,
    store_passwd: process.env.SSLC_STORE_PASSWORD,
    format: 'json',
  });

  const response = await fetch(`${VALIDATION_URL}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Validation failed: ${response.status}`);
  }

  return await response.json();
}

// Main IPN Handler
export async function POST(req) {
  console.log('🔔 IPN received at:', new Date().toISOString());

  try {
    // Parse incoming data
    const ipnData = await parseFormData(req);
    console.log('📥 IPN Data:', ipnData);

    const { tran_id, val_id, status, amount } = ipnData;

    // Validate required fields
    if (!tran_id || !val_id) {
      console.error('❌ Missing required fields');
      return new Response('Missing fields', { status: 400 });
    }

    // Check transaction status from IPN
    const ipnStatus = status?.toUpperCase();

    if (!['VALID', 'VALIDATED'].includes(ipnStatus)) {
      console.log('⚠️ Invalid IPN status:', ipnStatus);

      // Update order as failed
      const orderCollection = await connect('orders');
      await orderCollection.updateOne(
        { tran_id },
        {
          $set: {
            paymentStatus: 'failed',
            ipnStatus: ipnStatus,
            updatedAt: new Date(),
          },
        },
      );

      return new Response('Payment not valid', { status: 200 });
    }

    // Validate with SSLCommerz server
    console.log('🔍 Validating with SSLCommerz...');
    const validation = await validateTransaction(val_id);
    console.log('✅ Validation response:', validation);

    const validationStatus = validation.status?.toUpperCase();

    if (!['VALID', 'VALIDATED'].includes(validationStatus)) {
      console.error('❌ Validation failed:', validationStatus);
      return new Response('Validation failed', { status: 200 });
    }

    // Find order
    const orderCollection = await connect('orders');
    const order = await orderCollection.findOne({ tran_id });

    if (!order) {
      console.error('❌ Order not found:', tran_id);
      return new Response('Order not found', { status: 404 });
    }

    // Check if already paid
    if (order.paymentStatus === 'paid') {
      console.log('ℹ️ Already paid:', tran_id);
      return new Response('Already processed', { status: 200 });
    }

    // Verify amount
    const receivedAmount = parseFloat(validation.amount || amount || 0);
    const expectedAmount = parseFloat(order.total || 0);

    if (Math.abs(receivedAmount - expectedAmount) > 1) {
      console.error('❌ Amount mismatch:', { receivedAmount, expectedAmount });

      await orderCollection.updateOne(
        { tran_id },
        {
          $set: {
            paymentStatus: 'failed',
            failReason: 'amount_mismatch',
            updatedAt: new Date(),
          },
        },
      );

      return new Response('Amount mismatch', { status: 200 });
    }

    // ✅ Update order as paid
    const updateResult = await orderCollection.updateOne(
      { tran_id },
      {
        $set: {
          paymentStatus: 'paid',
          paymentVerified: true,
          paidAt: new Date(),
          updatedAt: new Date(),
          paymentDetails: {
            val_id: validation.val_id,
            bank_tran_id: validation.bank_tran_id,
            card_type: validation.card_type,
            card_no: validation.card_no,
            card_issuer: validation.card_issuer,
            amount: receivedAmount,
            currency: validation.currency_type,
            tran_date: validation.tran_date,
            store_amount: validation.store_amount,
            currency_amount: validation.currency_amount,
          },
        },
      },
    );

    console.log('✅ Order updated:', updateResult);

    // Clear user cart
    // try {
    //   const cartCollection = await connect('carts');
    //   await cartCollection.updateOne(
    //     { userId: order.userId },
    //     {
    //       $set: {
    //         items: [],
    //         updatedAt: new Date()
    //       }
    //     }
    //   );
    //   console.log('🛒 Cart cleared for user:', order.userId);
    // } catch (cartError) {
    //   console.error('⚠️ Cart clear failed:', cartError);
    // }

    console.log('✅ IPN processed successfully:', tran_id);
    return new Response('SUCCESS', { status: 200 });
  } catch (error) {
    console.error('🔥 IPN Error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

// GET method (for testing)
export async function GET(req) {
  console.log('⚠️ IPN GET called (should be POST)');
  return new Response('IPN endpoint - POST only', { status: 200 });
}
