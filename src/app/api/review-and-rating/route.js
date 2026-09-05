import { connect } from '@/app/lib/dbConnect';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  const productsCollection = await connect('reviews');
  const usersCollection = await connect('users');
  const ordersCollection = await connect('orders');
  const data = await req.json();
  const findUserInfo = await usersCollection.findOne(
    {
      userId: data.user.userId,
    },
    { projection: { name: 1, image: 1, role: 1 } },
  );

  const productId = data.productId;

  data.productId = new ObjectId(data.productId);
  data.user.name = findUserInfo?.name || '';
  data.user.image = findUserInfo?.image || '';
  data.user.role = findUserInfo?.role || '';
  data.createdAt = new Date();
  data.updatedAt = new Date();

  const result = await productsCollection.insertOne(data);

  console.log(result);

  if (result.acknowledged) {
    await ordersCollection.updateOne(
      {
        orderId: data.orderId,
        'items.productId': productId,
      },
      {
        $set: {
          'items.$.review': true,
        },
      },
    );
  }

  return Response.json(result);
}
