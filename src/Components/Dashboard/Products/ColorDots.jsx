import React from 'react';

export default function ColorDots({ colors = [] }) {
  if (!colors.length)
    return <span className="text-base-content/30 text-xs">—</span>;
  return (
    <div className="flex gap-1 flex-wrap">
      {colors.slice(0, 5).map((c, i) => (
        <span
          key={i}
          className="w-3.5 h-3.5 rounded-full border border-base-300 inline-block"
          style={{ background: c }}
          title={c}
        />
      ))}
    </div>
  );
}
