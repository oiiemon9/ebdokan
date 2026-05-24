import React from 'react';

export default function TagChips({ tags = [] }) {
  if (!tags.length)
    return <span className="text-base-content/30 text-xs">—</span>;
  return (
    <div className="flex gap-1 flex-wrap">
      {tags.slice(0, 2).map((t) => (
        <span
          key={t}
          className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[11px] font-semibold border border-blue-100"
        >
          {t}
        </span>
      ))}
      {tags.length > 2 && (
        <span className="text-[11px] text-base-content/40">
          +{tags.length - 2}
        </span>
      )}
    </div>
  );
}
