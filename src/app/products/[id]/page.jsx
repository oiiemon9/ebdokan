import { getProduct } from '@/app/lib/api';
import ProductHero from '@/Components/ProductDetails/ProductHero';
import Tab from '@/Components/ProductDetails/Tab';

const relatedProducts = [
  {
    id: 1,
    name: 'Cassidy Atlas',
    price: 480,
    comparePrice: 600,
    rating: 4.7,
    reviews: 143,
    color: '#14b8a6',
    badge: 'New',
  },
  {
    id: 2,
    name: 'Lennox Forte',
    price: 390,
    comparePrice: null,
    rating: 4.5,
    reviews: 98,
    color: '#f43f5e',
    badge: 'Sale',
  },
  {
    id: 3,
    name: 'Orion Vault',
    price: 720,
    comparePrice: 900,
    rating: 4.9,
    reviews: 207,
    color: '#2d6a4f',
    badge: 'Featured',
  },
  {
    id: 4,
    name: 'Sylva Dune',
    price: 310,
    comparePrice: null,
    rating: 4.3,
    reviews: 56,
    color: '#d4a574',
    badge: null,
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function StarIcon({ filled, half }) {
  return (
    <svg
      className={`w-4 h-4 ${filled || half ? 'text-amber-400' : 'text-gray-200'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating, size = 'sm' }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          filled={star <= Math.floor(rating)}
          half={star === Math.ceil(rating) && rating % 1 !== 0}
        />
      ))}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default async function Page({ params }) {
  const { id } = await params;
  const data = await getProduct(id);

  return (
    <div className="min-h-screen  font-['DM_Sans',sans-serif]">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,400&display=swap');
        :root { --accent: #1a1a2e; --accent2: #e8b86d; }
        .tab-active { border-bottom: 2px solid #1a1a2e; color: #1a1a2e; font-weight: 600; }
        .thumb-active { border: 2px solid #1a1a2e; }
        @keyframes pop { 0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)} }
        .pop { animation: pop 0.25s ease; }
      `}</style>
      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-gray-400 font-medium tracking-wide uppercase">
          <span className="hover:text-gray-700 cursor-pointer transition-colors">
            Home
          </span>
          <span>/</span>
          {/* <span className="hover:text-gray-700 cursor-pointer transition-colors capitalize">
            {product.category}
          </span> */}
          <span>/</span>
          {/* <span className="text-gray-700">{product.productName}</span> */}
        </nav>
      </div>
      {/* ── Product Hero ── */}
      <ProductHero data={data} />
      {/* ── Tabs ── */}
      <Tab />
      {/* ── Related Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-['Fraunces'] font-semibold text-[#1a1a2e]">
            You Might Also Like
          </h2>
          <button className="text-sm font-medium text-[#1a1a2e] underline underline-offset-2 hover:opacity-70 transition-opacity">
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {relatedProducts.map((rp) => (
            <div
              key={rp.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div
                className="aspect-square relative"
                style={{ background: `${rp.color}22` }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <svg
                      className="w-12 h-12 mx-auto"
                      style={{ color: rp.color }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        strokeWidth="1.5"
                      />
                      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
                      <path d="M21 15l-5-5L5 21" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
                {rp.badge && (
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide ${rp.badge === 'Sale' ? 'bg-rose-500 text-white' : rp.badge === 'New' ? 'bg-[#e8b86d] text-[#1a1a2e]' : 'bg-[#1a1a2e] text-white'}`}
                  >
                    {rp.badge}
                  </span>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 text-sm mb-1 truncate group-hover:text-[#1a1a2e] transition-colors">
                  {rp.name}
                </h4>
                <div className="flex items-center gap-1 mb-2">
                  <StarRating rating={rp.rating} />
                  <span className="text-xs text-gray-400">({rp.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1a1a2e]">${rp.price}</span>
                  {rp.comparePrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${rp.comparePrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ── Recently Viewed ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl font-['Fraunces'] font-semibold text-[#1a1a2e] mb-5">
          Recently Viewed
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...relatedProducts].reverse().map((rp) => (
            <div
              key={rp.id}
              className="shrink-0 w-36 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div
                className="w-full h-28"
                style={{ background: `${rp.color}22` }}
              >
                <div className="w-full h-full flex items-center justify-center opacity-30">
                  <svg
                    className="w-8 h-8"
                    style={{ color: rp.color }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      strokeWidth="1.5"
                    />
                    <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
                    <path d="M21 15l-5-5L5 21" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {rp.name}
                </p>
                <p className="text-xs font-bold text-[#1a1a2e] mt-0.5">
                  ${rp.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ── Sticky Add to Cart (mobile) ──
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl lg:hidden z-50">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div>
            <p className="text-xs text-gray-400 font-medium">
              {product.productName}
            </p>
            <p className="text-base font-bold text-[#1a1a2e]">
              ${product.price}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-11 rounded-xl font-semibold text-sm transition-all ${addedToCart ? 'bg-emerald-500 text-white' : 'bg-[#1a1a2e] text-white hover:bg-[#2d2d4e] active:scale-95'}`}
          >
            {addedToCart ? '✓ Added!' : '+ Add to Cart'}
          </button>
        </div>
      </div> */}
    </div>
  );
}
