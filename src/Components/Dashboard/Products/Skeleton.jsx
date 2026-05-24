import React from 'react';

export default function Skeleton() {
  return (
    <tr className="border-t border-base-200">
      {/* Product */}
      <td className="px-3 sm:px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="skeleton w-8 h-10 sm:w-10 sm:h-12 rounded-lg shrink-0" />

          <div className="space-y-1.5">
            <div className="skeleton h-3 w-16 sm:w-20 rounded" />
            <div className="skeleton h-2.5 w-14 sm:w-16 rounded hidden sm:block" />
          </div>
        </div>
      </td>

      {/* Price (hide on very small screens) */}
      <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
        <div className="skeleton h-3 w-14 sm:w-20 rounded" />
      </td>

      {/* Category */}
      <td className="px-3 sm:px-4 py-3 hidden md:table-cell">
        <div className="skeleton h-3 w-12 sm:w-16 rounded" />
      </td>

      {/* Stock */}
      <td className="px-3 sm:px-4 py-3 hidden md:table-cell">
        <div className="space-y-1">
          <div className="skeleton h-3 w-10 sm:w-14 rounded" />
          <div className="skeleton h-2.5 w-8 sm:w-10 rounded" />
        </div>
      </td>

      {/* Status */}
      <td className="px-3 sm:px-4 py-3 hidden lg:table-cell">
        <div className="skeleton h-5 w-10 sm:w-12 rounded-full" />
      </td>

      {/* Badge */}
      <td className="px-3 sm:px-4 py-3 hidden lg:table-cell">
        <div className="skeleton h-5 w-12 sm:w-14 rounded-full" />
      </td>

      {/* Date */}
      <td className="px-3 sm:px-4 py-3 hidden xl:table-cell">
        <div className="skeleton h-3 w-14 sm:w-16 rounded" />
      </td>

      {/* Checkbox */}
      <td className="px-3 sm:px-4 py-3">
        <div className="skeleton h-4 w-4 rounded mx-auto" />
      </td>

      {/* Actions */}
      <td className="px-3 sm:px-4 py-3">
        <div className="flex gap-2 justify-end">
          <div className="skeleton h-7 w-8 sm:w-12 rounded-lg" />
          <div className="skeleton h-7 w-7 rounded-lg" />
        </div>
      </td>
    </tr>
  );
}
