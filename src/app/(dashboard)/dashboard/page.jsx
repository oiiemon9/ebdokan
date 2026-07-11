'use client';

import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Products', value: '128', icon: '📦' },
    { label: 'Total Orders', value: '856', icon: '🛒' },
    { label: 'Total Revenue', value: '$45,230', icon: '💰' },
    { label: 'Active Users', value: '2,340', icon: '👥' },
  ];

  return (
    <div>
      <DashboardHeader
        title="Welcome to Dashboard"
        description="Manage your store and products efficiently"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md border border-base-300"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/60 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-lg">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/dashboard/add-product"
                className="btn btn-primary btn-sm w-full justify-start"
              >
                <span>➕</span> Add New Product
              </Link>
              <button className="btn btn-outline btn-sm w-full justify-start">
                <span>📊</span> View Reports
              </button>
              <button className="btn btn-outline btn-sm w-full justify-start">
                <span>👥</span> Manage Users
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-lg">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xl">📝</span>
                <div>
                  <p className="text-sm font-semibold">New order received</p>
                  <p className="text-xs text-base-content/60">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">⭐</span>
                <div>
                  <p className="text-sm font-semibold">New product review</p>
                  <p className="text-xs text-base-content/60">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">👤</span>
                <div>
                  <p className="text-sm font-semibold">New user registered</p>
                  <p className="text-xs text-base-content/60">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
