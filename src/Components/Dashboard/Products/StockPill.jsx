import React from 'react';

export default function StockPill({ stock }) {
  if (stock === 0)
    return (
      <span className="badge badge-sm badge-error font-semibold">
        Out of stock
      </span>
    );
  if (stock < 10)
    return (
      <span className="badge badge-sm badge-warning font-semibold">
        Low · {stock}
      </span>
    );
  return (
    <span className="badge badge-sm badge-info font-semibold">{stock}</span>
  );
}
