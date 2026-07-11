// components/ProductsPage/FilterSidebar.jsx
'use client';

import { BRANDS, CATEGORIES, COLORS, SIZES } from './FilterConstants';
import { FilterSection, StarRating, ChevronIcon } from './ui';

export default function FilterSidebar({
  // state values
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
  // setters
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
}) {
  return (
    <div className="w-full">
      {/* Header */}
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

      {/* ── Category ── */}
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
                        className={`text-sm transition-colors ${
                          selectedCategories.includes(sub.name)
                            ? 'text-gray-900 font-semibold'
                            : 'text-gray-500 group-hover:text-gray-800'
                        }`}
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

      {/* ── Price ── */}
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

      {/* ── Color ── */}
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

      {/* ── Size ── */}
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

      {/* ── Rating ── */}
      <FilterSection title="Min Rating">
        <div className="space-y-1.5">
          {[4, 3, 2, 1, 0].map((r) => (
            <label
              key={r}
              className="flex items-center gap-2.5 cursor-pointer py-0.5"
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

      {/* ── Availability ── */}
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

      {/* ── Brands ── */}
      <FilterSection title="Brands" defaultOpen={false}>
        <div className="space-y-1.5">
          {BRANDS.map((b) => (
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
}
