'use client';

import { apiFetch } from '@/app/lib/api';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

// User er Role (Admin/User/Moderator) dekhanor jonno Badge
function RoleBadge({ role }) {
  const styles = {
    admin: 'badge-primary',
    moderator: 'badge-secondary',
    user: 'badge-ghost',
  };
  return (
    <span
      className={`badge badge-sm rounded-lg font-medium capitalize text-nowrap ${
        styles[role?.toLowerCase()] || 'badge-ghost'
      }`}
    >
      {role || 'Unknown'}
    </span>
  );
}

// User kivabe login koreche (Google/Facebook/Phone) seta dekhanor jonno Badge
function AuthBadge({ type }) {
  const styles = {
    google: 'badge-error text-white',
    facebook: 'badge-info text-white',
    phone: 'badge-success text-white',
  };
  return (
    <span
      className={`badge badge-sm rounded-lg font-medium capitalize ${
        styles[type?.toLowerCase()] || 'badge-ghost'
      }`}
    >
      {type}
    </span>
  );
}

// Loading state er jonno Skeleton
function UserSkeleton() {
  return (
    <tr>
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className="skeleton h-4 w-full rounded-md" />
        </td>
      ))}
    </tr>
  );
}

// Date format korar function
function formatDateTime(dateVal) {
  if (!dateVal) return '';
  const d = new Date(dateVal?.$date ?? dateVal);
  return d.toLocaleString('en-BD', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Table er protteti sari (Row)
function UserRow({ user }) {
  console.log(user.image);
  return (
    <tr className="hover:bg-base-200/40 transition-colors">
      {/* User Profile (Image, Name, ID) */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-14 h-14 relative overflow-hidden">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'User'}
                  fill
                  sizes="64px"
                  quality={75}
                  className="object-cover"
                />
              ) : (
                <div className="bg-neutral text-neutral-content flex h-full w-full items-center justify-center text-lg font-bold">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="font-semibold text-sm">{user.name}</div>
            <div className="text-[11px] text-base-content/40">
              ID: {user.userId}
            </div>
          </div>
        </div>
      </td>

      {/* Contact Info */}
      <td className="px-4 py-3">
        <div className="font-medium text-sm">{user.phone || 'No phone'}</div>
        <div className="text-[11px] text-base-content/40">
          {user.email || 'No email'}
        </div>
      </td>

      {/* Role */}
      <td className="px-4 py-3">
        <RoleBadge role={user.role} />
      </td>

      {/* Auth Provider */}
      <td className="px-4 py-3">
        <AuthBadge type={user.authType || user.provider} />
      </td>

      {/* Balance */}
      <td className="px-4 py-3">
        <div className="text-sm font-semibold">৳{user.balance || 0}</div>
      </td>

      {/* Joined Date & Location */}
      <td className="px-4 py-3">
        <div className="text-sm">{formatDateTime(user.createdAt)}</div>
        <div className="text-[11px] text-base-content/40">
          {user.district || 'Location N/A'}
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <Link
          href={`/dashboard/users/${user.userId}`}
          className="btn btn-xs btn-ghost rounded-lg border border-base-300 font-semibold text-xs"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default function UsersPage() {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiFetch('/api/dashboard/users'),
  });

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="All Users"
        description="Manage all registered users"
      />

      <div className="mt-6 w-full overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-200 px-5 py-4">
          <label className="input input-sm input-bordered flex w-full max-w-xs items-center gap-2 rounded-xl transition-colors focus-within:border-primary">
            <svg
              className="h-3.5 w-3.5 text-base-content/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path
                d="m21 21-4.35-4.35"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search users by name, phone…"
              className="grow bg-transparent text-sm outline-none"
            />
          </label>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost gap-1.5 rounded-xl border border-base-300 text-xs font-semibold">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4h18M7 8h10M11 12h2"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead>
              <tr className="bg-base-50 text-xs uppercase tracking-wider text-base-content/50">
                <th className="px-4 py-3 font-semibold">User Profile</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Auth</th>
                <th className="px-4 py-3 font-semibold">Balance</th>
                <th className="px-4 py-3 font-semibold">Joined / Location</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <UserSkeleton key={i} />
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-error">
                    <p className="font-semibold">Failed to load users</p>
                    <p className="mt-1 text-xs text-base-content/50">
                      {error?.message}
                    </p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-16 text-center text-base-content/40"
                  >
                    <div className="mb-3 text-4xl">👥</div>
                    <p className="text-base font-semibold">No users found</p>
                    <p className="mt-1 text-xs">
                      Registered users will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                users.map((user) => <UserRow key={user._id} user={user} />)
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        {!isLoading && (
          <div className="flex items-center justify-between border-t border-base-200 px-5 py-3 text-xs text-base-content/50">
            <span>
              Showing {users.length} user{users.length !== 1 ? 's' : ''}
            </span>
            <div className="flex gap-1">
              <button className="btn btn-xs btn-ghost rounded-lg">
                ← Prev
              </button>
              <button className="btn btn-xs btn-ghost rounded-lg">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
