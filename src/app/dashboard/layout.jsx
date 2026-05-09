'use client';

import { useState } from 'react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardNavbar from '@/Components/NavBar/DashboardNavbar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-100 flex ">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="w-full">
        <DashboardNavbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
