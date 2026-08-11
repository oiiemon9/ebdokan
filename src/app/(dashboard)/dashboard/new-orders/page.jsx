'use client';

import { apiFetch } from '@/app/lib/api';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

function StatusBadge({ status }) {
  const styles = {
    'Order placed': 'badge-info',
    Processing: 'badge-warning',
    Shipped: 'badge-primary',
    Delivered: 'badge-success',
    Cancelled: 'badge-error',
  };
  return (
    <span
      className={`badge badge-sm rounded-lg font-medium text-nowrap ${
        styles[status] || 'badge-ghost'
      }`}
    >
      {status}
    </span>
  );
}

function PaymentBadge({ status, method }) {
  const styles = {
    paid: 'badge-success',
    pending: 'badge-warning',
    failed: 'badge-error',
  };
  return (
    <div className="flex flex-col gap-1">
      <span
        className={`badge badge-sm rounded-lg font-medium ${
          styles[status] || 'badge-ghost'
        }`}
      >
        {status}
      </span>
      <span className="text-[10px] text-base-content/40 uppercase tracking-wide">
        {method?.replace('-', ' ')}
      </span>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <tr>
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className="skeleton h-4 w-full rounded-md" />
        </td>
      ))}
    </tr>
  );
}

function OrderRow({ order }) {
  const firstItem = order.items?.[0];
  const extraCount = (order.items?.length || 1) - 1;

  return (
    <tr className="hover:bg-base-200/40 transition-colors">
      <td className="px-4 py-3">
        <div className="font-semibold text-sm">{order.orderId}</div>
        <div className="text-[11px] text-base-content/40">{order.tran_id}</div>
      </td>

      <td className="px-4 py-3">
        <div className="font-medium text-sm">{order.name}</div>
        <div className="text-[11px] text-base-content/40">{order.phone}</div>
        <div className="text-[11px] text-base-content/40">{order.email}</div>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {firstItem?.product?.image && (
            <img
              src={firstItem.product.image}
              alt={firstItem.product.name}
              className="w-9 h-9 rounded-lg object-cover border border-base-300"
            />
          )}
          <div>
            <div className="text-sm font-medium line-clamp-1 max-w-[160px]">
              {firstItem?.product?.name}
            </div>
            <div className="text-[11px] text-base-content/40">
              Qty: {firstItem?.quantity}
              {extraCount > 0 && ` +${extraCount} more`}
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="text-sm font-semibold">৳{order.total}</div>
        <div className="text-[11px] text-base-content/40">
          Sub: ৳{order.subtotal} + Ship: ৳{order.shippingCost}
        </div>
      </td>

      <td className="px-4 py-3">
        <PaymentBadge
          status={order.paymentStatus}
          method={order.paymentMethod}
        />
      </td>

      <td className="px-4 py-3">
        <StatusBadge status={order.orderStatus} />
      </td>

      <td className="px-4 py-3">
        <div className="text-sm">{order.district}</div>
        <div className="text-[11px] text-base-content/40">
          {new Date(order.createAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="font-medium text-sm">{order.name}</div>
        <div className="text-[11px] text-base-content/40">{order.phone}</div>
        <div className="text-[11px] text-base-content/40">{order.email}</div>
      </td>
      <td className="px-4 py-3">
        <Link
          href={`/dashboard/orders/${order.orderId}`}
          className="btn btn-xs btn-ghost rounded-lg border border-base-300 font-semibold text-xs"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default function NewOrdersPage() {
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiFetch('/api/new-orders'),
  });

  console.log('New Orders:', orders); // Debugging line to check the fetched orders

  return (
    <div className="min-h-screen bg-base-200/40">
      <DashboardHeader
        title="New Orders"
        description="Manage all your incoming orders"
      />

      <div className="mt-6 bg-base-100 shadow-sm border border-base-300 rounded-2xl w-full overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-base-200 flex-wrap">
          <label className="input input-bordered input-sm flex items-center gap-2 rounded-xl max-w-xs w-full focus-within:border-blue-400 transition-colors">
            <svg
              className="w-3.5 h-3.5 text-base-content/40"
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
              placeholder="Search orders by ID, name, phone…"
              className="grow bg-transparent outline-none text-sm"
            />
          </label>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost rounded-xl border border-base-300 font-semibold text-xs gap-1.5">
              <svg
                className="w-3.5 h-3.5"
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
              <tr className="bg-base-50 text-xs text-base-content/50 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Location / Date</th>
                <th className="px-4 py-3 font-semibold">Assignee</th>

                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <OrderSkeleton key={i} />
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-red-500">
                    <p className="font-semibold">Failed to load orders</p>
                    <p className="text-xs mt-1 text-base-content/50">
                      {error?.message}
                    </p>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-16 text-base-content/40"
                  >
                    <div className="text-4xl mb-3">🧾</div>
                    <p className="font-semibold text-base">No orders yet</p>
                    <p className="text-xs mt-1">
                      New orders will show up here as they come in
                    </p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <OrderRow key={order._id} order={order} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-base-200 text-xs text-base-content/50">
            <span>
              Showing {orders.length} order{orders.length !== 1 ? 's' : ''}
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
