import { connect } from '@/app/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const usersCollection = await connect('users');
  const session = await getServerSession(authOptions);
  const result = await usersCollection.findOne(
    { userId: session?.user?.id },
    {
      projection: {
        password: 0,
      },
    },
  );
  return Response.json(result);
}
export async function PATCH(req) {
  const body = await req.json();
  const users = await connect('users');
  const session = await getServerSession(authOptions);
  const user = await users.findOne({
    userId: session.user.id,
  });

  const updateData = {};
  if (body.name !== user.name) updateData.name = body.name;
  if (user.authType !== 'phone') {
    if (body.phone !== user.phone) updateData.phone = body.phone;
  }
  if (body.address !== user.address) updateData.address = body.address;
  if (body.district !== user.district) updateData.district = body.district;
  if (body.postalCode !== user.postalCode)
    updateData.postalCode = body.postalCode;
  if (user.authType === 'phone') {
    if (body.email !== user.email) updateData.email = body.email;
  }

  if (Object.keys(updateData).length > 0) {
    await users.updateOne(
      { userId: user.userId },
      {
        $set: updateData,
      },
    );
  }

  if (Object.keys(updateData).length > 0) {
    const update = await users.findOne(
      {
        userId: session.user.id,
      },
      {
        projection: {
          password: 0,
        },
      },
    );
    return Response.json({
      updated: Object.keys(updateData).length > 0,
      update,
    });
  } else {
    return Response.json({
      updated: Object.keys(updateData).length > 0,
      update: {},
    });
  }
}
