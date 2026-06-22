'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentFailed() {
  const searchParams = useSearchParams();
  const tran_id = searchParams?.get('tran_id');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="text-red-500 text-6xl mb-4">❌</div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h1>

        <p className="text-gray-600 mb-4">
          আপনার payment complete হয়নি। আবার চেষ্টা করুন।
        </p>

        {tran_id && (
          <p className="text-sm text-gray-500 mb-4">
            Transaction ID: <span className="font-semibold">{tran_id}</span>
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/checkout"
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
          >
            Try Again
          </Link>

          <Link href="/" className="text-gray-600 hover:underline text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
