'use client';

import { useState } from 'react';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

const SHOP_LINKS = [
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'T-Shirts & Fashion', href: '/category/fashion' },
  { label: 'Electronics', href: '/category/electronics' },
  { label: 'Sports Items', href: '/category/sports' },
  { label: 'Beauty Items', href: '/category/beauty' },
  { label: 'Home & Living', href: '/category/home' },
];

const ACCOUNT_LINKS = [
  { label: 'My Account', href: '/account' },
  { label: 'My Orders', href: '/my-orders' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Cart', href: '/cart' },
  { label: 'Track Order', href: '/track-order' },
  { label: 'Returns', href: '/returns' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
];

export default function Footer() {
  const payments = [
    'https://sslcommerz.com/wp-content/uploads/2024/04/bkash.svg',
    'https://sslcommerz.com/wp-content/uploads/2024/04/visa.svg',
    'https://sslcommerz.com/wp-content/uploads/2024/04/nagad.svg',
    'https://sslcommerz.com/wp-content/uploads/2024/04/rocket.svg',
    'https://sslcommerz.com/wp-content/uploads/2024/04/upay.svg',
    'https://sslcommerz.com/wp-content/uploads/2024/04/visa.svg',
    'https://sslcommerz.com/wp-content/uploads/2024/04/mastercard.svg',
    'https://sslcommerz.com/wp-content/uploads/2024/04/amex.svg',
    'https://sslcommerz.com/wp-content/uploads/2024/04/dbbl.svg',
  ];
  return (
    <footer className="relative overflow-hidden bg-black ">
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#1a1a1a] to-[#000000] opacity-50 pointer-events-none z-10"></div>

      {/* ── Main content ── */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="absolute   bg-gradient-to-tr from-primary/20 h-[700px] w-[700px] border border-accent/30 -top-20 -left-80 rotate-50"></div>
        <div className="absolute   bg-gradient-to-tr from-primary/20 h-[700px] w-[700px] border border-accent/30 -top-20 -left-80 rotate-45"></div>
        <div className="absolute   bg-gradient-to-tr from-primary/20 h-[700px] w-[700px] border border-accent/30 -top-20 -left-80 rotate-40"></div>
        <div className="absolute   bg-gradient-to-tr from-primary/20 h-[700px] w-[700px] border border-accent/30 -top-20 -left-80 rotate-35"></div>
        <div className="relative z-20">
          {/* ── Top grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Col 1 — Brand + contact */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 shrink-0 mr-2 w-fit"
              >
                <div className="w-20 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  <img src="/EbDokanLogo.png" alt="" />
                </div>
              </Link>

              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs mt-5">
                Bangladesh's trusted eCommerce marketplace. Shop from thousands
                of genuine products at the best prices — delivered fast to your
                door.
              </p>

              {/* Contact info */}
              <div className="space-y-3 mb-6">
                {[
                  {
                    icon: (
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
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ),
                    text: 'House 12, Road 4, Dhanmondi, Dhaka-1205, Bangladesh',
                  },
                  {
                    icon: (
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    ),
                    text: '+880 1800-000000',
                    href: 'tel:+8801800000000',
                  },
                  {
                    icon: (
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                    text: 'support@ebdokan.com',
                    href: 'mailto:support@ebdokan.com',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/35 shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white/55 text-sm leading-relaxed hover:text-white/90 transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-white/55 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Social icons */}
              <div>
                <p className="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-2">
                  {[
                    {
                      label: 'Facebook',
                      href: '#',
                      icon: (
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      ),
                      color: '#1877F2',
                    },
                    {
                      label: 'Instagram',
                      href: '#',
                      icon: (
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      ),
                      color: '#E1306C',
                    },
                    {
                      label: 'Twitter',
                      href: '#',
                      icon: (
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      ),
                      color: '#1DA1F2',
                    },
                    {
                      label: 'LinkedIn',
                      href: '#',
                      icon: (
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      ),
                      color: '#0A66C2',
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/[0.08]
                      flex items-center justify-center text-white/50
                      hover:bg-white/[0.13] hover:text-white hover:-translate-y-0.5
                      transition-all"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                        fill="currentColor"
                      >
                        {s.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 2 — Shop */}
            <div>
              <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">
                Shop
              </h4>
              <ul className="space-y-3">
                {SHOP_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 text-sm hover:text-white/90 hover:translate-x-0.5
                      transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Account */}
            <div>
              <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">
                Account
              </h4>
              <ul className="space-y-3">
                {ACCOUNT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 text-sm hover:text-white/90 hover:translate-x-0.5
                      transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Company + Newsletter */}
            <div>
              <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">
                Company
              </h4>
              <ul className="space-y-3 mb-8">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 text-sm hover:text-white/90 hover:translate-x-0.5
                      transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="h-px "
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
            }}
          />

          <div className="my-6 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* SSLCommerz */}
            <div className="shrink-0">
              <img
                src="https://res.cloudinary.com/dzfrakxek/image/upload/v1783400091/logo_nkq8hh.png"
                alt="SSLCommerz"
                className="h-10 object-contain"
              />
            </div>

            {/* Payment Methods */}
            <div className=" w-96 overflow-hidden">
              <Marquee
                speed={35}
                gradient
                gradientColor="#000"
                gradientWidth={100}
              >
                {payments.map((logo, index) => (
                  <div
                    key={index}
                    className="mx-6 flex items-center justify-center bgb"
                  >
                    <img
                      src={logo}
                      alt=""
                      className="h-10 w-auto object-contain brightness-80 hover:brightness-125  transition"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
          <div
            className="h-px mb-6"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
            }}
          />

          <div>
            {/* Copyright */}
            <p className="text-white/35 text-xs text-center ">
              © {new Date().getFullYear()} EbDokan. All Rights Reserved.{' '}
              <span className="text-white/20">
                Various trademarks held by their respective owners.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
