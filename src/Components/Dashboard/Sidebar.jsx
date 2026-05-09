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
          <div className="flex items-center justify-between gap-3 border-b border-base-300 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-base-content/50">
                Store
              </p>
              <h2 className="text-2xl font-bold text-primary">EB Dokan</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-square lg:hidden"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
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
