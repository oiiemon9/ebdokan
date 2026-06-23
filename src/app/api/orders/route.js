import { connect } from '@/app/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const session = await getServerSession();

    const order = {
      ...body,
      userId: session?.user?.id || null,
      userEmail: session?.user?.email || body.shippingInfo?.email,
      createdAt: new Date(),
    };

    const col = await connect('orders');
    const result = await col.insertOne(order);

    return NextResponse.json(
      { orderId: result.insertedId.toString() },
      { status: 201 },
    );
  } catch (err) {
    console.error('Order error:', err);
    return NextResponse.json(
      { error: 'Failed to place order' },
      { status: 500 },
    );
  }
}

// GET — user orders
export async function GET(req) {
  const tran_id = req.nextUrl.searchParams.get('tran_id');
  const col = await connect('orders');

  if (tran_id) {
    const order = await col.findOne({ tran_id });
    if (!order)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    return NextResponse.json(order);
  }

  const session = await getServerSession();
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const orders = await col
    .find({ userEmail: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(orders);
}
