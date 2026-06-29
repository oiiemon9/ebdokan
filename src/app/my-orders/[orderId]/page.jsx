'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// ── Helpers ───────────────────────────────────────────────────────────────

const ALL_STAGES = [
  'Order placed',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for delivery',
  'Delivered',
];

function formatDate(dateVal) {
  if (!dateVal) return '';
  const d = new Date(dateVal?.$date ?? dateVal);
  return d.toLocaleDateString('en-BD', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

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

const STATUS_COLOR = {
  pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  paid: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    dot: 'bg-green-500',
  },
  failed: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
    dot: 'bg-red-500',
  },
  cancelled: {
    bg: 'bg-gray-100',
    text: 'text-gray-500',
    border: 'border-gray-200',
    dot: 'bg-gray-400',
  },
};

const PAYMENT_METHOD_LABEL = {
  'cash-on-delivery': 'Cash on Delivery',
  bkash: 'bKash',
  nagad: 'Nagad',
  card: 'Debit / Credit Card',
};

const SHIPPING_METHOD_LABEL = {
  standard: 'Standard Delivery (3–5 days)',
  express: 'Express Delivery (1–2 days)',
  free: 'Free Delivery (5–7 days)',
};

// ── Page ──────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const myOrder = async () => {
      try {
        const res = await fetch(`/api/my-orders/${orderId}`, {
          cache: 'no-cache',
        });
        const result = await res.json();
        console.log(result);
        setOrder(result);
      } catch (error) {
        console.log(error);
      }
    };
    myOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-gray-800 text-xl font-semibold mb-2">
            Order not found
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            We couldn't find order{' '}
            <span className="font-mono font-medium">{orderId}</span>
          </p>
          <Link
            href="/my-orders"
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  // Current stage index
  const completedStages = order.orderStatus?.map((s) => s.stage) ?? [];
  const latestStage =
    completedStages[completedStages.length - 1] ?? 'Order placed';
  const currentIdx = ALL_STAGES.indexOf(latestStage);
  const isDelivered = latestStage === 'Delivered';
  const isCancelled = latestStage === 'Cancelled';

  const payStatus = STATUS_COLOR[order.paymentStatus] ?? STATUS_COLOR.pending;

  const stageTimeMap = Object.fromEntries(
    (order.orderStatus ?? []).map((s) => [s.stage, s.time]),
  );

  const savings = order.discount ?? 0;

  const handelCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      toast.success('Order ID Copied Successfully!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[system-ui,sans-serif]">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            {[
              ['Home', '/'],
              ['My Account', '/account'],
              ['My Orders', '/my-orders'],
              [order.orderId, null],
            ].map(([label, href], i, arr) => (
              <span key={label} className="flex items-center gap-2">
                {href ? (
                  <Link
                    href={href}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {label}
                  </Link>
                ) : (
                  <span className="text-gray-700 font-medium">{label}</span>
                )}
                {i < arr.length - 1 && (
                  <svg
                    className="w-3.5 h-3.5 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* ── Order header card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-wrap gap-6">
              {/* Order ID */}
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                  Order ID
                </p>

                <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-2 py-1">
                  <p className="text-indigo-700 text-xs font-medium">
                    {order.orderId}
                  </p>
                  <button onClick={handelCopy} className="cursor-pointer">
                    <svg
                      className="w-4 h-4 text-indigo-500 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 8H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2M10 4h8a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2V6a2 2 0 012-2z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-0.5">
                  {order.items?.length} item
                  {order.items?.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Divider */}
              <div className="w-px bg-gray-200 self-stretch hidden sm:block" />

              {/* Total */}
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                  Total Paid
                </p>
                <p className="text-gray-900 font-bold text-xl">
                  ৳{order.total?.toLocaleString()}
                </p>
                {savings > 0 && (
                  <p className="text-green-600 text-xs font-medium mt-0.5">
                    You saved ৳{savings.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="w-px bg-gray-200 self-stretch hidden sm:block" />

              {/* Date */}
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                  Placed on
                </p>
                <p className="text-gray-700 font-medium text-sm">
                  {formatDate(order.createAt)}
                </p>
              </div>
            </div>

            {/* Payment status badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold
              ${payStatus.bg} ${payStatus.text} ${payStatus.border}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${payStatus.dot}`} />
              {order.paymentStatus?.charAt(0).toUpperCase() +
                order.paymentStatus?.slice(1)}
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
          {/* ══ LEFT ══ */}
          <div className="space-y-5">
            {/* ── Order progress tracker ── */}
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
              <h2 className="text-gray-800 font-semibold text-base mb-6">
                Items Ordered &amp; Delivery Details
              </h2>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-5">
                Shipment 1 of 1
              </p>

              {/* Progress steps */}
              <div className="relative">
                {/* Connector line */}
                <div
                  className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 z-0"
                  style={{
                    left: 'calc(1rem + 8px)',
                    right: 'calc(1rem + 8px)',
                  }}
                />
                {/* Filled line */}
                <div
                  className="absolute top-4 h-0.5 bg-green-500 z-0 transition-all duration-500"
                  style={{
                    left: 'calc(1rem + 8px)',
                    width:
                      currentIdx <= 0
                        ? '0%'
                        : `calc(${(currentIdx / (ALL_STAGES.length - 1)) * 100}% - 16px)`,
                  }}
                />

                {/* Step circles — horizontal scroll on mobile */}
                <div className="flex items-start justify-between gap-1 overflow-x-auto pb-1 relative z-10">
                  {ALL_STAGES.map((stage, i) => {
                    const done = i <= currentIdx && !isCancelled;
                    const active = i === currentIdx && !isCancelled;
                    const stageTime = stageTimeMap[stage];

                    return (
                      <div
                        key={stage}
                        className="flex flex-col items-center gap-1.5 min-w-[64px]"
                      >
                        {/* Circle */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all shrink-0
                          ${
                            done
                              ? 'bg-green-500 border-green-500'
                              : active
                                ? 'bg-white border-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.15)]'
                                : 'bg-white border-gray-300'
                          }`}
                        >
                          {done ? (
                            <svg
                              className="w-3.5 h-3.5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <div
                              className={`w-2 h-2 rounded-full ${active ? 'bg-green-500' : 'bg-gray-300'}`}
                            />
                          )}
                        </div>

                        {/* Label */}
                        <div className="text-center">
                          <p
                            className={`text-[10px] font-semibold leading-tight ${done || active ? 'text-gray-800' : 'text-gray-400'}`}
                          >
                            {stage}
                          </p>
                          {stageTime && (
                            <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">
                              {formatDate(stageTime)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ETA */}
              {!isDelivered && !isCancelled && (
                <div className="mt-5 flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
                  <svg
                    className="w-4 h-4 text-indigo-500 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-indigo-700 text-xs font-medium">
                    {order.shippingMethod === 'express'
                      ? 'Expected delivery in 1–2 business days'
                      : 'Expected delivery in 3–5 business days'}
                  </p>
                </div>
              )}

              {isDelivered && (
                <div className="mt-5 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                  <svg
                    className="w-4 h-4 text-green-600 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-green-700 text-xs font-medium">
                    Order delivered successfully!
                  </p>
                </div>
              )}
            </div>

            {/* ── Product items ── */}
            <div className="space-y-3">
              {order.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                        {item.product?.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl text-gray-300">
                            📦
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-gray-800 font-semibold text-sm leading-snug">
                            {item.product?.name}
                          </h3>
                          {/* Status badge */}
                          <span
                            className={`shrink-0 flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border
                            ${
                              isDelivered
                                ? 'bg-green-50 text-green-600 border-green-200'
                                : isCancelled
                                  ? 'bg-gray-100 text-gray-500 border-gray-200'
                                  : 'bg-amber-50 text-amber-600 border-amber-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full animate-pulse
                              ${isDelivered ? 'bg-green-500' : isCancelled ? 'bg-gray-400' : 'bg-amber-500'}`}
                            />
                            {isDelivered
                              ? 'Delivered'
                              : isCancelled
                                ? 'Cancelled'
                                : 'In progress'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                          {item.color && (
                            <span className="text-gray-500 text-xs flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-gray-300"
                                style={{ background: item.color }}
                              />
                              {item.color}
                            </span>
                          )}
                          {item.size && (
                            <>
                              <span className="text-gray-300 text-xs">|</span>
                              <span className="text-gray-500 text-xs">
                                Size:{' '}
                                <span className="font-medium text-gray-700">
                                  {item.size}
                                </span>
                              </span>
                            </>
                          )}
                          <span className="text-gray-300 text-xs">|</span>
                          <span className="text-gray-500 text-xs">
                            Qty:{' '}
                            <span className="font-medium text-gray-700">
                              {item.quantity}
                            </span>
                          </span>
                        </div>

                        <p className="text-gray-800 font-bold text-base mt-2">
                          ৳{Number(item.product?.price).toLocaleString()}
                        </p>

                        {/* ETA per item */}
                        {!isDelivered && !isCancelled && (
                          <p className="text-gray-400 text-[11px] mt-1">
                            Arriving by{' '}
                            <span className="font-medium text-gray-600">
                              {new Date(
                                Date.now() +
                                  (order.shippingMethod === 'express' ? 2 : 5) *
                                    86400000,
                              ).toLocaleDateString('en-BD', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cancel / Review action */}
                  <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between">
                    {!isDelivered && !isCancelled ? (
                      <button className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors">
                        Cancel item
                      </button>
                    ) : isDelivered ? (
                      <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
                        Write a review
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Item cancelled
                      </span>
                    )}
                    <Link
                      href={`/products/${item.productId}`}
                      className="text-gray-400 text-xs hover:text-gray-600 transition-colors flex items-center gap-1"
                    >
                      View product
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Order timeline log ── */}
            {order.orderStatus?.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
                <h3 className="text-gray-800 font-semibold text-sm mb-5">
                  Order Timeline
                </h3>
                <div className="space-y-4">
                  {[...(order.orderStatus ?? [])].reverse().map((s, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0
                          ${i === 0 ? 'bg-green-500' : 'bg-gray-100 border border-gray-200'}`}
                        >
                          {i === 0 ? (
                            <svg
                              className="w-3.5 h-3.5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                          )}
                        </div>
                        {i < (order.orderStatus?.length ?? 1) - 1 && (
                          <div className="w-px flex-1 bg-gray-200 my-1 h-4" />
                        )}
                      </div>
                      <div className="pb-1">
                        <p
                          className={`text-sm font-semibold ${i === 0 ? 'text-gray-800' : 'text-gray-500'}`}
                        >
                          {s.stage}
                        </p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {formatDateTime(s.time)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ══ RIGHT ══ */}
          <div className="space-y-5">
            {/* ── Delivery address ── */}
            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-5">
              <h3 className="text-gray-800 font-semibold text-sm mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Delivery Address
              </h3>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <p className="text-gray-800 font-semibold text-sm">
                  {order.name}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{order.phone}</p>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {order.address},<br />
                  {order.district}
                  {order.postalCode ? ` — ${order.postalCode}` : ''}
                </p>
              </div>
            </div>

            {/* ── Payment details ── */}
            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-5">
              <h3 className="text-gray-800 font-semibold text-sm mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Payment Details
              </h3>

              <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
                {/* Item rows */}
                <div className="divide-y divide-gray-100">
                  {order.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between gap-3 px-4 py-3"
                    >
                      <span className="text-gray-600 text-xs leading-relaxed flex-1">
                        {item.product?.name}
                      </span>
                      <span className="text-gray-700 text-xs font-semibold shrink-0">
                        ৳{item.itemTotal?.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary rows */}
                <div className="border-t border-dashed border-gray-200 px-4 pt-3 pb-1 space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Shipping</span>
                    <span
                      className={
                        order.shippingCost === 0
                          ? 'text-green-600 font-medium'
                          : 'text-gray-700'
                      }
                    >
                      {order.shippingCost === 0
                        ? 'FREE'
                        : `৳${order.shippingCost}`}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-green-600 font-medium">
                        Coupon savings
                      </span>
                      <span className="text-green-600 font-semibold">
                        -৳{savings.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Payment method</span>
                    <span className="text-gray-700">
                      {PAYMENT_METHOD_LABEL[order.paymentMethod] ??
                        order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 px-4 py-3 flex justify-between items-center">
                  <span className="text-gray-800 font-bold text-sm">Total</span>
                  <span className="text-gray-900 font-bold text-lg">
                    ৳{order.total?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Shipping info ── */}
            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
              <h3 className="text-gray-800 font-semibold text-sm mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                Shipping Info
              </h3>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Method</span>
                  <span className="text-gray-700 font-medium text-right max-w-[180px]">
                    {SHIPPING_METHOD_LABEL[order.shippingMethod] ??
                      order.shippingMethod}
                  </span>
                </div>
                {order.tran_id && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transaction ID</span>
                    <span className="text-gray-700 font-mono">
                      {order.tran_id}
                    </span>
                  </div>
                )}
                {order.note && (
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-400 shrink-0">Note</span>
                    <span className="text-gray-600 text-right">
                      {order.note}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ── Help ── */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 flex items-start gap-3">
              <svg
                className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <div>
                <p className="text-indigo-800 font-semibold text-xs">
                  Need help?
                </p>
                <p className="text-indigo-600 text-xs mt-0.5 leading-relaxed">
                  Contact our support team for any order-related queries.
                </p>
                <a
                  href="mailto:support@shopnest.com"
                  className="text-indigo-700 font-medium text-xs underline underline-offset-2 mt-1 inline-block hover:text-indigo-900 transition-colors"
                >
                  support@shopnest.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Back button ── */}
        <div className="flex justify-start pb-4">
          <Link
            href="/my-orders"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
