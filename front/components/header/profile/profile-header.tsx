import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import defaultImage from '@/app/defaultImage.jpg';
import { RiArrowDownSLine } from "react-icons/ri";

export function ProfileHeader() {
  const [isOpen, setIsOpen] = useState(false); // dropdown menu from profile
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 hover:text-black transition-colors duration-300 ease-in-out group"
        onClick={toggleDropdown}
      >
        <Image
          src={defaultImage}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <RiArrowDownSLine className="h-6 w-6 text-gray-500 group-hover:text-black transition-colors duration-300 ease-in-out" />
      </button>

      {/* dropdown menu */}
      {isOpen && (
        <DropdownMenu />
      )}
    </div>
  );
}

function DropdownMenu() {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
      <HeaderProfileNavLink href="/my-blog">내 블로그</HeaderProfileNavLink>
      <HeaderProfileNavLink href="#">설정</HeaderProfileNavLink>
      <HeaderProfileNavLink href="#">로그아웃</HeaderProfileNavLink>
    </div>
  )
}

function HeaderProfileNavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
      {children}
    </Link>
  )
}