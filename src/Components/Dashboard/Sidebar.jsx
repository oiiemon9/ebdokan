'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Add Product', path: '/dashboard/add-product', icon: '➕' },
    { name: 'Products', path: '/dashboard/products', icon: '📦' },
    { name: 'Orders', path: '/dashboard/orders', icon: '🛒' },
    { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 border-r border-base-300 bg-base-200 p-4 shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0  ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-3 border-b border-base-300 pb-4 relative">
            <div className="w-full">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border border-primary/20 shadow-sm">
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150"></div>
                    <img
                      src="/EbDokanLogo.png"
                      alt="EB Dokan Logo"
                      className="relative h-12 w-auto object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary-focus/10 rounded-full translate-y-8 -translate-x-8"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pt-4">
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
                <p className="text-sm text-base-content/60">Welcome back</p>
                <p className="text-lg font-semibold">Admin</p>
                <p className="text-xs text-base-content/60">
                  Manage products and orders
                </p>
              </div>

              <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-base-content/50">
                  Menu
                </p>
                <ul className="menu menu-vertical w-full gap-1">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        onClick={onClose}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                          isActive(item.path)
                            ? 'bg-primary text-white'
                            : 'text-base-content hover:bg-base-300'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 block">
              <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
                <p className="text-sm font-semibold">Need help?</p>
                <p className="text-sm text-base-content/60">
                  Contact support or review store settings.
                </p>
                <button className="btn btn-xs btn-primary mt-4 w-full">
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
