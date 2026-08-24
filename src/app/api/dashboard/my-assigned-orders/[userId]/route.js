import { connect } from '@/app/lib/dbConnect';
import { requireAuth } from '@/app/lib/security/requireAuth';
import { requireRole } from '@/app/lib/security/requireRole';

export async function GET(req, { params }) {
  const { userId } = await params;
  // secure................................
  const session = await requireAuth();

  if (session.user.id !== userId) {
    return Response.json({ message: 'Unauthorized access' }, { status: 403 });
  }

  // 2. Authorization
  const roleCheck = requireRole(session, ['admin', 'sub-admin', 'moderator']);

  if (!roleCheck.success) {
    return Response.json(
      { message: roleCheck.message },
      { status: roleCheck.status },
    );
  }
  // secure................................

  const ordersCollection = await connect('orders');

  const myOrders = await ordersCollection
    .aggregate([
      {
        $match: {
          'assignee.assignedTo': userId,
        },
      },

      {
        $addFields: {
          statusPriority: {
            $cond: [
              {
                $in: ['$orderStatus', ['Delivered', 'Cancelled']],
              },
              1,
              0,
            ],
          },
        },
      },

      {
        $sort: {
          statusPriority: 1,
          createAt: -1,
        },
      },

      {
        $unset: 'statusPriority',
      },
    ])
    .toArray();
  return Response.json(myOrders);
}
