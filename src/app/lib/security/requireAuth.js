import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (!session?.user) {
    return null;
  }

  return session;
}
