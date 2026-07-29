'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages, totalCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', page);

    router.push(`/products?${params.toString()}`, {
      scroll: true,
    });
  };

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const start = (currentPage - 1) * 20 + 1;
  const end = Math.min(currentPage * 20, totalCount);

  return (
    <div className="mt-10">
      <p className="text-sm text-gray-500 text-center mb-5">
        Showing {start} - {end} of {totalCount} products
      </p>

      <div className="flex items-center justify-center gap-1.5 ">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
          className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
                  border border-gray-200 bg-white text-gray-600
                  hover:border-gray-400 hover:text-gray-900
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all active:scale-95"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>
        {/* Page numbers */}
        <div className="flex items-center gap-1 flex-wrap">
          {getPages().map((page, index) =>
            page === '...' ? (
              <span
                key={index}
                className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
              >
                …
              </span>
            ) : (
              <button
                key={index}
                onClick={() => changePage(page)}
                className={`cursor-pointer w-9 h-9 rounded-xl text-sm font-bold transition-all active:scale-95
                      ${
                        currentPage === page
                          ? 'bg-[#1a1a2e] text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
                      }`}
              >
                {page}
              </button>
            ),
          )}
        </div>
        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
          className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
                  border border-gray-200 bg-white text-gray-600
                  hover:border-gray-400 hover:text-gray-900
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all active:scale-95"
        >
          Next
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
