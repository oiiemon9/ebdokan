import { apiFetch } from '@/app/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

export default function ({ currentAssigneeId, onAssign, orderId, STAFF_LIST }) {
  const queryClient = useQueryClient();
  const [assigningStaffId, setAssigningStaffId] = useState(null);
  const closeModal = () => document.getElementById('assignee_modal')?.close();

  const assignMutation = useMutation({
    mutationFn: async (staff) => {
      return apiFetch(`/api/dashboard/orders/${orderId}/assign`, {
        method: 'PATCH',
        body: JSON.stringify({
          assignedTo: staff.userId,
        }),
      });
    },

    onSuccess: (data, staff) => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });

      queryClient.invalidateQueries({
        queryKey: ['staff'],
      });

      onAssign?.(staff);

      closeModal();
    },
    onError: (error) => {
      console.log('Assign Error:', error);
      alert(error);

      console.log(error.message);
    },

    onSettled: () => {
      setAssigningStaffId(null);
    },
  });

  const handelAssign = (staff) => {
    setAssigningStaffId(staff.userId);
    assignMutation.mutate(staff);
  };

  return (
    <dialog id="assignee_modal" className="modal">
      <div className="modal-box max-w-md rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
          <div>
            <h3 className="font-semibold text-base">Assign order</h3>
            <p className="text-xs text-base-content/50 mt-0.5">
              Select an admin or moderator to handle this order
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

        {/* Staff list */}
        <div className="max-h-80 overflow-y-auto px-5 py-3">
          {STAFF_LIST.map((staff) => {
            const isAssigned = currentAssigneeId === staff.userId;
            const isThisStaffLoading = assigningStaffId === staff.userId;
            return (
              <div
                key={staff.userId}
                className="flex items-center justify-between py-3 border-b border-base-200 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-xs shrink-0">
                    {staff.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium">{staff.name}</p>
                      <span
                        className={`badge badge-xs rounded-md font-medium ${
                          staff.role === 'Admin'
                            ? 'badge-primary'
                            : 'badge-ghost'
                        }`}
                      >
                        {staff.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-base-content/40">
                      {staff?.email} · {staff?.activeOrders} active orders
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handelAssign(staff)}
                  disabled={isAssigned || isThisStaffLoading}
                  className={`btn btn-xs rounded-lg font-semibold text-xs ${
                    isAssigned ? 'btn-disabled' : 'btn-outline border-base-300'
                  }`}
                >
                  {isThisStaffLoading
                    ? 'Loading...'
                    : isAssigned
                      ? 'Assigned'
                      : 'Assign'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
