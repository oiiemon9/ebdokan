import { connect } from '@/app/lib/dbConnect';
import { requireAuth } from '@/app/lib/security/requireAuth';
import { requireRole } from '@/app/lib/security/requireRole';

export async function GET() {
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

  const ordersCollection = await connect('users');
  const users = await ordersCollection.find().toArray();
  return Response.json(users);
}
