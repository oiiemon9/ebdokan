import { connect } from '@/app/lib/dbConnect';

export async function GET() {
  const ordersCollection = await connect('orders');

  const ordersCount = await ordersCollection.countDocuments({
    orderStatus: {
      $nin: ['Delivered', 'Cancelled'],
    },
  });

  return Response.json(ordersCount);
}
