import React from 'react';

export default function StatusBadge({ status }) {
  const map = {
    active: { cls: 'badge-success', label: '✅ Active' },
    draft: { cls: 'badge-warning', label: '📝 Draft' },
    archived: { cls: 'badge-ghost', label: '📦 Archived' },
  };
  const { cls, label } = map[status] || { cls: 'badge-ghost', label: status };
  return (
    <span className={`badge badge-sm ${cls} font-semibold text-nowrap`}>
      {label}
    </span>
  );
}
