import { connect } from '@/app/lib/dbConnect';

export async function GET() {
  const newOrdersCollection = await connect('orders');
  const newOrders = await newOrdersCollection
    .find({
      orderStatus: {
        $nin: ['Delivered', 'Cancelled'],
      },
    })
    .toArray();

  return Response.json(newOrders);
}
