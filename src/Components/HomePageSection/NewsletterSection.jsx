'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) return;
    setLoading(true);
    // Replace with real API call: await fetch('/api/newsletter', {...})
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
    setLoading(false);
  };

  return (
    <section className="pb-8">
      <div className="relative overflow-hidden bg-[#eeece8] ">
        {/* ── Shoe image — right side ── */}
        <div
          className="absolute right-0 top-0 bottom-0
        w-[220px] sm:w-[300px] md:w-[380px] lg:w-[460px]
        pointer-events-none select-none"
        >
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=85"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-left"
          />
          {/* Inner left fade so it blends into bg */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #eeece8 5%, rgba(238,236,232,0.6) 45%, transparent 80%)',
            }}
          />
        </div>

        {/* ── Main content ── */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6
        py-14 sm:py-16 md:py-20
        flex items-center justify-center md:justify-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl text-center md:text-left"
          >
            {/* Heading */}
            <h2
              className="text-gray-900 text-2xl sm:text-3xl md:text-[34px] font-normal leading-tight mb-3"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Subscribe To Our Newsletter
            </h2>

            {/* Sub text */}
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
              Subscribe to our latest newsletter to get news about special
              discounts &amp; upcoming sales
            </p>

            {/* Form / Success */}
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 bg-emerald-50 border border-emerald-200
                rounded-xl px-5 py-4 justify-center md:justify-start"
              >
                <svg
                  className="w-5 h-5 text-emerald-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-emerald-700 font-semibold text-sm">
                  You're in! Welcome to EbDokan family 🎉
                </p>
              </motion.div>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="flex items-stretch shadow-sm rounded-xl overflow-hidden
                  w-full max-w-lg mx-auto md:mx-0"
                >
                  {/* Email input */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Email"
                    required
                    className="flex-1 px-5 text-sm text-gray-700 bg-white
                    border border-gray-200 border-r-0
                    rounded-l-xl outline-none
                    placeholder-gray-400
                    focus:border-gray-400 transition-colors"
                    style={{ height: '52px' }}
                  />

                  {/* Subscribe button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 sm:px-8 text-white font-black text-xs sm:text-sm
                    tracking-widest uppercase rounded-r-xl
                    transition-all hover:opacity-90 active:scale-[0.98]
                    disabled:opacity-60 shrink-0"
                    style={{
                      background: '#b5183a',
                      height: '52px',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {loading ? (
                      <svg
                        className="w-5 h-5 animate-spin mx-auto"
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
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>

                {error && (
                  <p className="text-red-500 text-xs mt-2 text-center md:text-left">
                    {error}
                  </p>
                )}

                <p className="text-gray-400 text-xs mt-3 text-center md:text-left">
                  🔒 We respect your privacy. No spam, ever.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
