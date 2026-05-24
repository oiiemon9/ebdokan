import React from 'react';
import StockPill from './StockPill';
import StatusBadge from './StatusBadge';
import ColorDots from './ColorDots';
import TagChips from './TagChips';

export default function ProductRow({ product }) {
  const {
    _id,
    productName,
    shortDescription,
    brand,
    subCategory,
    category,
    sku,
    barcode,
    price,
    comparePrice,
    discountPercentage,
    costPerItem,
    stock,
    status,
    colors,
    sizes,
    tags,
    isFeatured,
    images,
  } = product;

  return (
    <tr
      key={_id}
      className="border-t border-base-200 hover:bg-base-50 transition-colors"
    >
      {/* Product */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3 ">
          <div className="w-10 h-10 rounded-xl bg-base-200 overflow-hidden shrink-0 flex items-center justify-center">
            {images?.[0] ? (
              <img
                src={images[0]}
                alt={productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl">📦</span>
            )}
          </div>
          <div>
            <p className="font-semibold text-sm text-base-content leading-tight line-clamp-1">
              {productName}
            </p>
            <p className="text-xs text-base-content/50 mt-0.5 line-clamp-1">
              {brand && (
                <span className="font-medium text-base-content/60">
                  {brand}
                </span>
              )}
              {brand && (subCategory || category) && ' · '}
              {subCategory || category}
            </p>
          </div>
        </div>
      </td>

      {/* SKU / Barcode */}
      <td className="px-4 py-3 ">
        <p className="text-xs font-mono font-semibold text-base-content/70">
          {sku || '—'}
        </p>
        <p className="text-[11px] text-base-content/40 mt-0.5">
          {barcode || ''}
        </p>
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        <span className="capitalize text-sm text-base-content/70">
          {category}
        </span>
      </td>

      {/* Price */}
      <td className="px-4 py-3 ">
        <p className="font-bold text-sm text-base-content">${price}</p>
        {comparePrice && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="line-through text-[11px] text-base-content/40">
              ${comparePrice}
            </span>
            {discountPercentage > 0 && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                -{discountPercentage}%
              </span>
            )}
          </div>
        )}
      </td>

      {/* Stock */}
      <td className="px-4 py-3">
        <StockPill stock={stock} />
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <StatusBadge status={status} />
      </td>

      {/* Colors & Tags */}
      <td className="px-4 py-3 ">
        <ColorDots colors={colors} />
        <div className="mt-1.5">
          <TagChips tags={tags} />
        </div>
      </td>

      {/* Featured */}
      <td className="px-4 py-3 text-center">
        {isFeatured ? (
          <span title="Featured" className="text-amber-400 text-base">
            ⭐
          </span>
        ) : (
          <span className="text-base-content/20 text-xs">—</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <button className="btn btn-xs btn-ghost rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-600 font-semibold">
            Edit
          </button>
          <button className="btn btn-xs btn-ghost rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500">
            <svg
              className="w-3.5 h-3.5"
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
      </td>
    </tr>
  );
}
