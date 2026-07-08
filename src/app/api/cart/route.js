import { connect } from '@/app/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

// GET — cart load
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ items: [] });

  const col = await connect('carts');
  const cart = await col.findOne({ userId });
  return NextResponse.json({ items: cart?.items || [] });
}

// POST — cart save/update
export async function POST(req) {
  const { items } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const col = await connect('carts');
  await col.updateOne(
    { userId: session.user.id },
    { $set: { userId: session.user.id, items, updatedAt: new Date() } },
    { upsert: true },
  );
  return NextResponse.json({ success: true });
}
