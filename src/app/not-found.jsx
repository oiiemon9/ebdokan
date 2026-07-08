'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-screen pt-12 justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-white to-primary/10">
      {/* Soft ambient blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-10 h-40 w-40 rounded-full bg-secondary/10 blur-2xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center">
        {/* 404 with mountain illustration tucked behind it */}
        <div className="relative flex w-full justify-center">
          <span className="select-none text-[110px] font-extrabold leading-none tracking-tight text-slate-800 sm:text-[160px]">
            404
          </span>

          <svg
            viewBox="0 0 400 140"
            className="absolute bottom-0 left-1/2 h-24 w-64 -translate-x-1/2 sm:h-32 sm:w-80"
            aria-hidden="true"
          >
            <path
              d="M0 140 L90 55 L130 90 L200 20 L270 90 L310 55 L400 140 Z"
              fill="#0f172a"
              fillOpacity="0.06"
            />
            <path
              d="M130 90 L155 65 L175 82 L200 20 L225 82 L245 65 L270 90"
              fill="none"
              stroke="#0f172a"
              strokeOpacity="0.18"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="mt-8 text-2xl font-semibold text-slate-700 sm:text-3xl">
          It looks like you've lost your way&hellip;
        </h1>
        <p className="mt-3 max-w-md text-sm text-slate-500 sm:text-base">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to shopping.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full  px-7 py-3 text-sm font-semibold   bg-red-600 hover:bg-red-700
            text-white transition-all hover:gap-3"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5 12 3l9 6.5" />
              <path d="M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10" />
            </svg>
            Go to the homepage
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Continue shopping
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
