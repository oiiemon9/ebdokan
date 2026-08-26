import { connect } from '@/app/lib/dbConnect';
import { requireAuth } from '@/app/lib/security/requireAuth';
import { requireRole } from '@/app/lib/security/requireRole';

export async function GET(req, { params }) {
  // secure................................
  const session = await requireAuth();

  // 2. Authorization
  const roleCheck = requireRole(session, ['admin', 'sub-admin']);

  if (!roleCheck.success) {
    return Response.json(
      { message: roleCheck.message },
      { status: roleCheck.status },
    );
  }
  // secure................................
  const usersCollection = await connect('users');
  const { userId } = await params;
  const result = await usersCollection.findOne({
    userId: userId,
  });

  return Response.json(result);
}
