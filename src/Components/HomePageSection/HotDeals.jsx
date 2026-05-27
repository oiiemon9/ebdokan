import { getHotDeals } from '@/app/lib/api';
import Image from 'next/image';

const HotDeals = async () => {
  const deals = await getHotDeals();

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Hot Deals</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <div key={deal._id} className="bg-white p-4 rounded-lg shadow-md">
            <div>
              <Image
                src={
                  deal?.images[0] ||
                  'https://res.cloudinary.com/dzfrakxek/image/upload/v1779854366/image-not-available_i7kvke.png'
                }
                alt={deal.productName}
                width={300}
                height={300}
                className="w-full aspect-square object-cover mb-4 rounded"
              />
            </div>
            <h3 className="text-lg font-semibold">{deal.productName}</h3>
            <p className="text-gray-600">{deal.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotDeals;
