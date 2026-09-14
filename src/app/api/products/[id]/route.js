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

export async function PATCH(req, { params }) {
  const productsCollection = connect('products');
  const { id } = await params;
  const body = await req.json();
  console.log(id, body);

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  const product = await productsCollection.findOne({ _id: new ObjectId(id) });
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  const result = await productsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: body },
  );
  return NextResponse.json(result);
}
