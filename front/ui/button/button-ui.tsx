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
      className="inline-block px-6 py-3 text-center text-black bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out"
    >
      {children}
    </Link>
  );
}