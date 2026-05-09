'use client';

import { usePathname } from 'next/navigation';
import NavBar from '@/Components/NavBar/NavBar';

export default function RootWrapper({ children }) {
  const pathname = usePathname();
  const showNavbar = !pathname?.startsWith('/dashboard');

  return (
    <>
      {showNavbar && <NavBar />}
      {children}
    </>
  );
}
