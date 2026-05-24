'use client';

import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import ProductRow from '@/Components/Dashboard/Products/ProductRow';
import Skeleton from '@/Components/Dashboard/Products/Skeleton';
import { useQuery } from '@tanstack/react-query';

export default function ProductsPage() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/api/products');
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-base-200/40">
      <DashboardHeader
        title="Products"
        description="Manage all your store products"
      />

      <div className="mt-6 bg-base-100 shadow-sm border border-base-300 rounded-2xl w-full overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-base-200 flex-wrap">
          <label className="input input-bordered input-sm flex items-center gap-2 rounded-xl max-w-xs w-full focus-within:border-blue-400 transition-colors">
            <svg
              className="w-3.5 h-3.5 text-base-content/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path
                d="m21 21-4.35-4.35"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products…"
              className="grow bg-transparent outline-none text-sm"
            />
          </label>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost rounded-xl border border-base-300 font-semibold text-xs gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4h18M7 8h10M11 12h2"
                />
              </svg>
              Filter
            </button>
            <button className="btn btn-sm btn-primary rounded-xl font-semibold text-xs gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v14M5 12h14"
                />
              </svg>
              Add Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead>
              <tr className="bg-base-50 text-xs text-base-content/50 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">SKU / Barcode</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Colors & Tags</th>
                <th className="px-4 py-3 font-semibold text-center">
                  Featured
                </th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
              ) : isError ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-red-500">
                    <p className="font-semibold">Failed to load products</p>
                    <p className="text-xs mt-1 text-base-content/50">
                      {error?.message}
                    </p>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-16 text-base-content/40"
                  >
                    <div className="text-4xl mb-3">📦</div>
                    <p className="font-semibold text-base">No products yet</p>
                    <p className="text-xs mt-1">
                      Add your first product to get started
                    </p>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <ProductRow key={product._id} product={product} />
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        {!isLoading && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-base-200 text-xs text-base-content/50">
            <span>
              Showing {products.length} product
              {products.length !== 1 ? 's' : ''}
            </span>
            <div className="flex gap-1">
              <button className="btn btn-xs btn-ghost rounded-lg">
                ← Prev
              </button>
              <button className="btn btn-xs btn-ghost rounded-lg">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
