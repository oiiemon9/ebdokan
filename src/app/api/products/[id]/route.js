import { connect } from '@/app/lib/dbConnect';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const productsCollection = connect('products');
  const { id } = await params;
  console.log('Received product ID:', id);
  const result = await productsCollection.findOne({ _id: new ObjectId(id) });
  return Response.json(result);
}
