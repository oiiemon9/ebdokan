import { connect } from '@/app/lib/dbConnect';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const identifier = searchParams.get('identifier');
  console.log(identifier);
  const usersCollection = await connect('users');
  const result = await usersCollection.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
    provider: { $in: ['register', 'google'] },
  });
  console.log(result);
  return Response.json(result);
}

export async function POST(req) {
  const usersCollection = connect('users');
  const data = await req.json();
  const result = await usersCollection.insertOne(data);
  return Response.json(result);
}
