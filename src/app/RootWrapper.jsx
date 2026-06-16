'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import NavBar from '@/Components/NavBar/NavBar';
import { clearCart, loadCartFromDB } from '@/store/cartSlice';
import { persistor } from '@/store/store';

export default function RootWrapper({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const showNavbar = !pathname?.startsWith('/dashboard');

  useEffect(() => {
    if (
      (status === 'authenticated' && session?.user?.providerAccountId) ||
      session?.user?.id
    ) {
      dispatch(clearCart());
      dispatch(
        loadCartFromDB(session.user.providerAccountId || session?.user?.id),
      );
      return;
    }

    if (status === 'unauthenticated') {
      dispatch(clearCart());
      persistor.purge();
    }
  }, [dispatch, session, status]);

  return (
    <>
      {showNavbar && <NavBar />}
      {children}
    </>
  );
}
