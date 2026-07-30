import { signOut } from 'next-auth/react';

export async function getHotDeals() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/hotDeals`,
    { cache: 'no-store' },
  );
  return res.json();
}
export async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
    { cache: 'no-store' },
  );
  if (res.status === 404) return null;

  if (!res.ok) throw new Error('Failed to fetch product');

  return await res.json();
}

export async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
  });

  if (res.status === 401 || res.status === 403) {
    await signOut({
      callbackUrl: '/login',
    });

    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return res.json();
}
