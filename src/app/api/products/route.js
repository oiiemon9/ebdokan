import { connect } from '@/app/lib/dbConnect';

export async function GET(req) {
  const productsCollection = connect('products');
  const result = await productsCollection.find().toArray();
  return Response.json(result);
}

export async function POST(req) {
  const productsCollection = connect('products');
  const data = await req.json();
  console.log('Received product data:', data);
  const result = await productsCollection.insertOne(data);
  return Response.json(result);
}
