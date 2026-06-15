'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const steps = [
  { label: 'Cart', path: '/cart', icon: '🛒', step: 0 },
  { label: 'Checkout', path: '/checkout', icon: '📋', step: 1 },
  { label: 'Payment', path: '/checkout/payment', icon: '💳', step: 2 },
  { label: 'Success', path: '/checkout/success', icon: '✅', step: 3 },
];

export default function CheckoutLayout({ children }) {
  const pathname = usePathname();

  const currentStep = (() => {
    if (pathname.includes('success')) return 3;
    if (pathname.includes('payment')) return 2;
    if (pathname === '/checkout') return 1;
    return 0;
  })();

  return (
    <div className="min-h-screen bg-[#0b0f1a]">
      {/* ── Progress bar ── */}
      <div className="bg-[#0d1117] border-b border-white/[0.07] py-5">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center">
            {steps.map((s, i) => {
              const isDone = currentStep > s.step;
              const isActive = currentStep === s.step;
              const isLast = i === steps.length - 1;

              return (
                <div
                  key={s.step}
                  className="flex items-center flex-1 last:flex-none"
                >
                  {/* Step circle */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                      ${isDone ? 'bg-emerald-500 text-white shadow-[0_0_16px_rgba(16,185,129,0.4)]' : ''}
                      ${isActive ? 'bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-[0_0_16px_rgba(56,189,248,0.4)]' : ''}
                      ${!isDone && !isActive ? 'bg-white/[0.06] border border-white/10 text-white/30' : ''}`}
                    >
                      {isDone ? (
                        <svg
                          className="w-4 h-4"
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
                      ) : (
                        <span>{s.icon}</span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-medium tracking-wide whitespace-nowrap
                      ${isActive ? 'text-sky-400' : isDone ? 'text-emerald-400' : 'text-white/25'}`}
                    >
                      {s.label}
                    </span>
                  </div>

                  {/* Connector line */}
                  {!isLast && (
                    <div className="flex-1 mx-2 mb-5">
                      <div className="h-[2px] rounded-full bg-white/[0.07] relative overflow-hidden">
                        <div
                          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500
                          ${isDone ? 'w-full bg-emerald-500/60' : 'w-0'}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
