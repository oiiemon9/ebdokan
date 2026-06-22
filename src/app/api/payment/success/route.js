import { connect } from '@/app/lib/dbConnect';

const getTranId = async (req) => {
  let tran_id = null;

  if (req.method === 'POST') {
    const form = await req.formData();
    tran_id = form.get('tran_id');
  }

  if (!tran_id) {
    const url = new URL(req.url);
    tran_id = url.searchParams.get('tran_id');
  }

  return tran_id;
};

export async function handleRequest(req) {
  const tran_id = await getTranId(req);
  const db = await connect('orders');

  if (tran_id) {
    await db.updateOne({ tran_id }, { $set: { paymentStatus: 'paid' } });
  }

  return Response.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/order-success?type=ssl&tran_id=${tran_id ?? ''}`,
  );
}

export async function POST(req) {
  return handleRequest(req);
}

export async function GET(req) {
  return handleRequest(req);
}
