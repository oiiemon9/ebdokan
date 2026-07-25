'use client';

import { useState, useCallback } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import FilterSidebar from './FilterSidebar';
import { SORT_OPTIONS } from './FilterConstants';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from './Pagination';

export default function ProductsPage({
  products,
  totalCount,
  totalPages,
  currentPage,
  categoryTree,
  availableColors,
  availableSizes,
  availableBrands,
  search,
  category,
  subCategories,
  minPrice,
  maxPrice,
  colors,
  sizes,
  brands,
}) {
  // ── Filter state ─────────────────────────────────────────────────────────

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const searchParams = useSearchParams();
  const sortBy = searchParams.get('sort') || 'popularity';
  const [catExpanded, setCatExpanded] = useState({ 'Man Fashion': true });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const router = useRouter();

  // ── Applied filter chips ─────────────────────────────────────────────────

  const appliedFilters = [];
  if (category) {
    appliedFilters.push({
      type: 'category',
      value: category,
    });
  }
  subCategories.forEach((subCategory) => {
    appliedFilters.push({
      type: 'subCategory',
      value: subCategory,
    });
  });
  colors.forEach((color) => {
    appliedFilters.push({
      type: 'color',
      value: color,
    });
  });
  sizes.forEach((size) => {
    appliedFilters.push({
      type: 'size',
      value: size,
    });
  });
  if (minPrice !== undefined || maxPrice !== undefined) {
    appliedFilters.push({
      type: 'price',
      value: `${minPrice ?? 0} - ${maxPrice ?? '∞'}`,
    });
  }
  brands.forEach((brand) => {
    appliedFilters.push({
      type: 'brand',
      value: brand,
    });
  });

  const removeFilter = (filter) => {
    const params = new URLSearchParams(searchParams.toString());

    switch (filter.type) {
      case 'category':
        params.delete('category');
        params.delete('subCategory'); // category remove হলে subCategory-ও remove
        break;

      case 'subCategory': {
        const subCategories = params.getAll('subCategory');

        params.delete('subCategory');

        subCategories
          .filter((item) => item !== filter.value)
          .forEach((item) => params.append('subCategory', item));

        break;
      }

      case 'color': {
        const colors = params.getAll('color');

        params.delete('color');

        colors
          .filter((item) => item !== filter.value)
          .forEach((item) => params.append('color', item));

        break;
      }

      case 'size': {
        const sizes = params.getAll('size');

        params.delete('size');

        sizes
          .filter((item) => item !== filter.value)
          .forEach((item) => params.append('size', item));

        break;
      }

      case 'price':
        params.delete('minPrice');
        params.delete('maxPrice');
        break;

      case 'brand': {
        const brand = params.getAll('brand');

        params.delete('brand');

        brand
          .filter((item) => item !== filter.value)
          .forEach((item) => params.append('brand', item));

        break;
      }
    }

    params.set('page', '1');

    router.push(`/products?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());

    // সব filter remove

    params.delete('category');
    params.delete('subCategory');
    params.delete('color');
    params.delete('size');
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('brand');
    params.delete('rating');
    params.delete('inStock');
    params.delete('onSale');

    params.set('page', '1');

    router.push(`/products?${params.toString()}`);
  };

  // Generic array toggle helper
  const toggleArr = useCallback((arr, setArr, val) => {
    setArr((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  }, []);

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', sort);
    params.set('page', '1');

    router.push(`/products?${params.toString()}`);
  };

  // Shared props passed down to FilterSidebar
  const filterProps = {
    selectedBrands,
    minRating,
    inStock,
    onSale,
    catExpanded,
    appliedFilters,

    setSelectedBrands,
    setMinRating,
    setInStock,
    setOnSale,
    setCatExpanded,
    toggleArr,
    clearAll,
    categoryTree,
    availableColors,
    availableSizes,
    availableBrands,
    search,
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
                {search && (
                  <>
                    {' '}
                    for{' '}
                    <span className="font-semibold text-gray-800 italic">
                      "{search}"
                    </span>
                  </>
                )}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 hidden sm:inline">
                  Sort by
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="text-sm border border-gray-200 bg-white rounded-xl px-3 py-2
                    text-gray-700 focus:outline-none focus:border-indigo-400 cursor-pointer
                    hover:border-gray-300 transition-colors"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
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
                      transition-all group cursor-pointer"
                  >
                    <span className="uppercase tracking-wide text-[10px]">
                      {f.value}
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
                  className="text-xs text-red-500 font-semibold hover:text-red-700 ml-1 transition-colors cursor-pointer"
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

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
