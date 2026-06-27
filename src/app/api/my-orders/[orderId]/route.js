import { connect } from '@/app/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req, { params }) {
  const productsCollection = connect('orders');
  const session = await getServerSession(authOptions);
  const { orderId } = await params;
  console.log(session, orderId);
  const result = await productsCollection.findOne({
    userId: session.user.id,
    orderId: orderId,
  });

  return Response.json(result);
}
