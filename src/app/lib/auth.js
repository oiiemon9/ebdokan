import { getToken } from 'next-auth/jwt';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;

export async function getLoggedInToken(req) {
  if (!req) return null;
  return getToken({ req, secret: NEXTAUTH_SECRET });
}

export async function getLoggedInUser(req) {
  const token = await getLoggedInToken(req);
  if (!token) return null;

  return {
    id: token.id,
    email: token.email,
    name: token.name,
    phone: token.phone,
    role: token.role,
  };
}
