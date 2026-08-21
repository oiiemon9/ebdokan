import { connect } from '@/app/lib/dbConnect';
import { requireAuth } from '@/app/lib/security/requireAuth';
import { requireRole } from '@/app/lib/security/requireRole';

export async function PATCH(req, { params }) {
  const ordersCollection = await connect('orders');
  const usersCollection = await connect('users');
  const { orderId } = await params;
  const body = await req.json();
  const { assignedTo } = body;

  // secure.............................................
  const session = await requireAuth();

  // 2. Authorization
  const roleCheck = requireRole(session, ['admin', 'sub-admin']);

  if (!roleCheck.success) {
    return Response.json(
      { message: roleCheck.message },
      { status: roleCheck.status },
    );
  }

  // secure.............................end................

  if (!assignedTo) {
    return Response.json({ message: 'Staff ID is required' }, { status: 400 });
  }

  const order = await ordersCollection.findOne({ orderId });

  if (!order) {
    return Response.json({ message: 'Order not found' }, { status: 404 });
  }

  const orderLastStatus =
    order.orderTimeline?.[order.orderTimeline.length - 1]?.status;

  if (orderLastStatus === 'Cancelled' || orderLastStatus === 'Delivered') {
    return Response.json(
      {
        message: `Cannot assign order. Current status is "${orderLastStatus}"`,
      },
      { status: 400 },
    );
  }

  // 4. যাকে assign করা হচ্ছে সে সত্যিই staff কিনা check
  const staff = await usersCollection.findOne({
    userId: assignedTo,
    role: {
      $nin: ['user'],
    },
  });

  if (!staff) {
    return Response.json({ message: 'Invalid staff' }, { status: 400 });
  }

  const result = await ordersCollection.updateOne(
    { orderId: orderId },
    {
      $set: {
        'assignee.assignedTo': assignedTo,
        'assignee.assignedAt': new Date(),
        updatedAt: new Date(),
      },

      $push: {
        'assignee.assignmentHistory': assignedTo,
      },
    },
  );

  if (result.matchedCount === 0) {
    return Response.json({ message: 'Order not found' }, { status: 404 });
  }

  return Response.json({
    success: true,
    message: 'Order assigned successfully',
  });
}
