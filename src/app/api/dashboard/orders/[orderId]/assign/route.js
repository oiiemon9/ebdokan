import { connect } from '@/app/lib/dbConnect';

export async function PATCH(req, { params }) {
  const ordersCollection = await connect('orders');
  const usersCollection = await connect('users');
  const { orderId } = await params;
  const body = await req.json();
  const { assignedTo } = body;

  console.log('assignedto', assignedTo);

  if (!assignedTo) {
    return Response.json({ message: 'Staff ID is required' }, { status: 400 });
  }
  // 4. যাকে assign করা হচ্ছে সে সত্যিই staff কিনা check
  const staff = await usersCollection.findOne({
    userId: assignedTo,
    role: {
      $nin: ['user'],
    },
  });

  // তোমার user _id যদি ObjectId হয়, তাহলে নিচের অংশ দেখো
  if (!staff) {
    return Response.json({ message: 'Invalid staff member' }, { status: 400 });
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
