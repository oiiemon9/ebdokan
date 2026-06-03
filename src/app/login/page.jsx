'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';

export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const floatAnimation = {
    y: [0, -8, 4, 0],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  const floatAnimation2 = {
    y: [0, -12, 6, 0],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  const floatAnimation3 = {
    y: [0, -6, 8, 0],
    rotate: [0, -1, 1, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <>
      <style>{`
        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #e2e2e2, transparent);
        }
 
        .pattern-bg {
          background-color: #0f0e17;
          background-image:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99,102,241,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,92,246,0.14) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 70%);
        }
        .card-glass {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
        }
      `}</style>

      <div className="font-sans-dm min-h-screen flex pattern-bg">
        {/* ── Left panel (decorative) ── */}
        <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-14">
          {/* Floating blobs */}
          <motion.div
            animate={floatAnimation}
            className="absolute top-[12%] left-[10%] w-56 h-56 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none"
          />
          <motion.div
            animate={floatAnimation2}
            className="absolute bottom-[15%] right-[8%] w-72 h-72 rounded-full bg-violet-500/10 blur-3xl pointer-events-none"
          />

          <motion.div
            animate={floatAnimation3}
            className="absolute top-[50%] left-[50%] w-40 h-40 rounded-full bg-emerald-500/8 blur-2xl pointer-events-none"
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                ShopNest
              </span>
            </div>
          </div>

          {/* Center text */}
          <div className="relative z-10 max-w-md">
            <p className="text-indigo-300 text-sm font-medium tracking-widest uppercase mb-4">
              Welcome back
            </p>
            <h1 className="font-serif text-white text-5xl leading-[1.15] mb-6">
              Your next great
              <br />
              <span className="italic text-indigo-300">purchase</span> awaits.
            </h1>
            <p className="text-white/50 text-base leading-relaxed">
              Sign in to track orders, manage your wishlist, and discover
              curated picks just for you.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                ['50K+', 'Products'],
                ['4.9★', 'Rating'],
                ['2M+', 'Customers'],
              ].map(([val, label]) => (
                <div key={label}>
                  <div className="text-white font-semibold text-xl">{val}</div>
                  <div className="text-white/40 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom testimonial */}
          <div className="relative z-10">
            <div className="bg-white/8 border border-white/10 rounded-2xl p-5 max-w-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic">
                "ShopNest has the best curation I've seen. Every order arrives
                beautifully packaged."
              </p>
              <div className="flex items-center gap-2.5 mt-4">
                <div className="w-7 h-7 rounded-full bg-indigo-400 flex items-center justify-center text-white text-xs font-bold">
                  R
                </div>
                <div>
                  <div className="text-white text-xs font-medium">
                    Rafiq Islam
                  </div>
                  <div className="text-white/40 text-[11px]">
                    Verified Customer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel (form) ── */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
          {/* Mobile logo */}
          <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span className="text-white font-semibold">ShopNest</span>
          </div>

          <div className="card-glass w-full max-w-md rounded-3xl shadow-2xl p-8 sm:p-10">
            {/* Header */}
            <motion.div
              custom={0.05}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-8"
            >
              <h2 className="font-serif text-3xl text-gray-900 mb-1.5">
                Sign in
              </h2>
              <p className="text-gray-400 text-sm">
                New here?{' '}
                <Link
                  href="/register"
                  className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </motion.div>

            {/* Social buttons */}
            <motion.div
              custom={0.15}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="grid grid-cols-2 gap-3 mb-6"
            >
              {/* Google */}
              <motion.button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                whileHover={{
                  y: -2,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.10)',
                }}
                whileTap={{
                  y: 0,
                }}
                className="social-btn flex items-center justify-center gap-2.5 h-11 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </motion.button>

              {/* Facebook */}
              <motion.button
                whileHover={{
                  y: -2,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.10)',
                }}
                whileTap={{
                  y: 0,
                }}
                className="social-btn flex items-center justify-center gap-2.5 h-11 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div
              custom={0.25}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-4 mb-6"
            >
              <div className="divider-line" />
              <span className="text-gray-400 text-xs font-medium tracking-wide">
                or continue with email
              </span>
              <div className="divider-line" />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <motion.div
                custom={0.35}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className={`w-4 h-4 transition-colors ${focused === 'email' ? 'text-indigo-500' : 'text-gray-400'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="you@example.com"
                    required
                    className="input-field w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                custom={0.45}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className={`w-4 h-4 transition-colors ${focused === 'password' ? 'text-indigo-500' : 'text-gray-400'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    placeholder="Min. 8 characters"
                    required
                    className="input-field w-full h-11 pl-10 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPass ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Remember me */}
              <motion.div
                custom={0.45}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer select-none"
                >
                  Keep me signed in
                </label>
              </motion.div>

              {/* Submit */}
              <motion.div
                custom={0.55}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={
                    !loading
                      ? {
                          y: -2,
                          boxShadow: '0 8px 24px rgba(99,102,241,0.45)',
                        }
                      : {}
                  }
                  whileTap={!loading ? { y: 0 } : {}}
                  className=" w-full h-12 rounded-xl font-semibold text-sm text-white disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: loading
                      ? '#818cf8'
                      : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  }}
                >
                  {loading ? (
                    <>
                      <svg
                        className="spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="white"
                          strokeWidth="3"
                        />
                        <path
                          className="opacity-75"
                          fill="white"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in
                      <svg
                        className="w-4 h-4"
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
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Footer note */}
            <p className="fade-up-6 text-center text-xs text-gray-400 mt-6 leading-relaxed">
              By signing in, you agree to our{' '}
              <Link
                href="/terms"
                className="text-gray-600 hover:text-indigo-600 underline underline-offset-2 transition-colors"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-indigo-600 underline underline-offset-2 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
