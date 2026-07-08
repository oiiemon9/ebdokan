'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    name: 'Man Fashion',
    count: null,
    children: [
      { name: 'Jackets & Coats', count: 127 },
      { name: 'Shirts', count: 108 },
      { name: 'T-shirts', count: 84 },
      { name: 'Outer & Blazer', count: 53 },
      { name: 'Hoodie', count: 46 },
      { name: 'Pants', count: 42 },
    ],
  },
  { name: 'Woman Fashion', count: null, children: [] },
  { name: 'Shoes & Bag', count: null, children: [] },
  { name: 'Accessories', count: null, children: [] },
];

const COLORS = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Grey', hex: '#888888' },
  { name: 'Red', hex: '#c0392b' },
  { name: 'Tasco', hex: '#1a6b6b' },
  { name: 'Brown', hex: '#8b6914' },
  { name: 'Purple', hex: '#7c3aed' },
  { name: 'Green', hex: '#1a6b3a' },
  { name: 'Yellow', hex: '#d4a017' },
  { name: 'Blue', hex: '#1a3a7a' },
  { name: 'Cream', hex: '#f5f0eb' },
];

const SIZES = [
  '4XL',
  '3XL',
  '2XL',
  'XL',
  'L',
  'M',
  'S',
  'XS',
  '2XS',
  'All Size',
];
const SORT_OPTIONS = [
  'Popularity',
  'Price: Low to High',
  'Price: High to Low',
  'Newest',
  'Rating',
];

// ── Small components ───────────────────────────────────────────────────────

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3 h-3 ${s <= Math.floor(rating) ? 'text-amber-400' : s <= Math.ceil(rating) && rating % 1 ? 'text-amber-300' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Simple product card (placeholder — replace with your own) ──────────────
function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden
        hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5
        transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="text-4xl text-gray-200">👕</div>
            <p className="text-gray-300 text-xs">No image</p>
          </div>
        )}
        {/* Discount badge */}
        {product.comparePrice > product.price && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">
            -
            {Math.round(
              ((product.comparePrice - product.price) / product.comparePrice) *
                100,
            )}
            %
          </span>
        )}
        {product.stock <= 5 && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-indigo-600 text-[10px] font-black tracking-wider uppercase mb-1">
          {product.category}
        </p>
        <h3
          className="text-gray-800 text-sm font-semibold leading-snug mb-2 line-clamp-1
          group-hover:text-indigo-600 transition-colors"
        >
          {product.productName}
        </h3>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-1 mb-2.5">
            {product.colors.slice(0, 5).map((c, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-white shadow-sm shrink-0"
                style={{ background: c }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-gray-400 text-[10px] ml-0.5">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 mb-1">
          <StarRating rating={product.rating} />
          <span className="text-gray-400 text-[10px]">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-900 font-black text-base">
            ${product.price}
          </span>
          {product.comparePrice > product.price && (
            <span className="text-gray-400 text-xs line-through">
              ${product.comparePrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function ProductsPage({
  products,
  totalCount = 127,
  searchQuery = 'Jacket & Coats',
  currentPage = 1,
  totalPages = 15,
}) {
  // ── Filter state ──
  const [selectedCategories, setSelectedCategories] = useState([
    'Jackets & Coats',
  ]);
  const [priceRange, setPriceRange] = useState([100, 800]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState(['L']);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [sortBy, setSortBy] = useState('Popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [catExpanded, setCatExpanded] = useState({ 'Man Fashion': true });

  // Applied filters for chips
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

  const toggleArr = useCallback((arr, setArr, val) => {
    setArr((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  }, []);

  // ── Filter sidebar content ──
  const FilterSidebar = () => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-black text-gray-900">Filter Products</h2>
        {appliedFilters.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="mb-1">
            <button
              onClick={() =>
                setCatExpanded((p) => ({ ...p, [cat.name]: !p[cat.name] }))
              }
              className="flex items-center justify-between w-full py-1.5 text-left"
            >
              <span
                className={`text-sm font-semibold ${catExpanded[cat.name] ? 'text-gray-900' : 'text-gray-600'}`}
              >
                {cat.name}
              </span>
              {cat.children.length > 0 ? (
                <ChevronIcon open={!!catExpanded[cat.name]} />
              ) : (
                <svg
                  className="w-4 h-4 text-gray-300"
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
              )}
            </button>
            {catExpanded[cat.name] && cat.children.length > 0 && (
              <div className="ml-3 mt-1 space-y-1 pb-1">
                {cat.children.map((sub) => (
                  <label
                    key={sub.name}
                    className="flex items-center justify-between cursor-pointer py-1 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(sub.name)}
                        onChange={() =>
                          toggleArr(
                            selectedCategories,
                            setSelectedCategories,
                            sub.name,
                          )
                        }
                        className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
                      />
                      <span
                        className={`text-sm transition-colors ${selectedCategories.includes(sub.name) ? 'text-gray-900 font-semibold' : 'text-gray-500 group-hover:text-gray-800'}`}
                      >
                        {sub.name}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs">{sub.count}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price">
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full accent-indigo-600 h-1.5 rounded-full cursor-pointer"
          />
          <div className="flex items-center justify-between mt-3 gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                From
              </label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-700
                  focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                To
              </label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-700
                  focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() =>
                toggleArr(selectedColors, setSelectedColors, c.name)
              }
              title={c.name}
              className={`relative w-7 h-7 rounded-full border-2 transition-all hover:scale-110
                ${
                  selectedColors.includes(c.name)
                    ? 'border-indigo-600 ring-2 ring-indigo-200 scale-110'
                    : 'border-transparent hover:border-gray-300'
                }`}
              style={{ background: c.hex }}
            >
              {selectedColors.includes(c.name) && (
                <svg
                  className="absolute inset-0 m-auto w-3 h-3"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {COLORS.map((c) => (
            <span
              key={c.name}
              className="text-[10px] text-gray-400"
              style={{ width: '28px', textAlign: 'center' }}
            >
              {c.name}
            </span>
          ))}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div className="grid grid-cols-3 gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleArr(selectedSizes, setSelectedSizes, s)}
              className={`py-1.5 text-xs font-semibold rounded-lg border transition-all
                ${
                  selectedSizes.includes(s)
                    ? 'bg-[#1a1a2e] text-white border-[#1a1a2e]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Min Rating">
        <div className="space-y-1.5">
          {[4, 3, 2, 1, 0].map((r) => (
            <label
              key={r}
              className="flex items-center gap-2.5 cursor-pointer py-0.5 group"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="w-4 h-4 accent-indigo-600 cursor-pointer"
              />
              <div className="flex items-center gap-1.5">
                {r > 0 ? (
                  <>
                    <StarRating rating={r} />
                    <span className="text-xs text-gray-500">& up</span>
                  </>
                ) : (
                  <span className="text-xs text-gray-500">All ratings</span>
                )}
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Extras */}
      <FilterSection title="Availability" defaultOpen={false}>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
            />
            <span className="text-sm text-gray-600">In Stock Only</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={onSale}
              onChange={(e) => setOnSale(e.target.checked)}
              className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
            />
            <span className="text-sm text-gray-600">On Sale</span>
          </label>
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands" defaultOpen={false}>
        <div className="space-y-1.5">
          {['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', "Levi's"].map((b) => (
            <label key={b} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleArr(selectedBrands, setSelectedBrands, b)}
                className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
              />
              <span className="text-sm text-gray-600">{b}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ── Mobile filter toggle ── */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200
              rounded-xl text-sm font-semibold text-gray-700 hover:border-gray-400 transition-colors"
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
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div
              className="absolute left-0 top-0 h-full w-[300px] bg-white shadow-2xl
              overflow-y-auto p-5"
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
              <FilterSidebar />
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-4 py-3 bg-[#1a1a2e] text-white rounded-xl font-semibold text-sm"
              >
                Apply Filters ({appliedFilters.length})
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-7">
          {/* ── Left: Filter sidebar (desktop) ── */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-[109px] h-[calc(100vh-109px)] overflow-y-auto">
              <FilterSidebar />
            </div>
          </aside>

          {/* ── Right: Product area ── */}
          <main className="flex-1 min-w-0">
            {/* Result info + sort */}
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
                {searchQuery && (
                  <>
                    {' '}
                    for{' '}
                    <span className="font-semibold text-gray-800 italic">
                      "{searchQuery}"
                    </span>
                  </>
                )}
              </p>

              {/* Sort */}
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

            {/* Applied filter chips */}
            {appliedFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs text-gray-400 font-medium">
                  Applied:
                </span>
                {appliedFilters.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => removeFilter(f)}
                    className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-red-300
                      text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full
                      hover:bg-red-50 hover:text-red-600 transition-all group"
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

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
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
