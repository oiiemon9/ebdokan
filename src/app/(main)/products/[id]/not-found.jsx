'use client';

import Link from 'next/link';

export default function ProductNotFoundPage() {
  return (
    <section className="relative flex min-h-screen pt-12 justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-white to-primary/10">
      {/* Soft ambient blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-10 h-40 w-40 rounded-full bg-secondary/10 blur-2xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center">
        {/* Empty shopping bag illustration with a "missing tag" */}
        <div className="relative flex h-[180px] w-full items-center justify-center sm:h-[220px]">
          {/* dashed ring behind the bag */}
          <svg
            viewBox="0 0 220 220"
            className="absolute h-44 w-44 sm:h-56 sm:w-56"
            aria-hidden="true"
          >
            <circle
              cx="110"
              cy="110"
              r="95"
              fill="none"
              stroke="#0f172a"
              strokeOpacity="0.12"
              strokeWidth="2"
              strokeDasharray="6 10"
              strokeLinecap="round"
            />
          </svg>

          {/* shopping bag */}
          <svg
            viewBox="0 0 160 160"
            className="relative h-28 w-28 sm:h-36 sm:w-36"
            aria-hidden="true"
          >
            <path
              d="M40 55 L45 30 a15 15 0 0 1 15-13 h40 a15 15 0 0 1 15 13 l5 25"
              fill="none"
              stroke="#0f172a"
              strokeOpacity="0.35"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="28"
              y="55"
              width="104"
              height="88"
              rx="10"
              fill="#0f172a"
              fillOpacity="0.06"
              stroke="#0f172a"
              strokeOpacity="0.25"
              strokeWidth="4"
            />
          </svg>

          {/* question mark tag, tucked over the bag like the mountain-peeking trick */}
          <div className="absolute -right-1 top-2 flex h-14 w-14 rotate-6 items-center justify-center rounded-2xl bg-red-600 text-2xl font-extrabold text-white shadow-lg shadow-red-200 sm:h-16 sm:w-16 sm:text-3xl">
            ?
          </div>
        </div>

        {/* Message */}
        <h1 className="mt-8 text-2xl font-semibold text-slate-700 sm:text-3xl">
          This product seems to have sold out of existence&hellip;
        </h1>
        <p className="mt-3 max-w-md text-sm text-slate-500 sm:text-base">
          We couldn't find the product you're looking for. It may be out of
          stock, removed, or the link might be outdated.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/shop"
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
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6 5 3H2" />
              <circle
                cx="9"
                cy="20"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="17"
                cy="20"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            Browse other products
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Go to the homepage
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
