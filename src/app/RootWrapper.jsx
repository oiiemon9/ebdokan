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
    if (status === 'authenticated' && session?.user?.id) {
      dispatch(loadCartFromDB(session.user.id));
    }
  }, [status, session?.user?.id, dispatch]);

  return (
    <>
      {showNavbar && <NavBar />}
      {children}
    </>
  );
}
