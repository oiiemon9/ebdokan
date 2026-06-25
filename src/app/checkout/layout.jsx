import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import CheckoutLProgress from './CheckoutProgress';

export default function layout({ children }) {
  const session = getServerSession();
  console.log(session);
  if (!session) {
    redirect('/login');
  }
  return <CheckoutLProgress>{children}</CheckoutLProgress>;
}
