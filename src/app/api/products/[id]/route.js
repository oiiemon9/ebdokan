import { connect } from '@/app/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const productsCollection = connect('products');
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  const result = await productsCollection.findOne({ _id: new ObjectId(id) });
  if (!result) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(result);
}
