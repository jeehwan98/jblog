import Link from "next/link";
import React from "react";

export default function LeftHeader() {
  return (
    <div className="flex items-center">
      <HeaderLogo />
      <HeaderNavBar />
    </div>
  );
}

function HeaderLogo() {
  return (
    <div className="mr-6 text-xl text-black hover:cursor-pointer">JBlog</div>
  );
}

function HeaderNavBar() {
  return (
    <nav className="hidden md:flex space-x-6">
      <HeaderNavLink href="/">홈</HeaderNavLink>
      <HeaderNavLink href="/post">작성</HeaderNavLink>
      <HeaderNavLink href="/">포럼</HeaderNavLink>
    </nav>
  )
}

function HeaderNavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-lg text-gray-700 hover:text-red-500"
    >
      {children}
    </Link>
  )
}