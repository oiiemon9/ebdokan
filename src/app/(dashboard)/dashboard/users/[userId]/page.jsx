'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/app/lib/api';
import Link from 'next/link';

// Date Format Function
function formatDate(dateVal) {
  if (!dateVal) return 'N/A';
  const d = new Date(dateVal?.$date ?? dateVal);
  return d.toLocaleDateString('en-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// Loading Skeleton matching the new layout
function ProfileSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse">
      <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm">
        <div className="h-40 w-full bg-base-200"></div>
        <div className="px-6 pb-10 sm:px-10">
          <div className="-mt-16 mb-6 h-32 w-32 rounded-full border-4 border-base-100 bg-base-300"></div>
          <div className="mb-8 h-8 w-64 rounded-lg bg-base-200"></div>
          <div className="h-64 w-full rounded-[1.5rem] bg-base-200"></div>
          <div className="mt-6 h-24 w-full rounded-[1.5rem] bg-base-200"></div>
        </div>
      </div>
    </div>
  );
}

export default function UserDetailsPage() {
  const { userId } = useParams();
  const router = useRouter();

  // Fetch Single User Data
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => apiFetch(`/api/dashboard/users/${userId}`),
    enabled: !!userId,
  });

  // ==========================================
  // Mock Order Data (API theke data asle eta replace kore diben)
  // ==========================================
  const mockOrders = [
    {
      id: '#ORD-89012',
      date: '2026-08-20T10:30:00Z',
      items: 3,
      total: 4500,
      status: 'Delivered',
    },
    {
      id: '#ORD-89033',
      date: '2026-08-22T14:20:00Z',
      items: 1,
      total: 1200,
      status: 'Processing',
    },
    {
      id: '#ORD-89045',
      date: '2026-08-24T09:15:00Z',
      items: 2,
      total: 3200,
      status: 'Cancelled',
    },
    {
      id: '#ORD-89050',
      date: '2026-08-25T16:45:00Z',
      items: 4,
      total: 6500,
      status: 'Delivered',
    },
  ];

  // Order stats calculation
  const totalOrders = mockOrders.length;
  const deliveredCount = mockOrders.filter(
    (o) => o.status === 'Delivered',
  ).length;
  const cancelledCount = mockOrders.filter(
    (o) => o.status === 'Cancelled',
  ).length;
  // Shudhumatro Delivered order er total taka hisab kora hocche
  const totalSpent = mockOrders
    .filter((o) => o.status === 'Delivered')
    .reduce((sum, order) => sum + order.total, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 lg:p-8">
        <ProfileSkeleton />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-4 text-6xl">😕</div>
        <h2 className="text-2xl font-bold text-base-content">User Not Found</h2>
        <p className="mt-2 text-base-content/60">
          The user you are looking for does not exist.
        </p>
        <button
          onClick={() => router.back()}
          className="btn btn-primary mt-6 rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10 sm:p-6">
      <div className="mx-auto w-full max-w-5xl">
        {/* Main Wrapper Card */}
        <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm">
          {/* Top Gradient Banner (Soft Teal/Green matching the image) */}
          <div className="h-32 w-full bg-gradient-to-r from-[#dcfce7] to-[#ccfbf1] sm:h-40"></div>

          <div className="px-6 pb-10 sm:px-10">
            {/* Header: Avatar, Name & Action */}
            <div className="flex flex-col items-start justify-between sm:flex-row">
              <div>
                <div className="avatar -mt-16 mb-4 sm:-mt-20">
                  <div className="w-28 rounded-full border-[5px] border-base-100 bg-base-200 shadow-sm sm:w-36">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-base-200 text-5xl font-bold text-base-content/40">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-base-content tracking-tight">
                    {user.name}
                  </h1>
                  {user.emailVerified && (
                    <span className="badge border-none bg-success/10 px-3 py-3 font-semibold text-success gap-1.5 text-xs">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified Profile
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm font-medium text-base-content/60">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Start Date: {formatDate(user.createdAt)}
                </div>
              </div>

              <div className="mt-6 sm:mt-4">
                <button className="btn btn-outline border-base-300 text-base-content hover:bg-base-200 rounded-xl px-6 gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Profile Details Nested Card */}
            <div className="mt-8 rounded-[1.5rem] border border-base-300 p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-base-content">
                  Profile details
                </h2>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-base-content/70 hover:text-base-content">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Single Item: Full Name */}
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div>
                    <p className="text-[12px] text-base-content/50">
                      Full Name
                    </p>
                    <p className="text-sm font-semibold text-base-content">
                      {user.name}
                    </p>
                  </div>
                </div>

                {/* Single Item: Email */}
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-[12px] text-base-content/50">Email</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-base-content">
                        {user.email || 'N/A'}
                      </p>
                      {user.emailVerified && (
                        <span className="badge border-none bg-success/10 px-2 py-2 text-[10px] font-bold text-success gap-1">
                          <svg
                            className="h-3 w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Email Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Single Item: Role (Instead of Date of birth) */}
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <div>
                    <p className="text-[12px] text-base-content/50">
                      User Role
                    </p>
                    <p className="text-sm font-semibold text-base-content uppercase">
                      {user.role}
                    </p>
                  </div>
                </div>

                {/* Single Item: User ID (Instead of Username) */}
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                  <div>
                    <p className="text-[12px] text-base-content/50">User ID</p>
                    <p className="text-sm font-semibold text-base-content">
                      {user._id}
                    </p>
                  </div>
                </div>

                {/* Single Item: Number */}
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="text-[12px] text-base-content/50">Number</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-base-content">
                        {user.phone || 'N/A'}
                      </p>
                      {user.phone && (
                        <span className="badge border-none bg-success/10 px-2 py-2 text-[10px] font-bold text-success gap-1">
                          <svg
                            className="h-3 w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Single Item: Wallet Balance (Instead of Plan) */}
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-[12px] text-base-content/50">
                      Wallet Balance
                    </p>
                    <p className="text-sm font-semibold text-base-content">
                      ৳{user.balance || 0}
                    </p>
                  </div>
                </div>

                {/* Single Item: Auth Provider (Instead of CPF/CNPJ) */}
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-[12px] text-base-content/50">
                      Auth Provider
                    </p>
                    <p className="text-sm font-semibold text-base-content capitalize">
                      {user.provider}
                    </p>
                  </div>
                </div>

                {/* Single Item: Postal Code (Instead of CEP) */}
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <div>
                    <p className="text-[12px] text-base-content/50">
                      Postal Code
                    </p>
                    <p className="text-sm font-semibold text-base-content">
                      {user.postalCode || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Single Item: District (Instead of Type) */}
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                  <div>
                    <p className="text-[12px] text-base-content/50">District</p>
                    <p className="text-sm font-semibold text-base-content">
                      {user.district || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Single Item: Full Address */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-start gap-3 mt-2">
                  <svg
                    className="mt-1 h-5 w-5 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-[12px] text-base-content/50">
                      Full Address
                    </p>
                    <p className="text-sm font-semibold text-base-content">
                      {user.address || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2-Factor Authentication Card */}
            <div className="mt-6 flex flex-col items-center justify-between gap-6 rounded-[1.5rem] bg-gradient-to-r from-[#dcfce7] to-[#ccfbf1] p-6 sm:flex-row sm:p-8">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/70 shadow-sm">
                  <svg
                    className="h-6 w-6 text-success"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-base-content">
                    2-Factor Authentication
                  </h3>
                  <p className="mt-1 text-sm text-base-content/70">
                    Add an extra layer of security to your account with
                    two-Factor authentication.
                  </p>
                </div>
              </div>
              <button className="btn border-none bg-[#05472a] px-8 font-medium text-white hover:bg-[#05472a]/90">
                Manage
              </button>
            </div>

            {/* Access History Section */}
            {/* ======================================= */}
            {/* Notun Order History Section */}
            {/* ======================================= */}
            <div className="mt-10">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <h3 className="text-xl font-bold text-base-content">
                    Order History
                  </h3>
                  <p className="text-sm text-base-content/60 mt-1">
                    Review user's past orders and purchases.
                  </p>
                </div>
                <Link
                  href={`/dashboard/orders?userId=${user._id}`}
                  className="btn btn-sm btn-outline rounded-xl border-base-300 text-base-content font-medium"
                >
                  View All Orders
                </Link>
              </div>

              {/* Order Stats Grid */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
                <div className="rounded-2xl border border-base-200 bg-base-50 p-4">
                  <p className="text-xs font-semibold uppercase text-base-content/50">
                    Total Orders
                  </p>
                  <p className="mt-1 text-2xl font-bold text-base-content">
                    {totalOrders}
                  </p>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-50 p-4">
                  <p className="text-xs font-semibold uppercase text-base-content/50">
                    Delivered
                  </p>
                  <p className="mt-1 text-2xl font-bold text-success">
                    {deliveredCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-50 p-4">
                  <p className="text-xs font-semibold uppercase text-base-content/50">
                    Cancelled
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#a70000]">
                    {cancelledCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-50 p-4">
                  <p className="text-xs font-semibold uppercase text-base-content/50">
                    Total Spent
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#05472a]">
                    ৳{totalSpent.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Order Table */}
              <div className="w-full overflow-x-auto rounded-[1.5rem] border border-base-300">
                <table className="table w-full">
                  <thead className="bg-base-200/50">
                    <tr className="border-b border-base-300 text-xs font-semibold uppercase tracking-wider text-base-content/60">
                      <th className="px-6 py-4">Order Details</th>
                      <th className="py-4">Items</th>
                      <th className="py-4">Total Amount</th>
                      <th className="py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.length > 0 ? (
                      mockOrders.map((order, index) => (
                        <tr
                          key={index}
                          className="border-b border-base-200/60 hover:bg-base-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-base-content">
                              {order.id}
                            </p>
                            <p className="text-xs text-base-content/60 mt-0.5">
                              {formatDate(order.date)}
                            </p>
                          </td>
                          <td className="py-4">
                            <span className="text-sm font-medium text-base-content/80">
                              {order.items}{' '}
                              {order.items > 1 ? 'Products' : 'Product'}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="text-sm font-bold text-base-content">
                              ৳{order.total.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-4">
                            <span
                              className={`badge badge-sm font-semibold border-none px-2.5 py-1.5 ${
                                order.status === 'Delivered'
                                  ? 'bg-success/15 text-success'
                                  : order.status === 'Cancelled'
                                    ? 'bg-[#a70000]/15 text-[#a70000]'
                                    : 'bg-warning/20 text-warning-content'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="btn btn-ghost btn-sm rounded-lg text-[#05472a] hover:bg-[#05472a]/10">
                              Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-12 text-center text-sm text-base-content/50"
                        >
                          No orders found for this user.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
