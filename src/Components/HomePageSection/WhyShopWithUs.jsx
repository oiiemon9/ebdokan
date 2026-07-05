'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

// ── Feature cards data ─────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 1,
    title: 'Genuine Products',
    desc: 'Every product is 100% authentic, sourced directly from verified brands and trusted suppliers.',
    emoji: '✅',
    bg: '#f8f7f4',
    span: 'col', // top-left text card
  },
  {
    id: 2,
    title: 'Fast Delivery',
    desc: 'Get your orders delivered to your doorstep within 24–48 hours anywhere in Bangladesh.',
    emoji: '🚚',
    bg: '#f8f7f4',
    span: 'col', // top-right text card
  },
  {
    id: 3,
    title: 'Best Price Guaranteed',
    desc: 'We match or beat any price. Shop confidently knowing you always get the best deal.',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=80',
    imgAlt: 'Shopping deals',
    bg: '#1a1a2e',
    span: 'image-dark', // bottom-left dark image card
  },
  {
    id: 4,
    title: 'Secure Payments',
    desc: 'No followers? No problem. Shop freely with bKash, Nagad, card, or cash on delivery.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80',
    imgAlt: 'Secure checkout',
    bg: '#e8f0fe',
    span: 'image-light', // bottom-right light image card
  },
];

// ── Small icon card ────────────────────────────────────────────────────────
function TextCard({ title, desc, emoji, bg, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-2xl p-6 flex flex-col justify-between min-h-[200px]"
      style={{ background: bg }}
    >
      {/* Icon circle */}
      <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl mb-4">
        {emoji}
      </div>

      <div>
        <h3 className="text-gray-900 font-bold text-base mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ── Image card ─────────────────────────────────────────────────────────────
function ImageCard({ title, desc, img, imgAlt, bg, dark, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[300px]"
      style={{ background: bg }}
    >
      {/* Background image */}
      <img
        src={img}
        alt={imgAlt}
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
      />

      {/* Overlay gradient */}
      <div
        className={`absolute inset-0 ${
          dark
            ? 'bg-gradient-to-t from-black/80 via-black/30 to-transparent'
            : 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'
        }`}
      />

      {/* Text — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <h3 className="text-white font-bold text-base sm:text-lg mb-1.5">
          {title}
        </h3>
        <p className="text-white/75 text-xs sm:text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────
export default function WhyShopWithUs() {
  return (
    <section className="container mx-auto px-3 sm:px-4 py-10 sm:py-14">
      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* ── Cell 1: Heading (left tall) ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col justify-between rounded-2xl p-6 sm:p-8
            bg-white border border-gray-100
            lg:row-span-2"
        >
          <div>
            <p className="text-indigo-600 text-[11px] font-black tracking-[0.18em] uppercase mb-4 flex items-center gap-2">
              <span className="w-0.5 h-4 bg-indigo-600 rounded-full inline-block" />
              Why EbDokan
            </p>
            <h2 className="text-gray-900 text-3xl sm:text-4xl font-black leading-tight mb-4">
              Why{'\n'}Shop With{'\n'}
              <em
                className="not-italic"
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                Us
              </em>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              This isn't just another online shop. It's your trusted marketplace
              — quality products, honest prices, and a seamless experience every
              time.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white
                text-sm font-semibold px-5 py-3 rounded-xl
                hover:bg-indigo-700 transition-colors group"
            >
              Start Shopping
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* ── Cell 2: Genuine Products ── */}
        <TextCard
          title="Genuine Products"
          desc="Every product is 100% authentic, sourced directly from verified brands and trusted suppliers."
          emoji="✅"
          bg="#f8f7f4"
          index={1}
        />

        {/* ── Cell 3: Fast Delivery ── */}
        <TextCard
          title="Fast Delivery"
          desc="Get your orders delivered to your doorstep within 24–48 hours anywhere in Bangladesh."
          emoji="🚚"
          bg="#f8f7f4"
          index={2}
        />

        {/* ── Cell 4: Best Price — image dark ── */}
        <ImageCard
          title="Best Price Guaranteed"
          desc="We match or beat any price. Shop confidently knowing you always get the best deal."
          img="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
          imgAlt="Best deals shopping"
          bg="#1a1a2e"
          dark
          index={3}
        />

        {/* ── Cell 5: Secure Payments — image light ── */}
        <ImageCard
          title="Secure Payments"
          desc="Pay with bKash, Nagad, card, or cash on delivery — always safe and encrypted."
          img="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
          imgAlt="Secure online payment"
          dark
          index={4}
        />
      </div>

      {/* ── Stats row ── */}
      <motion.div
        variants={fadeUp}
        custom={5}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4"
      >
        {[
          { value: '50K+', label: 'Products', icon: '📦' },
          { value: '2M+', label: 'Happy Customers', icon: '😊' },
          { value: '10K+', label: 'Vendors', icon: '🏪' },
          { value: '4.9★', label: 'Avg Rating', icon: '⭐' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={5 + i * 0.5}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white border border-gray-100 rounded-2xl px-5 py-4
              flex items-center gap-3 hover:border-indigo-200 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="text-gray-900 font-black text-lg leading-none">
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
