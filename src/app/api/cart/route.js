import { connect } from '@/app/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

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
  const { userId, items } = await req.json();
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const col = await connect('carts');
  await col.updateOne(
    { userId },
    { $set: { userId, items, updatedAt: new Date() } },
    { upsert: true },
  );
  return NextResponse.json({ success: true });
}
