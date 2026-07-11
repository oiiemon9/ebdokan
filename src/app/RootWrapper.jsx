'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { clearCart, loadCartFromDB } from '@/store/cartSlice';

export default function RootWrapper({ children }) {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      dispatch(loadCartFromDB(session.user.id));
    }
  }, [status, session?.user?.id, dispatch]);

  return children;
}
