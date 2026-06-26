import { connect } from '@/app/lib/dbConnect';

export async function GET(req, { params }) {
  const usersCollection = connect('users');
  const { id } = await params;
  const res = await usersCollection.findOne({ userId: id });
  return Response.json(res);
}
