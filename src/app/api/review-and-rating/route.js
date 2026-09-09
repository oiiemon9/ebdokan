import { connect } from '@/app/lib/dbConnect';
import { requireAuth } from '@/app/lib/security/requireAuth';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  const reviewsCollection = await connect('reviews');
  const usersCollection = await connect('users');
  const ordersCollection = await connect('orders');
  const data = await req.json();

  // secure................................
  const session = await requireAuth();
  // secure................................

  const findUserInfo = await usersCollection.findOne(
    {
      userId: data.user.userId,
    },
    { projection: { name: 1, image: 1, role: 1 } },
  );

  if (!findUserInfo) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }

  if (data.user.userId !== session.user.id) {
    return Response.json(
      { message: 'You cannot review your own product' },
      { status: 403 },
    );
  }

  const myOrder = await ordersCollection.findOne({
    userId: data.user.userId,
    orderId: data.orderId,
  });
  if (!myOrder) {
    return Response.json(
      { message: 'You can only review products you have purchased' },
      { status: 403 },
    );
  }

  const existingReview = await reviewsCollection.findOne({
    'user.userId': data.user.userId,
    orderId: data.orderId,
    productId: new ObjectId(data.productId),
  });

  if (existingReview) {
    return Response.json(
      { message: 'You have already reviewed this product' },
      { status: 400 },
    );
  }

  const productId = data.productId;

  data.productId = new ObjectId(data.productId);
  data.user.name = findUserInfo?.name || '';
  data.user.image = findUserInfo?.image || '';
  data.user.role = findUserInfo?.role || '';
  data.createdAt = new Date();
  data.updatedAt = new Date();

  const result = await reviewsCollection.insertOne(data);

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
