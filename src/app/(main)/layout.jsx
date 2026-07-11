import React from 'react';
import RootWrapper from '../RootWrapper';
import NavBar from '@/Components/NavBar/NavBar';
import Footer from '@/Components/Footer/Footer';

export default function layout({ children }) {
  return (
    <RootWrapper>
      <main className="relative z-10 bg-[#F9FAFB] min-h-screen">
        <NavBar />
        {children}
      </main>

      <div className="sticky -bottom-[1100px] sm:-bottom-[600px] md:-bottom-64 lg:-bottom-32 z-0">
        <Footer />
      </div>
    </RootWrapper>
  );
}
