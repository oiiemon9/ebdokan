'use client';

import { apiFetch } from '@/app/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

// ── Stage config ──────────────────────────────────────────────────────────
const VALID_TRANSITIONS = [
  'Order placed',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for delivery',
  'Delivered',
];

const STAGE_META = {
  'Order placed': { icon: '📝', color: '#6366f1' },
  Confirmed: { icon: '✅', color: '#0ea5e9' },
  Processing: { icon: '⚙️', color: '#f59e0b' },
  Packed: { icon: '📦', color: '#8b5cf6' },
  Shipped: { icon: '🚚', color: '#06b6d4' },
  'Out for delivery': { icon: '🛵', color: '#f97316' },
  Delivered: { icon: '🎉', color: '#22c55e' },
  Cancelled: { icon: '✕', color: '#ef4444' },
};

const getNextStatus = (currentStatus) => {
  const currentIndex = VALID_TRANSITIONS.indexOf(currentStatus);
  if (currentIndex === -1) {
    return null; // Invalid status
  }
  if (currentIndex === VALID_TRANSITIONS.length - 1) {
    return null; // Already Delivered
  }
  return VALID_TRANSITIONS[currentIndex + 1];
};

function formatDate(dateVal) {
  if (!dateVal) return '';
  const d = new Date(dateVal?.$date ?? dateVal);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ── Animated step visual — soft, professional, continuous motion ──────────
function StepTransitionVisual({ currentStage, currentDate, targetStage }) {
  const targetMeta = STAGE_META[targetStage];

  return (
    <div className="flex items-start justify-center gap-0 py-2">
      {/* ── Current stage — solid green, done ── */}
      <div className="flex flex-col items-center gap-3 w-24">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm"
          style={{ background: '#22c55e' }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-gray-900 font-bold text-sm leading-tight">
            {currentStage}
          </p>
          {currentDate && (
            <p className="text-gray-400 text-xs mt-0.5 leading-tight">
              {formatDate(currentDate)}
            </p>
          )}
        </div>
      </div>

      {/* ── Connector — soft shimmer sweep, no hard edges ── */}
      <div className="relative flex-1 h-14 flex items-center min-w-[50px] max-w-[80px]">
        <div className="absolute inset-x-0 h-[2px] bg-gray-150 rounded-full top-1/2 -translate-y-1/2 overflow-hidden">
          {/* base soft tint */}
          <div
            className="absolute inset-0 opacity-25"
            style={{ background: targetMeta?.color ?? '#22c55e' }}
          />
          {/* moving soft light sweep */}
          <motion.div
            className="absolute inset-y-0 w-1/2"
            style={{
              background: `linear-gradient(90deg, transparent, ${targetMeta?.color ?? '#22c55e'}, transparent)`,
            }}
            animate={{ x: ['-100%', '250%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* ── Target stage — gentle breathing glow ring ── */}
      <div className="flex flex-col items-center gap-3 w-24">
        <div className="relative w-14 h-14 flex items-center justify-center">
          {/* Soft outer glow pulse */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: targetMeta?.color ?? '#22c55e' }}
            animate={{ opacity: [0.12, 0.28, 0.12], scale: [1, 1.18, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Thin rotating dashed ring — slow & subtle */}
          <motion.svg
            viewBox="0 0 56 56"
            className="absolute inset-0 w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="28"
              cy="28"
              r="25"
              fill="none"
              stroke={targetMeta?.color ?? '#22c55e'}
              strokeWidth="1.5"
              strokeDasharray="3 7"
              strokeLinecap="round"
              opacity="0.5"
            />
          </motion.svg>

          {/* Center — soft filled circle, gentle breathing */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: `${targetMeta?.color ?? '#22c55e'}22` }}
          >
            <span className="text-base leading-none">{targetMeta?.icon}</span>
          </motion.div>
        </div>

        <div className="text-center">
          <p
            className="font-bold text-sm leading-tight"
            style={{ color: targetMeta?.color }}
          >
            {targetStage}
          </p>
          <p className="text-gray-400 text-xs mt-0.5 leading-tight">
            Updating…
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────
export default function UpdateStatusModal({ order, orderId, loading = false }) {
  const queryClient = useQueryClient();
  const nextStage = getNextStatus(
    order?.orderTimeline?.[order.orderTimeline.length - 1]?.status,
  );

  const closeModal = () => {
    document.getElementById('update_status')?.close();
  };

  const statusMutation = useMutation({
    mutationFn: async (newStatus) => {
      return apiFetch(`/api/dashboard/orders/${orderId}/status-update`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: newStatus,
        }),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });

      closeModal();
    },
    onError: (error) => {
      console.log('Assign Error:', error);
      alert(error);

      console.log(error.message);
    },
  });

  const handleUpdateStatus = async () => {
    statusMutation.mutate(nextStage);
  };

  return (
    <dialog id="update_status" className="modal">
      <div className="modal-box max-w-md rounded-2xl p-0 overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
          <div>
            <h3 className="font-semibold text-base">Update Order Status</h3>
            <p className="text-xs text-base-content/50 mt-0.5">
              #{order?.orderId}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="btn btn-sm btn-ghost btn-circle"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-5 py-6">
          {!nextStage ? (
            <div className="flex items-center gap-2 bg-base-200/60 rounded-xl px-4 py-3">
              <svg
                className="w-4 h-4 text-base-content/40 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs text-base-content/50">
                এই order টি{' '}
                <strong>
                  {
                    order?.orderTimeline?.[order.orderTimeline.length - 1]
                      ?.status
                  }
                </strong>{' '}
                — আর কোনো পরিবর্তন করা যাবে না।
              </p>
            </div>
          ) : (
            <>
              <StepTransitionVisual
                currentStage={
                  order?.orderTimeline?.[order.orderTimeline.length - 1]?.status
                }
                currentDate={
                  order?.orderTimeline?.[order.orderTimeline.length - 1]
                    ?.createdAt
                }
                targetStage={nextStage}
              />
              <p className="text-center text-base-content/40 text-xs mt-4">
                "OK, Update" এ ক্লিক করলে অর্ডারটি{' '}
                <strong style={{ color: STAGE_META[nextStage]?.color }}>
                  {nextStage}
                </strong>{' '}
                এ move হবে।
              </p>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        {nextStage && (
          <div className="flex gap-2.5 px-5 py-4 border-t border-base-200">
            <button
              onClick={closeModal}
              className="btn btn-sm flex-1 rounded-xl font-semibold btn-ghost border border-base-300"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleUpdateStatus}
              className="btn btn-sm flex-1 rounded-xl font-semibold text-white border-none
                bg-[#1a1a2e] hover:bg-[#2d2d4e] disabled:opacity-40"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                'OK, Update'
              )}
            </button>
          </div>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
