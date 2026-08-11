import { connect } from '@/app/lib/dbConnect';

export async function GET(req, { params }) {
  const ordersCollection = await connect('orders');
  const { orderId } = await params;
  const order = await ordersCollection.findOne({ orderId: orderId });
  return Response.json(order);
}
