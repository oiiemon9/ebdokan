import { connect } from '@/app/lib/dbConnect';
import { requireAuth } from '@/app/lib/security/requireAuth';
import { requireRole } from '@/app/lib/security/requireRole';

const VALID_TRANSITIONS = [
  'Order placed',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for delivery',
  'Delivered',
];

export async function PATCH(req, { params }) {
  try {
    // ================= SECURITY =================

    const session = await requireAuth();
    const roleCheck = requireRole(session, ['admin', 'sub-admin', 'moderator']);
    if (!roleCheck.success) {
      return Response.json(
        { message: roleCheck.message },
        { status: roleCheck.status },
      );
    }

    // ================= GET DATA =================
    const { orderId } = await params;
    const { status: newStatus } = await req.json();

    if (!newStatus) {
      return Response.json({ message: 'Status is required' }, { status: 400 });
    }
    const ordersCollection = await connect('orders');
    const order = await ordersCollection.findOne({
      orderId,
    });

    if (!order) {
      return Response.json({ message: 'Order not found' }, { status: 404 });
    }
    // ================= CURRENT STATUS =================
    const currentStatus =
      order.orderTimeline?.[order.orderTimeline.length - 1]?.status;
    if (!currentStatus) {
      return Response.json(
        { message: 'Current order status not found' },
        { status: 400 },
      );
    }

    // ================= NEXT STATUS CHECK =================

    const currentIndex = VALID_TRANSITIONS.indexOf(currentStatus);
    const nextStatus = VALID_TRANSITIONS[currentIndex + 1];

    // Order already delivered
    if (!nextStatus) {
      return Response.json(
        {
          message: 'Order is already completed',
        },
        {
          status: 400,
        },
      );
    }

    // শুধু next status-এই যেতে পারবে
    if (newStatus !== nextStatus) {
      return Response.json(
        {
          message: `Invalid status transition. Current status is "${currentStatus}" and next status must be "${nextStatus}"`,
        },
        {
          status: 400,
        },
      );
    }

    // ================= UPDATE =================

    const now = new Date();

    await ordersCollection.updateOne(
      { orderId },
      {
        $push: {
          orderTimeline: {
            status: newStatus,
            createdAt: now,
            updatedBy: {
              name: session.session.user.name,
              userId: session.session.user.userId,
              userRole: session.session.user.role,
            },
          },
        },

        $set: {
          orderStatus: newStatus,
          updatedAt: now,
        },
      },
    );

    return Response.json({
      success: true,
      message: 'Order status updated successfully',
      orderStatus: newStatus,
    });
  } catch (error) {
    console.error('Order status update error:', error);
    return Response.json(
      {
        success: false,
        message: 'Failed to update order status',
      },
      {
        status: 500,
      },
    );
  }
}
