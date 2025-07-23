import Link from "next/link";
import React from "react";

function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-600">Page Not Found</p>
      <p className="mt-2 text-gray-500">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default ErrorPage;
