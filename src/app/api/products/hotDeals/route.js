import { connect } from '@/app/lib/dbConnect';

export async function GET(req) {
  const productsCollection = connect('products');
  const result = await productsCollection.find().toArray();
  return Response.json(result);
}
