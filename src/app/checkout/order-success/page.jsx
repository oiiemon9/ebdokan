import Link from 'next/link';
import { connect } from '@/app/lib/dbConnect';
import { ObjectId } from 'mongodb';

async function getOrder(orderId) {
  try {
    const col = await connect('orders');
    return await col.findOne({ _id: new ObjectId(orderId) });
  } catch {
    return null;
  }
}

export default async function SuccessPage({ params }) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  const paymentLabel =
    {
      cod: '💵 Cash on Delivery',
      bkash: '📱 bKash',
      nagad: '🟠 Nagad',
      card: '💳 Card Payment',
    }[order?.paymentMethod] ?? 'Unknown';

  return (
    <div className="max-w-2xl mx-auto">
      {/* ── Success hero ── */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-emerald-500/15 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/25 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald-400"
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
            </div>
          </div>
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-ping" />
        </div>

        <h1 className="text-white text-3xl font-bold mb-2">Order Placed! 🎉</h1>
        <p className="text-white/45 text-base">
          Thank you for your purchase. We'll get it to you soon!
        </p>
        <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2 mt-4">
          <span className="text-white/40 text-xs">Order ID:</span>
          <span className="text-sky-400 font-mono text-sm font-semibold">
            {orderId}
          </span>
        </div>
      </div>

      {/* ── Order details card ── */}
      {order && (
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden mb-5">
          {/* Header */}
          <div className="bg-white/[0.03] border-b border-white/[0.07] px-6 py-4 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Order Details</h2>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full
              ${order.status === 'pending' ? 'bg-amber-400/15 text-amber-400' : ''}
              ${order.status === 'processing' ? 'bg-sky-400/15 text-sky-400' : ''}
              ${order.status === 'delivered' ? 'bg-emerald-400/15 text-emerald-400' : ''}`}
            >
              {order.status?.toUpperCase()}
            </span>
          </div>

          <div className="p-6 space-y-5">
            {/* Items */}
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">
                Items Ordered
              </p>
              <div className="space-y-3">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-lg shrink-0">
                      📦
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-white/35 text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-white text-sm font-semibold">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/[0.07]" />

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1.5">
                  Delivering to
                </p>
                <p className="text-white text-sm font-medium">
                  {order.shippingInfo?.name}
                </p>
                <p className="text-white/45 text-xs">
                  {order.shippingInfo?.phone}
                </p>
                <p className="text-white/45 text-xs">
                  {order.shippingInfo?.address}
                </p>
                <p className="text-white/45 text-xs">
                  {order.shippingInfo?.city}
                </p>
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1.5">
                  Payment Method
                </p>
                <p className="text-white text-sm font-medium">{paymentLabel}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-3 mb-1.5">
                  Shipping
                </p>
                <p className="text-white text-sm">
                  {order.shippingMethod === 'express'
                    ? '⚡ Express'
                    : order.shippingMethod === 'free'
                      ? '🎁 Free'
                      : '🚚 Standard'}
                </p>
              </div>
            </div>

            <div className="h-px bg-white/[0.07]" />

            {/* Price */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/45">Subtotal</span>
                <span className="text-white/70">
                  ৳{order.subtotal?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/45">Shipping</span>
                <span
                  className={
                    order.shippingCost === 0
                      ? 'text-emerald-400'
                      : 'text-white/70'
                  }
                >
                  {order.shippingCost === 0 ? 'FREE' : `৳${order.shippingCost}`}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-white/45">Discount</span>
                  <span className="text-emerald-400">-৳{order.discount}</span>
                </div>
              )}
              <div className="h-px bg-white/[0.07]" />
              <div className="flex justify-between font-bold text-base">
                <span className="text-white">Total Paid</span>
                <span className="text-white">
                  ৳{order.total?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delivery timeline ── */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mb-5">
        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">
          What Happens Next
        </p>
        <div className="space-y-4">
          {[
            {
              done: true,
              icon: '✅',
              label: 'Order Confirmed',
              sub: 'Your order has been received',
            },
            {
              done: false,
              icon: '📦',
              label: 'Processing',
              sub: 'We are preparing your items',
            },
            {
              done: false,
              icon: '🚚',
              label: 'Out for Delivery',
              sub: 'Our agent will contact you',
            },
            {
              done: false,
              icon: '🏠',
              label: 'Delivered',
              sub: 'Enjoy your purchase!',
            },
          ].map((step, i, arr) => (
            <div key={step.label} className="flex gap-3 items-start">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                  ${step.done ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-white/[0.05] border border-white/[0.08]'}`}
                >
                  {step.icon}
                </div>
                {i < arr.length - 1 && (
                  <div
                    className={`w-px flex-1 mt-1 h-4 ${step.done ? 'bg-emerald-500/30' : 'bg-white/[0.07]'}`}
                  />
                )}
              </div>
              <div className="pb-2">
                <p
                  className={`text-sm font-medium ${step.done ? 'text-emerald-400' : 'text-white/50'}`}
                >
                  {step.label}
                </p>
                <p className="text-white/30 text-xs">{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/orders"
          className="flex items-center justify-center gap-2 h-11 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/70 text-sm font-medium hover:bg-white/[0.09] hover:border-white/20 transition-all"
        >
          📋 My Orders
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm text-white
            bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500
            hover:opacity-90 transition-all"
        >
          🛍️ Continue Shopping
        </Link>
      </div>
    </div>
  );
}
