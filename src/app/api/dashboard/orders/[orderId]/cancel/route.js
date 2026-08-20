import { connect } from '@/app/lib/dbConnect';
import { requireAuth } from '@/app/lib/security/requireAuth';

export async function PATCH(req, { params }) {
  try {
    // ================= SECURITY =================

    const session = await requireAuth();

    // ================= GET DATA =================
    const { orderId } = await params;
    const {
      status: newStatus,
      cancelReason,
      cancelReasonId,
      cancelNote,
    } = await req.json();

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

    const nextStatus = 'Cancelled';

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
            reason: cancelReason || '',
            reasonId: cancelReasonId || '',
            note: cancelNote || '',
            createdAt: now,
            updatedBy: {
              name: session.user.name,
              userId: session.user.id,
              userRole: session.user.role,
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
