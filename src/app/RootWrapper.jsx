'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import NavBar from '@/Components/NavBar/NavBar';
import { clearCart, loadCartFromDB } from '@/store/cartSlice';
import Footer from '@/Components/Footer/Footer';

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
      <main className="relative z-10 bg-[#F9FAFB] min-h-screen">
        {showNavbar && <NavBar />}
        {children}
      </main>

      <div className="sticky -bottom-[1100px] sm:-bottom-[600px] md:-bottom-64 lg:-bottom-32 z-0">
        <Footer />
      </div>
    </>
  );
}
