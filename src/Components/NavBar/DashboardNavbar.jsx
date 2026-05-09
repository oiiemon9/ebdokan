'use client';

export default function DashboardNavbar({ onToggleSidebar }) {
  return (
    <header className="w-full bg-base-100 border-b border-base-300 shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden btn btn-ghost btn-square"
          >
            <svg
              className="w-5 h-5"
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
          </button>
          <div className="h-16 w-16 flex items-center justify-center lg:hidden">
            <img
              src="/EbDokanLogo.png"
              alt="EB Dokan Logo"
              className="relative h-12 w-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn btn-ghost btn-square hidden sm:inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 5.5A2.5 2.5 0 014.5 3h11A2.5 2.5 0 0118 5.5v9a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 14.5v-9zM4.5 4A1.5 1.5 0 003 5.5V6h14v-.5A1.5 1.5 0 0016.5 4h-12z" />
            </svg>
          </button>
          <div className="avatar placeholder">
            <div className="ring ring-primary ring-offset-base-100 ring-offset-2 w-10 rounded-full bg-primary text-base-100">
              <span>ED</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
