'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/app/lib/api';

// Date Format Function
function formatDate(dateVal) {
  if (!dateVal) return 'N/A';
  const d = new Date(dateVal?.$date ?? dateVal);
  return d.toLocaleDateString('en-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Loading Skeleton
function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-48 w-full rounded-3xl bg-base-200"></div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-80 rounded-3xl bg-base-200 lg:col-span-1"></div>
        <div className="space-y-6 lg:col-span-2">
          <div className="h-48 rounded-3xl bg-base-200"></div>
          <div className="h-48 rounded-3xl bg-base-200"></div>
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
    enabled: !!userId, // ID thaklei shudhu fetch korbe
  });

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
        <div className="mb-4 text-6xl drop-shadow-sm">😕</div>
        <h2 className="text-2xl font-bold text-base-content">User Not Found</h2>
        <p className="mt-2 text-base-content/60 max-w-sm">
          The user you are looking for does not exist or an error occurred while
          fetching the data.
        </p>
        <button
          onClick={() => router.back()}
          className="btn btn-primary mt-6 rounded-xl px-8 shadow-md shadow-primary/20"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10">
      {/* Top Navigation / Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="btn btn-circle btn-ghost btn-sm bg-base-200/50 hover:bg-base-300 transition-colors"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">
            User Profile
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline btn-error btn-sm rounded-xl font-semibold hover:!text-white">
            Suspend
          </button>
          <button className="btn btn-primary btn-sm rounded-xl font-semibold text-white shadow-sm shadow-primary/30">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Top Banner & Profile Header */}
      <div className="relative mb-6 rounded-[2rem] bg-base-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-base-200/50 overflow-hidden">
        {/* Modern Gradient Banner */}
        <div className="h-36 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 lg:h-44 opacity-90"></div>

        <div className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-end lg:px-10 lg:pb-8">
          {/* Avatar with Ring Effect */}
          <div className="avatar -mt-20 sm:-mt-24">
            <div className="w-28 rounded-full ring-4 ring-base-100 bg-base-200 shadow-xl sm:w-36 overflow-hidden">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-base-200 to-base-300 text-5xl font-bold text-base-content/40">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center sm:text-left sm:ml-2">
            <h2 className="text-2xl font-bold sm:text-3xl text-base-content tracking-tight">
              {user.name}
            </h2>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <span className="text-sm font-medium text-base-content/60 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                {user.email || 'No email provided'}
              </span>
              <span className="hidden h-1.5 w-1.5 rounded-full bg-base-content/20 sm:block"></span>

              {/* Soft Role Badge */}
              <div
                className={`badge border-none font-bold uppercase tracking-wider text-[10px] px-3 py-2 ${
                  user.role === 'admin'
                    ? 'bg-primary/10 text-primary'
                    : user.role === 'moderator'
                      ? 'bg-secondary/10 text-secondary'
                      : 'bg-base-200 text-base-content/70'
                }`}
              >
                {user.role}
              </div>
            </div>
          </div>

          {/* Quick Stats/Actions on the right */}
          <div className="flex gap-4 sm:ml-auto mt-4 sm:mt-0">
            <div className="text-center sm:text-right rounded-2xl bg-base-200/50 px-5 py-3 border border-base-200/50">
              <p className="text-[11px] font-bold uppercase tracking-widest text-base-content/50 mb-1">
                Wallet Balance
              </p>
              <p className="text-2xl font-extrabold text-success tracking-tight">
                ৳{user.balance || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Account Overview */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-[2rem] border border-base-200/50 bg-base-100 p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="mb-6 text-lg font-bold tracking-tight text-base-content">
              Account Overview
            </h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-base-200/50 pb-4">
                <span className="text-sm font-medium text-base-content/60">
                  Status
                </span>
                <span className="badge bg-success/10 text-success border-none font-bold text-xs px-3 py-2">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-base-200/50 pb-4">
                <span className="text-sm font-medium text-base-content/60">
                  Auth Provider
                </span>
                <span className="capitalize font-semibold text-sm text-base-content">
                  {user.provider || user.authType}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-base-200/50 pb-4">
                <span className="text-sm font-medium text-base-content/60">
                  Email Status
                </span>
                {user.emailVerified ? (
                  <span className="text-success flex items-center gap-1.5 text-sm font-semibold">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Verified
                  </span>
                ) : (
                  <span className="text-warning flex items-center gap-1.5 text-sm font-semibold">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      ></path>
                    </svg>
                    Unverified
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-base-content/60">
                  Joined Date
                </span>
                <span className="text-sm font-semibold text-base-content">
                  {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Contact Information */}
          <div className="rounded-[2rem] border border-base-200/50 bg-base-100 p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="mb-6 text-lg font-bold tracking-tight text-base-content">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Email Block */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-base-200/30 border border-base-200/50 hover:border-primary/20 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 shadow-inner">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-base-content/50 mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold text-base-content">
                    {user.email || (
                      <span className="text-base-content/40 italic font-medium">
                        Not provided
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Phone Block */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-base-200/30 border border-base-200/50 hover:border-emerald-500/20 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 shadow-inner">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-base-content/50 mb-1">
                    Phone Number
                  </p>
                  <p className="text-sm font-semibold text-base-content">
                    {user.phone || (
                      <span className="text-base-content/40 italic font-medium">
                        Not provided
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="rounded-[2rem] border border-base-200/50 bg-base-100 p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="mb-6 text-lg font-bold tracking-tight text-base-content">
              Address Information
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Full Address Block */}
              <div className="sm:col-span-2 flex items-start gap-4 p-4 rounded-2xl bg-base-200/30 border border-base-200/50 hover:border-indigo-500/20 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 shadow-inner">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-base-content/50 mb-1">
                    Full Address
                  </p>
                  <p className="text-sm font-semibold text-base-content leading-relaxed">
                    {user.address || (
                      <span className="text-base-content/40 italic font-medium">
                        No address on file
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* District Block */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-base-200/30 border border-base-200/50 hover:border-amber-500/20 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 shadow-inner">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-base-content/50 mb-1">
                    District
                  </p>
                  <p className="text-sm font-semibold text-base-content">
                    {user.district || (
                      <span className="text-base-content/40 italic font-medium">
                        N/A
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Postal Code Block */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-base-200/30 border border-base-200/50 hover:border-rose-500/20 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 shadow-inner">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-base-content/50 mb-1">
                    Postal Code
                  </p>
                  <p className="text-sm font-semibold text-base-content">
                    {user.postalCode || (
                      <span className="text-base-content/40 italic font-medium">
                        N/A
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
