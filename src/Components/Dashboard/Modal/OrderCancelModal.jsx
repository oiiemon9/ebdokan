'use client';

import { apiFetch } from '@/app/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

// ── Cancellation reasons — admin-side common causes ────────────────────────
const CANCEL_REASONS = [
  { id: 'out_of_stock', label: 'Product out of stock', icon: '📦' },
  { id: 'customer_request', label: 'Customer requested cancel', icon: '🙋' },
  { id: 'payment_failed', label: 'Payment failed / not received', icon: '💳' },
  { id: 'duplicate_order', label: 'Duplicate order', icon: '🔁' },
  { id: 'address_issue', label: 'Invalid / incomplete address', icon: '📍' },
  { id: 'pricing_error', label: 'Pricing error', icon: '⚠️' },
  { id: 'fraud_suspicion', label: 'Suspected fraudulent order', icon: '🚫' },
  { id: 'unreachable', label: 'Customer unreachable', icon: '📵' },
  { id: 'other', label: 'Other reason', icon: '📝' },
];

// ── Component ─────────────────────────────────────────────────────────────
export default function OrderCancelModal({ order, orderId }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reason: '',
      note: '',
    },
  });

  const currentStage =
    order?.orderTimeline?.[order.orderTimeline.length - 1]?.status;
  const isFinal = currentStage === 'Delivered' || currentStage === 'Cancelled';

  const closeModal = () => {
    document.getElementById('cancel_order')?.close();
    reset();
  };

  const cancelMutation = useMutation({
    mutationFn: async ({ reason, note }) => {
      const reasonLabel = CANCEL_REASONS.find((r) => r.id === reason)?.label;
      return apiFetch(`/api/dashboard/orders/${orderId}/cancel`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: 'Cancelled',
          cancelReason: reasonLabel,
          cancelReasonId: reason,
          cancelNote: note.trim(),
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      closeModal();
    },
    onError: (error) => {
      console.error('Cancel Error:', error);
      alert(error?.message ?? 'Something went wrong');
    },
  });

  const onSubmit = (data) => {
    cancelMutation.mutate(data);
  };

  return (
    <dialog id="cancel_order" className="modal">
      <div className="modal-box max-w-md rounded-2xl p-0 overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
          <div>
            <h3 className="font-semibold text-base text-red-500">
              Cancel Order
            </h3>
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

        {isFinal ? (
          /* ── Final state — nothing to do ── */
          <div className="px-5 py-5">
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
                এই order টি <strong>{currentStage}</strong> — cancel করা যাবে
                না।
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ── Body ── */}
            <div className="px-5 py-5">
              {/* Warning banner */}
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                <svg
                  className="w-4 h-4 text-red-500 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-red-600 text-xs leading-relaxed">
                  এই action পূর্বাবস্থায় ফেরানো যাবে না। Order cancel হলে
                  customer কে notify করা হবে।
                </p>
              </div>

              {/* ── Reason selector ── */}
              <label className="text-xs text-base-content/50 font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                Cancellation Reason
                <span className="text-red-500 normal-case font-medium">*</span>
              </label>
              <select
                {...register('reason', {
                  required: 'একটি reason select করা আবশ্যক',
                })}
                defaultValue=""
                className={`select select-bordered w-full rounded-xl focus:outline-none
                  ${errors.reason ? 'border-red-400 focus:border-red-500' : 'focus:border-red-400'}`}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                {CANCEL_REASONS.map((reason) => (
                  <option key={reason.id} value={reason.id}>
                    {reason.icon} {reason.label}
                  </option>
                ))}
              </select>
              {errors.reason && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.reason.message}
                </p>
              )}

              {/* ── Note field ── */}
              <label className="text-xs text-base-content/50 font-semibold uppercase tracking-wider mb-2 mt-5 flex items-center gap-1.5">
                Note
                <span className="text-red-500 normal-case font-medium">*</span>
              </label>
              <textarea
                {...register('note', {
                  required: 'Note লেখা আবশ্যক',
                  minLength: { value: 5, message: 'অন্তত ৫ অক্ষর লিখুন' },
                })}
                placeholder="কেন order টি cancel করা হচ্ছে বিস্তারিত লিখুন…"
                rows={3}
                className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-sm resize-none
                  outline-none transition-colors placeholder:text-base-content/30
                  ${errors.note ? 'border-red-400 focus:border-red-500' : 'border-base-200 focus:border-base-content/20'}`}
              />
              {errors.note && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.note.message}
                </p>
              )}
            </div>

            {/* ── Footer ── */}
            <div className="flex gap-2.5 px-5 py-4 border-t border-base-200">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-sm flex-1 rounded-xl font-semibold btn-ghost border border-base-300"
              >
                Keep Order
              </button>
              <button
                type="submit"
                disabled={cancelMutation.isPending}
                className="btn btn-sm flex-1 rounded-xl font-semibold text-white border-none
                  bg-red-500 hover:bg-red-600 disabled:opacity-40"
              >
                {cancelMutation.isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  'Cancel Order'
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={() => reset()}>close</button>
      </form>
    </dialog>
  );
}
