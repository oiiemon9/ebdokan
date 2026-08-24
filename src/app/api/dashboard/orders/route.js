import { connect } from '@/app/lib/dbConnect';

export async function GET(req) {
  const ordersCollection = await connect('orders');

  const newOrders = await ordersCollection
    .aggregate([
      // assignee.assignedTo → users.userId match
      {
        $lookup: {
          from: 'users',
          localField: 'assignee.assignedTo',
          foreignField: 'userId',
          as: 'assigneeUser',
        },
      },

      // Array থেকে object
      {
        $unwind: {
          path: '$assigneeUser',
          preserveNullAndEmptyArrays: true,
        },
      },

      // Assignee-এর ভিতরে user data যোগ
      {
        $addFields: {
          'assignee.name': '$assigneeUser.name',
          'assignee.email': '$assigneeUser.email',
          'assignee.phone': '$assigneeUser.phone',
        },
      },

      // Temporary field remove
      {
        $project: {
          assigneeUser: 0,
        },
      },
    ])
    .toArray();

  return Response.json(newOrders);
}
