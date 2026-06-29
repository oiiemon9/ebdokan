'use client';

import { clearUser } from '@/store/userSlice';
import { signOut, useSession } from 'next-auth/react';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount } from '@/store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── Category data ─────────────────────────────────────────────────────────
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
];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Deals', href: '/deals', badge: '🔥', hot: true },
  { label: 'Vendors', href: '/vendors' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const ANNOUNCEMENT_ITEMS = [
  { icon: '🚀', text: 'Free Shipping' },
  { icon: '⚡', text: 'Flash Sale' },
  { icon: '🔒', text: 'Secure Payments' },
  { icon: '💬', text: 'Support 24/7' },
];

// ── SVG Icons ─────────────────────────────────────────────────────────────
const HeartIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);
const CartIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);
const BellIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);
const UserIcon = () => (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const SearchIcon = () => (
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
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const MenuIcon = () => (
  <svg
    className="w-6 h-6"
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
);
const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const ChevronDown = () => (
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
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
const ChevronRight = () => (
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
      d="M9 5l7 7-7 7"
    />
  </svg>
);

function Badge({ count }) {
  if (!count || count < 1) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center leading-none">
      {count > 99 ? '99+' : count}
    </span>
  );
}

// ── Animation variants ────────────────────────────────────────────────────

// Announcement bar: slides down from -100% and fades in
const announcementVariants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Each announcement item: staggers in
const announcementItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.4, ease: 'easeOut' },
  }),
};

// Sidebar backdrop
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.22, delay: 0.05 } },
};

// Sidebar panel: slides in from left
const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.28, ease: [0.55, 0, 1, 0.45] },
  },
};

// Sidebar content items stagger
const sidebarItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
};

// Account / categories dropdown
const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.14 } },
};

// ── Main Component ────────────────────────────────────────────────────────
export default function NavBar() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const accountRef = useRef(null);
  const catRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handler(e) {
      if (accountRef.current && !accountRef.current.contains(e.target))
        setAccountOpen(false);
      if (catRef.current && !catRef.current.contains(e.target))
        setCatOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim())
      window.location.href = `/search?q=${encodeURIComponent(searchVal.trim())}`;
  };

  const logout = async () => {
    dispatch(clearUser());
    await signOut({ callbackUrl: '/' });
    setAccountOpen(false);
  };

  return (
    <>
      {/* ══ ANNOUNCEMENT BAR — slides down on mount ══ */}
      <motion.div
        className="bg-accent text-white text-xs py-2 hidden sm:block overflow-hidden"
        variants={announcementVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 flex items-center justify-center gap-8">
          {ANNOUNCEMENT_ITEMS.map((item, i) => (
            <motion.span
              key={item.text}
              custom={i}
              variants={announcementItemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-1.5 text-white/80 font-medium"
            >
              <span>{item.icon}</span>
              {item.text}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ══ MAIN HEADER ══ */}
      <header
        className={`bg-white sticky top-0 z-40 transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
      >
        {/* ── Logo + Search + Icons ── */}
        <div className="container mx-auto px-4 h-16 grid grid-cols-8 items-center gap-4">
          {/* Hamburger */}
          <div className="col-span-2 flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 mr-2">
              <div className="w-20 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                <img src="/EbDokanLogo.png" alt="" />
              </div>
            </Link>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="col-span-4 flex-1 max-w-2xl">
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-400 pointer-events-none">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border-2 border-indigo-100 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 outline-none focus:border-secondary focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-0 h-11 px-5 bg-secondary/95 hover:bg-secondary text-white text-sm font-semibold rounded-r-xl transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="col-span-2 flex items-center gap-1 ml-auto shrink-0">
            <Link
              href="/wishlist"
              className="relative hidden md:block p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-primary transition-all"
            >
              <HeartIcon />
              <Badge count={3} />
            </Link>
            <Link
              href="/my-cart"
              className="relative p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-secondary transition-all"
            >
              <CartIcon />
              <Badge count={cartCount} />
            </Link>
            <button className="relative p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-secondary transition-all hidden sm:flex">
              <BellIcon />
              <Badge count={2} />
            </button>

            {/* Account dropdown */}
            <div ref={accountRef} className="relative ml-1 hidden lg:block">
              <button
                onClick={() => setAccountOpen((o) => !o)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary/95 hover:bg-secondary text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <UserIcon />
                <span className="hidden xl:inline">
                  {session?.user?.name?.split(' ')[0] ?? 'Account'}
                </span>
                <motion.span
                  animate={{ rotate: accountOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 origin-top-right"
                  >
                    {session ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-gray-800 font-semibold text-sm truncate">
                            {session.user.name}
                          </p>
                          <p className="text-gray-400 text-xs truncate mt-0.5">
                            {session.user.email}
                          </p>
                        </div>
                        {[
                          { label: '👤 My Profile', href: '/account' },
                          { label: '📦 My Orders', href: '/my-orders' },
                          { label: '♡  Wishlist', href: '/wishlist' },
                          { label: '⚙️ Settings', href: '/account/settings' },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2.5 text-red-500 text-sm hover:bg-red-50 transition-colors"
                          >
                            🚪 Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                        >
                          🔑 Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        >
                          ✨ Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Bottom nav ── */}
        <div className="hidden lg:block border-t border-gray-100 bg-accent">
          <div className="container mx-auto px-4 h-11 flex items-center gap-1">
            {/* Nav links */}

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-1.5 h-11 px-4 text-sm font-medium transition-colors ${link.hot ? 'text-red-500 hover:text-red-400' : 'text-white/80 hover:text-white'}`}
              >
                {link.label}
                {link.badge && <span>{link.badge}</span>}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* ══ MOBILE SIDEBAR — AnimatePresence for smooth mount/unmount ══ */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute left-0 top-0 h-full w-[300px] bg-white shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-[#1a1a2e] shrink-0">
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">
                    E
                  </div>
                  <span className="text-white font-bold text-lg">EbDokan</span>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.85, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <CloseIcon />
                </motion.button>
              </div>

              {/* User info */}
              {session && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.3 }}
                  className="px-5 py-4 bg-indigo-50 border-b border-indigo-100 shrink-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-800 font-semibold text-sm truncate">
                        {session.user.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto">
                {/* Search */}
                <motion.div
                  custom={0}
                  variants={sidebarItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-4 py-4 border-b border-gray-100"
                >
                  <form
                    onSubmit={(e) => {
                      handleSearch(e);
                      setSidebarOpen(false);
                    }}
                  >
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon />
                      </span>
                      <input
                        type="text"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Search products..."
                        className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:bg-white transition-all"
                      />
                    </div>
                  </form>
                </motion.div>

                {/* Menu */}
                <motion.div
                  custom={1}
                  variants={sidebarItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-4 py-3 border-b border-gray-100"
                >
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-2 px-2">
                    Menu
                  </p>
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.label}
                      custom={2 + i}
                      variants={sidebarItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                          ${link.hot ? 'text-orange-500' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'}`}
                      >
                        {link.label}
                        {link.badge && (
                          <span className="text-base">{link.badge}</span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Categories */}
                <motion.div
                  custom={8}
                  variants={sidebarItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-4 py-3 border-b border-gray-100"
                >
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-2 px-2">
                    All Categories
                  </p>
                  {CATEGORIES.map((cat, i) => (
                    <motion.div
                      key={cat.label}
                      custom={9 + i}
                      variants={sidebarItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={cat.href}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-base">{cat.icon}</span>
                          {cat.label}
                        </span>
                        <ChevronRight />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Account */}
                <motion.div
                  custom={18}
                  variants={sidebarItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-4 py-3"
                >
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-2 px-2">
                    Account
                  </p>
                  {session ? (
                    <>
                      {[
                        { label: '👤 My Profile', href: '/account' },
                        { label: '📦 My Orders', href: '/my-orders' },
                        { label: '♡  Wishlist', href: '/wishlist' },
                        { label: '🔔 Notifications', href: '/notifications' },
                        { label: '⚙️ Settings', href: '/account/settings' },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          custom={19 + i}
                          variants={sidebarItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Link
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                      <motion.div
                        custom={24}
                        variants={sidebarItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <button
                          onClick={logout}
                          className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors mt-1"
                        >
                          🚪 Sign Out
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      custom={19}
                      variants={sidebarItemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col gap-2 mt-1"
                    >
                      <Link
                        href="/login"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center justify-center h-10 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center justify-center h-10 rounded-xl border-2 border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-colors"
                      >
                        Create Account
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="px-5 py-3 border-t border-gray-100 bg-gray-50 shrink-0"
              >
                <div className="flex justify-center gap-4 text-xs text-gray-400">
                  {['🚀 Free Shipping', '🔒 Secure', '💬 24/7 Support'].map(
                    (t) => (
                      <span key={t} className="font-medium">
                        {t}
                      </span>
                    ),
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

//  <div className="navbar-end gap-2">
//       <img
//         height={40}
//         width={40}
//         src={sessionData?.user?.image || 'http://www.w3.org/2000/svg'}
//         className="h-10 w-10 rounded-full object-cover bg-green-800"
//         alt="User Avatar"
//       />
//       {sessionData?.user?.name ? (
//         <button onClick={logout} className="btn">
//           logout
//         </button>
//       ) : (
//         <Link href="/login" className="btn">
//           Login
//         </Link>
//       )}
//       <Link href="/my-card" className="btn">
//         Card
//       </Link>
//       <Link href="/my-orders" className="btn">
//         My orders
//       </Link>
//       <Link href="/dashboard" className="btn">
//         Dashboard
//       </Link>
//     </div>
