'use client';
import { clearUser } from '@/store/userSlice';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function NavBar() {
  const { data: sessionData, status } = useSession();
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(clearUser());
    await signOut({
      callbackUrl: '/',
    });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100 w-40 z-1">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <img
          height={40}
          width={40}
          src={sessionData?.user?.image || 'http://www.w3.org/2000/svg'}
          className="h-10 w-10 rounded-full object-cover bg-green-800"
          alt="User Avatar"
        />
        {sessionData?.user?.name ? (
          <button onClick={logout} className="btn">
            logout
          </button>
        ) : (
          <Link href="/login" className="btn">
            Login
          </Link>
        )}
        <Link href="/my-card" className="btn">
          Card
        </Link>
        <Link href="/dashboard" className="btn">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
