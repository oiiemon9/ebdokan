// components/ProductsPage/index.jsx
'use client';

import { useState, useCallback } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import FilterSidebar from './FilterSidebar';
import { SORT_OPTIONS } from './FilterConstants';

export default function ProductsPage({
  products,
  totalCount,
  totalPages,
  currentPage,
  selectedCategory,
}) {
  // ── Filter state ─────────────────────────────────────────────────────────
  const [selectedCategories, setSelectedCategories] = useState(
    selectedCategory === 'all' ? [] : [selectedCategory],
  );
  const [priceRange, setPriceRange] = useState([100, 800]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState(['L']);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [sortBy, setSortBy] = useState('Popularity');
  const [catExpanded, setCatExpanded] = useState({ 'Man Fashion': true });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ── Applied filter chips ─────────────────────────────────────────────────
  const appliedFilters = [
    ...selectedCategories.map((c) => ({ type: 'category', label: c })),
    ...(priceRange[0] > 0 || priceRange[1] < 1000
      ? [{ type: 'price', label: `$${priceRange[0]} - $${priceRange[1]}` }]
      : []),
    ...selectedColors.map((c) => ({ type: 'color', label: c })),
    ...selectedSizes.map((s) => ({ type: 'size', label: `Size ${s}` })),
  ];

  const removeFilter = (filter) => {
    if (filter.type === 'category')
      setSelectedCategories((p) => p.filter((c) => c !== filter.label));
    else if (filter.type === 'price') setPriceRange([0, 1000]);
    else if (filter.type === 'color')
      setSelectedColors((p) => p.filter((c) => c !== filter.label));
    else if (filter.type === 'size')
      setSelectedSizes((p) => p.filter((s) => `Size ${s}` !== filter.label));
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setMinRating(0);
    setInStock(false);
    setOnSale(false);
  };

  // Generic array toggle helper
  const toggleArr = useCallback((arr, setArr, val) => {
    setArr((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  }, []);

  // Shared props passed down to FilterSidebar
  const filterProps = {
    selectedCategories,
    priceRange,
    selectedColors,
    selectedSizes,
    selectedBrands,
    minRating,
    inStock,
    onSale,
    catExpanded,
    appliedFilters,
    setSelectedCategories,
    setPriceRange,
    setSelectedColors,
    setSelectedSizes,
    setSelectedBrands,
    setMinRating,
    setInStock,
    setOnSale,
    setCatExpanded,
    toggleArr,
    clearAll,
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* ── Mobile filter toggle button ── */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200
              rounded-xl text-sm font-semibold text-gray-700
              hover:border-gray-400 transition-colors"
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            Filter Products
            {appliedFilters.length > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {appliedFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* ── Mobile filter drawer ── */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />
            {/* Panel */}
            <div
              className="absolute left-0 top-0 h-full w-[300px] bg-white shadow-2xl
              overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-gray-900">Filters</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
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

              <div className="p-5">
                <FilterSidebar {...filterProps} />
              </div>

              <div className="sticky bottom-0 bg-white p-5">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#1a1a2e] text-white rounded-xl
                  font-semibold text-sm "
                >
                  Apply Filters ({appliedFilters.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Main layout ── */}
        <div className="flex gap-7">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
            <div
              className="bg-white rounded-2xl border border-gray-100 p-5
              sticky top-[109px] h-[calc(100vh-109px)] overflow-y-auto"
            >
              <FilterSidebar {...filterProps} />
            </div>
          </aside>

          {/* Product area */}
          <main className="flex-1 min-w-0">
            {/* ── Topbar: result count + sort ── */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <p className="text-sm text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-800">
                  {products.length}
                </span>{' '}
                results from total{' '}
                <span className="font-semibold text-gray-800">
                  {totalCount}
                </span>
                {/* {searchQuery && (
                  <>
                    {' '}
                    for{' '}
                    <span className="font-semibold text-gray-800 italic">
                      "{searchQuery}"
                    </span>
                  </>
                )} */}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 hidden sm:inline">
                  Sort by
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 bg-white rounded-xl px-3 py-2
                    text-gray-700 focus:outline-none focus:border-indigo-400 cursor-pointer
                    hover:border-gray-300 transition-colors"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── Applied filter chips ── */}
            {appliedFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs text-gray-400 font-medium">
                  Applied:
                </span>
                {appliedFilters.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => removeFilter(f)}
                    className="flex items-center gap-1.5 bg-white border border-gray-200
                      text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full
                      hover:border-red-300 hover:bg-red-50 hover:text-red-600
                      transition-all group"
                  >
                    <span className="uppercase tracking-wide text-[10px]">
                      {f.label}
                    </span>
                    <svg
                      className="w-3 h-3 text-gray-400 group-hover:text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={clearAll}
                  className="text-xs text-red-500 font-semibold hover:text-red-700 ml-1 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* ── Product grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-5">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>

            {/* ── Pagination ── */}
            <div className="flex items-center justify-center gap-1.5 mt-10">
              {/* Prev */}
              <button
                disabled={currentPage <= 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
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
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition-all active:scale-95
                      ${
                        p === currentPage
                          ? 'bg-[#1a1a2e] text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
                      }`}
                  >
                    {p}
                  </button>
                ))}
                <span className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
                  …
                </span>
                {[12, 13, 14, 15].map((p) => (
                  <button
                    key={p}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition-all active:scale-95
                      ${
                        p === currentPage
                          ? 'bg-[#1a1a2e] text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                disabled={currentPage >= totalPages}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
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
          </main>
        </div>
      </div>
    </div>
  );
}
