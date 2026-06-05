'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const isLogin = pathname?.includes('login');

  return (
    <div className="bg-[#060910] font-[Outfit,sans-serif]">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]
          [background-image:radial-gradient(circle,rgba(255,255,255,0.9)_1px,transparent_1px)]
          [background-size:28px_28px]"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row items-center justify-between min-h-screen ">
        {/* ══ LEFT PANEL ══ */}
        <div className="w-full lg:w-fit max-w-[510px] px-6 ">
          {/* Logo */}
          <div className="">
            <div className="relative overflow-hidden rounded-xl  bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08]">
              <Link
                href="/"
                className="flex flex-col items-center space-y-3 p-6 "
              >
                <div className="relative">
                  <img
                    src="/EbDokanLogoWhite.png"
                    alt="EB Dokan Logo"
                    className="relative h-12 w-auto object-contain drop-shadow-lg"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex flex-col relative z-10 mt-12 gap-12">
            {/* Headline + features */}
            <div className="relative z-10 max-w-sm">
              <p className="text-sky-400 text-[11px] font-medium tracking-[0.18em] uppercase mb-4">
                {isLogin ? 'Welcome back' : 'Join us today'}
              </p>

              <h1
                className="text-white text-[46px] leading-[1.12] font-light mb-5
            [font-family:'Cormorant_Garamond',serif]"
              >
                {isLogin ? (
                  <>
                    <span>Shop smarter,</span>
                    <br />
                    <em className="text-sky-400 not-italic">live better.</em>
                  </>
                ) : (
                  <>
                    <span>Your style,</span>
                    <br />
                    <em className="text-violet-400 not-italic">your story.</em>
                  </>
                )}
              </h1>

              <p className="text-white/40 text-sm leading-[1.75] mb-8">
                {isLogin
                  ? 'Access your orders, wishlist, and exclusive deals curated just for you.'
                  : 'Create your account and unlock personalized recommendations, faster checkout, and member-only offers.'}
              </p>

              {/* Feature cards */}
              <div className="flex flex-col gap-3">
                {(isLogin
                  ? [
                      {
                        icon: '🚚',
                        bg: 'bg-sky-500/10',
                        title: 'Track every order',
                        sub: 'Real-time updates, always.',
                      },
                      {
                        icon: '♡',
                        bg: 'bg-pink-500/10',
                        title: 'Your wishlist, saved',
                        sub: 'Pick up where you left off.',
                      },
                      {
                        icon: '⚡',
                        bg: 'bg-amber-400/10',
                        title: 'Flash deals, unlocked',
                        sub: 'Members-only pricing.',
                      },
                    ]
                  : [
                      {
                        icon: '🎁',
                        bg: 'bg-violet-500/10',
                        title: 'Welcome gift',
                        sub: '10% off your first order.',
                      },
                      {
                        icon: '🔒',
                        bg: 'bg-sky-500/10',
                        title: 'Secure & private',
                        sub: 'Your data is always safe.',
                      },
                      {
                        icon: '🌟',
                        bg: 'bg-amber-400/10',
                        title: 'Loyalty points',
                        sub: 'Earn with every purchase.',
                      },
                    ]
                ).map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-3 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-2xl px-4 py-3.5 transition-colors"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl ${f.bg} flex items-center justify-center text-base shrink-0`}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <p className="text-white/85 text-[13px] font-medium">
                        {f.title}
                      </p>
                      <p className="text-white/35 text-[12px] mt-0.5">
                        {f.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="relative z-10 flex gap-8">
              {[
                ['50K+', 'Products'],
                ['4.9★', 'Avg Rating'],
                ['2M+', 'Happy Buyers'],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="text-white font-semibold text-xl">{v}</p>
                  <p className="text-white/30 text-[11px] mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className=" flex-1 flex justify-center lg:justify-end px-6 py-12 relative w-full ">
          {/* Card */}
          <div
            className="w-full max-w-[510px]  rounded-3xl px-8 py-9
          bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] relative z-10"
          >
            {/* Tab switcher */}
            <div className="flex gap-0 bg-white/[0.05] rounded-xl p-1 mb-8">
              <Link href="/login" className="flex-1">
                <button
                  className={`w-full h-10 rounded-[10px] text-[13px] font-medium transition-all
                ${
                  isLogin
                    ? 'bg-white/10 text-white shadow-[0_2px_12px_rgba(0,0,0,0.3)]'
                    : 'text-white/40 hover:text-white/60'
                }`}
                >
                  Sign In
                </button>
              </Link>
              <Link href="/register" className="flex-1">
                <button
                  className={`w-full h-10 rounded-[10px] text-[13px] font-medium transition-all
                ${
                  !isLogin
                    ? 'bg-white/10 text-white shadow-[0_2px_12px_rgba(0,0,0,0.3)]'
                    : 'text-white/40 hover:text-white/60'
                }`}
                >
                  Create Account
                </button>
              </Link>
            </div>

            {/* Animated form swap */}
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className=""
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
