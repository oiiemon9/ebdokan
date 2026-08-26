'use client';

import { useState } from 'react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardNavbar from '@/Components/NavBar/DashboardNavbar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full">
      <div className="h-fit sticky top-0 z-40">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 overflow-hidden">
        <DashboardNavbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1  bg-base-200/40">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
