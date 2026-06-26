import { connect } from '@/app/lib/dbConnect';

export async function POST(req) {
  const usersCollection = connect('users');
  const data = await req.json();
  const result = await usersCollection.insertOne(data);
  return Response.json(result);
}
