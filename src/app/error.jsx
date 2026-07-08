'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>

      <p className="mt-2 text-gray-500">{error.message}</p>

      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-secondary text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
