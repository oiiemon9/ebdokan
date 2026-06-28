import { connect } from '@/app/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const productsCollection = await connect('orders');
  const session = await getServerSession(authOptions);
  const result = await productsCollection
    .find({
      userId: session.user.id,
    })
    .toArray();

  return Response.json(result);
}
