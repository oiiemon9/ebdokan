import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import CheckoutLProgress from './CheckoutProgress';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function layout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }
  return <CheckoutLProgress>{children}</CheckoutLProgress>;
}
