import { connect } from '@/app/lib/dbConnect';

export async function GET() {
  const usersCollection = await connect('users');

  const staff = await usersCollection
    .aggregate([
      {
        $match: {
          role: {
            $nin: ['user'],
          },
        },
      },

      {
        $lookup: {
          from: 'orders',
          let: {
            userId: '$userId',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$assignee.assignedTo', '$$userId'],
                },
              },
            },
            {
              $count: 'count',
            },
          ],
          as: 'orderCount',
        },
      },

      {
        $addFields: {
          activeOrders: {
            $ifNull: [
              {
                $arrayElemAt: ['$orderCount.count', 0],
              },
              0,
            ],
          },
        },
      },

      {
        $project: {
          _id: 0,
          userId: 1,
          name: 1,
          role: 1,
          email: 1,
          activeOrders: 1,
        },
      },
    ])
    .toArray();

  return Response.json(staff);
}
