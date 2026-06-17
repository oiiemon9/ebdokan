import { getHotDeals } from '@/app/lib/api';
import Image from 'next/image';
import Link from 'next/link';

const HotDeals = async () => {
  const deals = await getHotDeals();

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Hot Deals</h2>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5  gap-6">
        {deals.map((deal) => (
          <Link
            key={deal._id}
            href={`/products/${deal._id}`}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-2.5 relative"
          >
            <div className="absolute top-3.5 left-3.5 flex gap-1">
              {/* Badge */}
              {deal.isNew ||
                (true && (
                  <span className=" bg-red-100 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full z-10">
                    New!
                  </span>
                ))}
              {deal.discountPercentage && (
                <span className=" bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                  -{deal.discountPercentage}%
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors group">
              <svg
                viewBox="0 0 24 24"
                className="w-4.5 h-4.5 stroke-gray-400 fill-none stroke-2 group-hover:stroke-red-400 transition-colors"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Image */}
            <div className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src={
                  deal?.images?.[0] ||
                  'https://res.cloudinary.com/dzfrakxek/image/upload/v1779854366/image-not-available_i7kvke.png'
                }
                alt={deal.productName}
                width={300}
                height={300}
                className="w-full h-full object-contain p-2.5"
              />
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                TK {parseInt(deal.price).toLocaleString()}
              </span>
              {deal.comparePrice && (
                <span className="text-sm text-gray-400 line-through">
                  TK {parseInt(deal.comparePrice).toLocaleString()}
                </span>
              )}
            </div>

            {/* Name & Description */}
            <p
              title={deal?.productName}
              className="text-sm font-semibold text-gray-900 leading-snug text-nowrap overflow-hidden text-ellipsis"
            >
              {deal.productName}
            </p>
            <p className="text-xs text-gray-500 leading-relaxed text-nowrap overflow-hidden text-ellipsis">
              {deal?.shortDescription}
            </p>

            {/* Stars */}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-amber-400 tracking-wide text-lg">
                {'★'.repeat(Math.floor(deal.rating || 3.5))}
                {'☆'.repeat(5 - Math.floor(deal.rating || 3.5))}
              </span>
              <span>
                {deal.rating || 3.5}
                {deal.reviewCount || 50
                  ? ` (${deal.reviewCount?.toLocaleString() || 50} reviews)`
                  : ''}
              </span>
            </div>

            {/* CTA */}
            <button className="mt-auto border-1.5 border-gray-900 text-gray-900 text-xs font-semibold px-4 py-2.5 rounded-full w-fit hover:bg-gray-900 hover:text-white transition-colors">
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HotDeals;
