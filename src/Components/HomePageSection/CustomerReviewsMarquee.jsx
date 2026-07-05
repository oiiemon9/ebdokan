'use client';

import Marquee from 'react-fast-marquee';

const rowOne = [
  {
    name: 'Sarah Mitchell',
    role: 'Verified Buyer · NYC',
    rating: 5,
    quote:
      'EbDokan completely changed how I shop online. The vendor variety is incredible, and every purchase has arrived faster than expected. The buyer protection is the real standout!',
    avatar: 'https://i.pravatar.cc/100?img=47',
    dark: false,
  },
  {
    name: 'Priya Desai',
    role: 'Verified Buyer · Chicago',
    rating: 4.5,
    quote:
      'The flash deals are genuinely unbeatable. I got my Sony headphones for $230 off the regular price! The checkout was seamless and packaging was premium quality.',
    avatar: 'https://i.pravatar.cc/100?img=32',
    dark: false,
  },
  {
    name: 'Daniel Reyes',
    role: 'Verified Buyer · Austin',
    rating: 5,
    quote:
      "Customer support resolved my issue within minutes on live chat. It's rare to find that level of care from an online marketplace these days.",
    avatar: 'https://i.pravatar.cc/100?img=12',
    dark: false,
  },
  {
    name: 'Priya Desai',
    role: 'Verified Buyer · Chicago',
    rating: 4.5,
    quote:
      'The flash deals are genuinely unbeatable. I got my Sony headphones for $230 off the regular price! The checkout was seamless and packaging was premium quality.',
    avatar: 'https://i.pravatar.cc/100?img=32',
    dark: false,
  },
  {
    name: 'Emily Carter',
    role: 'Verified Buyer · Seattle',
    rating: 5,
    quote:
      "I've ordered from EbDokan a dozen times now and every single delivery has been on time. The tracking updates are unusually accurate.",
    avatar: 'https://i.pravatar.cc/100?img=25',
    dark: false,
  },
];

const rowTwo = [
  {
    name: 'James Okafor',
    role: 'Verified Vendor · London',
    rating: 5,
    quote:
      'As a vendor, EbDokan has given me access to a massive customer base with zero hassle. The seller dashboard is intuitive and the support team is always responsive. 5 stars!As a vendor, EbDokan has given me access to a massive customer base with zero hassle. The seller dashboard is intuitive and the support team is always responsive. 5 stars!As a vendor, EbDokan has given me access to a massive customer base with zero hassle. The seller dashboard is intuitive and the support team is always responsive. 5 stars!As a vendor, EbDokan has given me access to a massive customer base with zero hassle. The seller dashboard is intuitive and the support team is always responsive. 5 stars!As a vendor, EbDokan has given me access to a massive customer base with zero hassle. The seller dashboard is intuitive and the support team is always responsive. 5 stars!',
    avatar: 'https://i.pravatar.cc/100?img=68',
    dark: true,
  },
  {
    name: 'Aisha Rahman',
    role: 'Verified Vendor · Dhaka',
    rating: 5,
    quote:
      "Listing products takes minutes, not hours. The vendor tools feel like they were actually built by people who've run a shop before.",
    avatar: 'https://i.pravatar.cc/100?img=5',
    dark: true,
  },
  {
    name: 'Hana Kim',
    role: 'Verified Vendor · Seoul',
    rating: 5,
    quote:
      'Payouts are fast and the analytics actually help me plan restocks. Switching my storefront here was the best call I made this year.',
    avatar: 'https://i.pravatar.cc/100?img=45',
    dark: false,
  },
  {
    name: 'Marco Bellini',
    role: 'Verified Buyer · Milan',
    rating: 4.5,
    quote:
      "The return process took less than five minutes, no back and forth over email. It's the small things that build trust, and EbDokan gets them right.",
    avatar: 'https://i.pravatar.cc/100?img=15',
    dark: false,
  },
  {
    name: 'Aisha Rahman',
    role: 'Verified Vendor · Dhaka',
    rating: 5,
    quote:
      "Listing products takes minutes, not hours. The vendor tools feel like they were actually built by people who've run a shop before.",
    avatar: 'https://i.pravatar.cc/100?img=5',
    dark: true,
  },
];

function Star({ fill = 'full' }) {
  const gradientId = `half-star-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      {fill === 'half' && (
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#E5E7EB" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.59l5.79-.84L10 1.5z"
        fill={
          fill === 'full'
            ? '#FBBF24'
            : fill === 'half'
              ? `url(#${gradientId})`
              : '#E5E7EB'
        }
      />
    </svg>
  );
}

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push('full');
    else if (rating >= i - 0.5) stars.push('half');
    else stars.push('empty');
  }
  return (
    <div className="flex items-center gap-1">
      {stars.map((fill, i) => (
        <Star key={i} fill={fill} />
      ))}
    </div>
  );
}

function ReviewCard({ name, role, rating, quote, avatar, dark }) {
  return (
    <div
      className={[
        'w-[360px] h-[260px] flex flex-col rounded-2xl p-7 shadow-sm shrink-0',
        dark
          ? 'bg-[#0B1220] text-white'
          : 'bg-white text-slate-900 ring-1 ring-slate-100',
      ].join(' ')}
    >
      {/* Top Content */}
      <div className="flex-1 h-full">
        <StarRating rating={rating} />

        <p
          className={[
            'mt-4 text-[15px] italic leading-relaxed line-clamp-4',
            dark ? 'text-slate-200' : 'text-slate-600',
          ].join(' ')}
        >
          "{quote}"
        </p>
      </div>

      {/* Bottom */}
      <div className="mt-auto flex items-center gap-3 pt-5">
        <img
          src={avatar}
          alt={name}
          className="w-11 h-11 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold text-sm">{name}</h4>
          <p
            className={[
              'text-xs',
              dark ? 'text-slate-400' : 'text-slate-500',
            ].join(' ')}
          >
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CustomerReviewsMarquee() {
  return (
    <section className="relative overflow-hidden  container mx-auto px-3 sm:px-4 py-8">
      <div className=" text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-red-500" />
          <span className="text-xs font-bold tracking-widest text-red-500">
            REAL REVIEWS
          </span>
          <span className="h-px w-8 bg-red-500" />
        </div>

        <h2 className="text-accent text-2xl sm:text-3xl font-black leading-tight">
          What Our{' '}
          <span className=" text-gray-700 font-fraunces font-semibold">
            Customers Say
          </span>
        </h2>
      </div>

      <div className="relative mt-14 rounded-2xl ">
        <Marquee
          direction="left"
          speed={40}
          pauseOnHover
          gradient
          gradientWidth={30}
          gradientColor="#F9FAFB"
          className="py-3 overflow-hidden"
        >
          {rowOne.map((review, i) => (
            <div key={i} className="mx-3 flex h-[260px]">
              <ReviewCard {...review} />
            </div>
          ))}
        </Marquee>

        <Marquee
          direction="right"
          speed={40}
          pauseOnHover
          gradient
          gradientWidth={30}
          gradientColor="#F9FAFB"
          className=" py-3 overflow-hidden"
        >
          {rowTwo.map((review, i) => (
            <div key={i} className="mx-3 flex h-[260px]">
              <ReviewCard {...review} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
