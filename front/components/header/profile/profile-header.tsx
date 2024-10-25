import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import defaultImage from '@/app/defaultImage.jpg';
import { RiArrowDownSLine } from "react-icons/ri";
import { logoutAPI } from "@/api/authAPICalls";
import { useRouter } from "next/navigation";

interface UserInfo {
  id: number;
  userId: string;
  username: string;
  role: string;
  imageUrl: string;
  gender: string;
  createdDate: Date;
}

interface ProfileHeaderProps {
  userInfo?: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

export function ProfileHeader({ userInfo, setUserInfo }: ProfileHeaderProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // dropdown menu from profile
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => setIsOpen(false);

  const handleLogout = async () => {
    const logoutResult = await logoutAPI();
    if (logoutResult === 'success') {
      setIsOpen(false);
      if (setUserInfo) setUserInfo(null);
      router.push('/');
      router.refresh();
    }
  }

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
        <DropdownMenu>
          <HeaderProfileNavLink href="/my-blog" onClick={closeDropdown}>내 블로그</HeaderProfileNavLink>
          <HeaderProfileNavLink href="#" onClick={closeDropdown}>설정</HeaderProfileNavLink>
          <LogoutNavLink onClick={handleLogout}>로그아웃</LogoutNavLink>
        </DropdownMenu>
      )}
    </div>
  );
}

function DropdownMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
      {children}
    </div>
  )
}

function HeaderProfileNavLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

function LogoutNavLink({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <a
      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
      onClick={onClick}
    >
      {children}
    </a>
  )
}