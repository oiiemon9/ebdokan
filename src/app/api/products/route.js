import { connect } from '@/app/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.role !== 'admin') {
    return Response.json({ message: 'Forbidden' }, { status: 403 });
  }
  const productsCollection = connect('products');
  const result = await productsCollection.find().toArray();
  return Response.json(result);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.role !== 'admin') {
    return Response.json({ message: 'Forbidden' }, { status: 403 });
  }
  const productsCollection = connect('products');
  const data = await req.json();
  const product = {
    ...data,
    createdAt: new Date(),
  };
  const result = await productsCollection.insertOne(product);
  return Response.json(result);
}
