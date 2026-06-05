'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(false);

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthMeta = [
    null,
    { label: 'Weak', bar: 'bg-red-500', text: 'text-red-400' },
    { label: 'Fair', bar: 'bg-amber-400', text: 'text-amber-400' },
    { label: 'Good', bar: 'bg-blue-400', text: 'text-blue-400' },
    { label: 'Strong', bar: 'bg-emerald-400', text: 'text-emerald-400' },
  ][strength];

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('Please accept the terms to continue.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed.');
        return;
      }
      await signIn('credentials', {
        email: form.email,
        password: form.password,
        callbackUrl: '/',
      });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder-white/25 outline-none transition-all focus:border-sky-400/50 focus:bg-sky-400/[0.05] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.10)]';

  const EyeBtn = ({ show, toggle }) => (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
    >
      {show ? (
        <svg
          className="w-[15px] h-[15px]"
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
          className="w-[15px] h-[15px]"
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
  );

  return (
    <>
      {/* ── Social ── */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex items-center justify-center gap-2 h-11 rounded-xl bg-white/[0.05] border border-white/10 text-white/75 text-[13px] font-medium hover:bg-white/[0.09] hover:border-white/20 hover:-translate-y-px transition-all"
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
        </button>
        <button
          type="button"
          onClick={() => signIn('facebook', { callbackUrl: '/' })}
          className="flex items-center justify-center gap-2 h-11 rounded-xl bg-white/[0.05] border border-white/10 text-white/75 text-[13px] font-medium hover:bg-white/[0.09] hover:border-white/20 hover:-translate-y-px transition-all"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-white/25 text-[11px] font-medium tracking-widest uppercase">
          or with email
        </span>
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 mb-4">
          <svg
            className="w-4 h-4 text-red-400 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
            <path strokeLinecap="round" strokeWidth="1.8" d="M12 8v4m0 4h.01" />
          </svg>
          <p className="text-red-300 text-[13px]">{error}</p>
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full name */}
        <div>
          <label className="block text-[11px] font-medium tracking-[0.06em] uppercase text-white/40 mb-1.5">
            Full name
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg
                className="w-[15px] h-[15px]"
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
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Rafiq Islam"
              required
              autoComplete="name"
              className={inputBase}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] font-medium tracking-[0.06em] uppercase text-white/40 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg
                className="w-[15px] h-[15px]"
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
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className={inputBase}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[11px] font-medium tracking-[0.06em] uppercase text-white/40 mb-1.5">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg
                className="w-[15px] h-[15px]"
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
            </span>
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 8 characters"
              required
              autoComplete="new-password"
              className={`${inputBase} !pr-11`}
            />
            <EyeBtn show={showPass} toggle={() => setShowPass((s) => !s)} />
          </div>

          {/* Strength bar */}
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 h-[3px] rounded-full transition-all duration-300
                    ${i <= strength ? strengthMeta?.bar : 'bg-white/[0.08]'}`}
                  />
                ))}
              </div>
              <span className={`text-[11px] font-medium ${strengthMeta?.text}`}>
                {strengthMeta?.label}
              </span>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label className="block text-[11px] font-medium tracking-[0.06em] uppercase text-white/40 mb-1.5">
            Confirm password
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg
                className="w-[15px] h-[15px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </span>
            <input
              type={showConf ? 'text' : 'password'}
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
              autoComplete="new-password"
              className={`${inputBase} !pr-24`}
            />
            {/* Match badge */}
            {form.confirm && (
              <span
                className={`absolute right-10 top-1/2 -translate-y-1/2 text-[11px] font-medium
                ${form.password === form.confirm ? 'text-emerald-400' : 'text-red-400'}`}
              >
                {form.password === form.confirm ? '✓ Match' : '✗'}
              </span>
            )}
            <EyeBtn show={showConf} toggle={() => setShowConf((s) => !s)} />
          </div>
        </div>

        {/* Agree */}
        <div className="flex items-start gap-2.5 pt-0.5">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded accent-sky-400 cursor-pointer shrink-0"
          />
          <label
            htmlFor="agree"
            className="text-[12.5px] text-white/40 cursor-pointer leading-relaxed"
          >
            I agree to the{' '}
            <Link
              href="/terms"
              className="text-sky-400 underline underline-offset-2 hover:text-sky-300 transition-colors"
            >
              Terms
            </Link>{' '}
            &amp;{' '}
            <Link
              href="/privacy"
              className="text-sky-400 underline underline-offset-2 hover:text-sky-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 mt-1
            bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500
            shadow-[0_4px_24px_rgba(168,85,247,0.25)]
            hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(168,85,247,0.35)]
            active:translate-y-0
            disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0
            transition-all"
        >
          {loading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
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
              Creating account…
            </>
          ) : (
            <>
              Create my account
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
        </button>
      </form>

      <p className="text-center text-[11.5px] text-white/20 mt-5 leading-relaxed">
        🎁 New members get{' '}
        <span className="text-white/45 font-medium">10% off</span> their first
        order automatically.
      </p>
    </>
  );
}
