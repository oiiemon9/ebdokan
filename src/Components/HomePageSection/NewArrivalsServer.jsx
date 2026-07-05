import NewArrivalClient from './NewArrivalClient';

// ── Mock fallback (remove once DB connected) ───────────────────────────────
const newArrivals = [
  {
    _id: '1',
    productName: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: '3,499',
    comparePrice: '4,999',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    ],
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
  },
  {
    _id: '2',
    productName: 'Smart RGB Gaming Keyboard',
    category: 'Gaming',
    price: '2,899',
    comparePrice: '3,500',
    images: [
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80',
    ],
    rating: 4.8,
    reviewCount: 94,
    isNew: true,
  },
  {
    _id: '3',
    productName: 'Running Shoes Pro Max',
    category: 'Footwear',
    price: '5,999',
    comparePrice: '7,500',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    ],
    rating: 4.6,
    reviewCount: 211,
    isNew: false,
  },
  {
    _id: '4',
    productName: 'Luxury Skincare Gift Set',
    category: 'Beauty',
    price: '1,899',
    comparePrice: '2,500',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    ],
    rating: 4.4,
    reviewCount: 76,
    isNew: true,
  },
  {
    _id: '5',
    productName: 'Mechanical Gaming Mouse',
    category: 'Gaming',
    price: '1,599',
    comparePrice: null,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
    ],
    rating: 4.7,
    reviewCount: 183,
    isNew: true,
  },
  {
    _id: '6',
    productName: 'Leather Yoga Mat Premium',
    category: 'Sports',
    price: '2,199',
    comparePrice: '2,800',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',
    ],
    rating: 4.3,
    reviewCount: 52,
    isNew: false,
  },
];

export default async function NewArrivalsServer() {
  return <NewArrivalClient products={newArrivals} />;
}
