'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// ── Data ──────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: 'Electronics', icon: '💻', href: '/category/electronics' },
  { label: 'Fashion', icon: '👗', href: '/category/fashion' },
  { label: 'Groceries', icon: '🛒', href: '/category/groceries' },
  { label: 'Home & Living', icon: '🏠', href: '/category/home-living' },
  { label: 'Beauty', icon: '✨', href: '/category/beauty' },
  { label: 'Sports', icon: '⚽', href: '/category/sports' },
  { label: 'Automotive', icon: '🚗', href: '/category/automotive' },
  {
    label: 'Mobile Accessories',
    icon: '📱',
    href: '/category/mobile-accessories',
  },
  { label: 'Gaming', icon: '🎮', href: '/category/gaming' },
  { label: 'Baby & Toys', icon: '🧸', href: '/category/baby-toys' },
];

const SLIDES = [
  {
    id: 1,
    badge: '⚡ LIMITED TIME OFFER',
    heading1: 'Power Up',
    heading2: 'Your Life',
    sub: 'Up To 70% Off Electronics',
    desc: 'Premium brands at unbeatable prices. Shop now!',
    bg: 'from-[#0a0f2e] via-[#0d1540] to-[#111827]',
    accent: '#6366f1',
    stats: [
      { dot: '#6366f1', text: '50K+ Products' },
      { dot: '#22c55e', text: '10K+ Vendors' },
      { dot: '#f59e0b', text: 'Fast Delivery' },
    ],
    imgEmoji: '💻',
  },
  {
    id: 2,
    badge: '🔥 MEGA SALE',
    heading1: 'Style For',
    heading2: 'Every Season',
    sub: 'Up To 60% Off Fashion',
    desc: 'Trendy collections from top brands worldwide.',
    bg: 'from-[#1a0a2e] via-[#2d0f40] to-[#1a0f27]',
    accent: '#a855f7',
    stats: [
      { dot: '#a855f7', text: 'New Arrivals' },
      { dot: '#ec4899', text: 'Top Brands' },
      { dot: '#f59e0b', text: 'Free Returns' },
    ],
    imgEmoji: '👗',
  },
  {
    id: 3,
    badge: '🎮 GAMER WEEK',
    heading1: 'Level Up',
    heading2: 'Your Game',
    sub: 'Up To 50% Off Gaming Gear',
    desc: 'Latest consoles, accessories & more.',
    bg: 'from-[#0a1f0a] via-[#0f2d16] to-[#0a1a12]',
    accent: '#22c55e',
    stats: [
      { dot: '#22c55e', text: 'Latest Gear' },
      { dot: '#06b6d4', text: 'Top Rated' },
      { dot: '#f59e0b', text: 'Same Day Ship' },
    ],
    imgEmoji: '🎮',
  },
];

const PROMO_CARDS = [
  {
    tag: 'ELECTRONICS',
    title: 'Latest Phones',
    sub: 'Up to 40% Off',
    btnText: 'Shop Now',
    bg: 'from-[#4f46e5] to-[#7c3aed]',
    href: '/category/electronics',
    emoji: '📱',
  },
  {
    tag: 'FASHION',
    title: 'New Arrivals',
    sub: 'Flat 30% Off',
    btnText: 'Explore',
    bg: 'from-[#ef4444] to-[#dc2626]',
    href: '/category/fashion',
    emoji: '👘',
  },
];

// ── Animation variants ─────────────────────────────────────────────────────

const slideContent = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const slideItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const categoryItem = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 + i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};

const promoCard = {
  hidden: { opacity: 0, x: 24 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ── SlideContent ───────────────────────────────────────────────────────────

function SlideContent({ slide, active }) {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key={slide.id}
          variants={slideContent}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
          className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 max-w-lg"
        >
          {/* Badge */}
          <motion.div variants={slideItem}>
            <span
              className="inline-flex items-center gap-1.5 text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full mb-4 tracking-wider"
              style={{ background: slide.accent }}
            >
              {slide.badge}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={slideItem}
            className="text-white font-extrabold leading-tight mb-1"
          >
            <span className="text-3xl sm:text-4xl lg:text-5xl block">
              {slide.heading1}
            </span>
            <span
              className="text-3xl sm:text-4xl lg:text-5xl block"
              style={{ color: slide.accent }}
            >
              {slide.heading2}
            </span>
          </motion.h1>

          {/* Sub + desc */}
          <motion.p
            variants={slideItem}
            className="text-white font-semibold text-base sm:text-lg mt-3 mb-1"
          >
            {slide.sub}
          </motion.p>
          <motion.p
            variants={slideItem}
            className="text-white/55 text-xs sm:text-sm mb-6"
          >
            {slide.desc}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={slideItem}
            className="flex items-center gap-2 sm:gap-3 mb-6 flex-wrap"
          >
            <Link
              href="/shop"
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-white text-xs sm:text-sm font-bold transition-all hover:opacity-90 hover:scale-105 active:scale-95"
              style={{ background: slide.accent }}
            >
              Shop Now
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
            <Link
              href="/deals"
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-white text-xs sm:text-sm font-semibold border border-white/30 hover:bg-white/10 transition-all"
            >
              View Deals
            </Link>
          </motion.div>

          {/* Stats — hidden on very small */}
          <motion.div
            variants={slideItem}
            className="hidden sm:flex items-center gap-4 flex-wrap"
          >
            {slide.stats.map((s) => (
              <span
                key={s.text}
                className="flex items-center gap-1.5 text-white/60 text-xs font-medium"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: s.dot }}
                />
                {s.text}
              </span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── PromoCard ──────────────────────────────────────────────────────────────

function PromoCard({ card, index, vertical }) {
  return (
    <motion.div
      custom={index}
      variants={promoCard}
      initial="hidden"
      animate="visible"
      className={vertical ? 'flex-1 min-h-0' : 'flex-1'}
    >
      <Link
        href={card.href}
        className={`relative flex flex-col justify-between p-4 rounded-2xl overflow-hidden bg-gradient-to-br ${card.bg} group h-full`}
      >
        <div>
          <span className="text-white/60 text-[9px] font-bold tracking-[0.15em] uppercase">
            {card.tag}
          </span>
          <h3 className="text-white font-bold text-base sm:text-lg leading-tight mt-0.5">
            {card.title}
          </h3>
          <p className="text-white/70 text-xs mt-0.5">{card.sub}</p>
        </div>

        {/* Emoji decoration */}
        <div className="absolute right-2 bottom-8 text-4xl sm:text-5xl opacity-20 select-none pointer-events-none group-hover:opacity-30 transition-opacity">
          {card.emoji}
        </div>

        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full group-hover:gap-2.5 transition-all group-hover:shadow-lg">
            {card.btnText}
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </div>

        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
      </Link>
    </motion.div>
  );
}

// ── Main HeroSection ───────────────────────────────────────────────────────

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCat, setActiveCat] = useState(0);

  return (
    <>
      <style>{`
        .hero-swiper .swiper-pagination {
          bottom: 14px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 8px; height: 8px;
          background: rgba(255,255,255,0.4);
          opacity: 1;
          transition: all 0.3s;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #fff;
        }
      `}</style>

      <section className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
        <div className=" grid grid-cols-12 gap-3 h-full md:h-[300px] lg:h-[500px]">
          {/* Category sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden xl:col-span-2 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm xl:flex flex-col"
          >
            <div className="px-4 py-3 bg-[#1a1a2e] flex items-center gap-2 shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="text-white font-semibold text-sm">
                All Categories
              </span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  custom={i}
                  variants={categoryItem}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={cat.href}
                    onClick={() => setActiveCat(i)}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm transition-all group
                      ${
                        activeCat === i
                          ? 'bg-red-50 text-red-600 font-semibold border-r-2 border-red-500'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                      }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-sm">{cat.icon}</span>
                      <span className="text-[13px]">{cat.label}</span>
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 transition-colors ${activeCat === i ? 'text-red-500' : 'text-gray-300 group-hover:text-indigo-400'}`}
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
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            className="col-span-12 md:col-span-9 xl:col-span-8 relative rounded-2xl overflow-hidden shadow-lg"
          >
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
              className="hero-swiper h-full w-full"
              onSlideChange={(s) => setActiveSlide(s.realIndex)}
            >
              {SLIDES.map((slide) => (
                <SwiperSlide key={slide.id}>
                  {({ isActive }) => (
                    <div
                      className={`relative h-full w-full bg-gradient-to-br ${slide.bg} overflow-hidden`}
                    >
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div
                          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
                          style={{ background: slide.accent }}
                        />
                        <div
                          className="absolute -bottom-16 right-32 w-48 h-48 rounded-full opacity-[0.07]"
                          style={{ background: slide.accent }}
                        />
                      </div>
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[140px] opacity-15 select-none pointer-events-none">
                        {slide.imgEmoji}
                      </div>
                      <SlideContent slide={slide} active={isActive} />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Promo cards — vertical */}
          <div className=" col-span-12 md:col-span-3 xl:col-span-2 flex md:flex-col gap-3">
            {PROMO_CARDS.map((card, i) => (
              <PromoCard key={card.title} card={card} index={i} vertical />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
