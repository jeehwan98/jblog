import Link from "next/link";
import React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full py-3 text-white bg-blue-600 rounded-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {pending ? `${name}중...` : `${name}`}
    </button>
  )
}

export function LoginButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      // className="inline-block px-2 py-1 text-center text-white bg-black rounded-lg font-bold hover:text-gray-200 hover:bg-gray-900"
      className="inline-block px-4 py-2 text-center text-black bg-white rounded-lg font-bold hover:text-white hover:bg-black transition-colors duration-300 ease-in-out"
    >
      {children}
    </Link>
  );
}