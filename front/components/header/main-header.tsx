"use client";

import { useEffect, useState } from "react";
import LeftHeader from "./left-header";
import { RightHeader } from "./right-header";
import { loggedInUser } from "@/api/authAPICalls";
import { userInfo } from "os";

interface UserInfo {
  id: number;
  userId: string;
  username: string;
  role: string;
  imageUrl: string | undefined;
  userStatus: string;
}

export default function Header() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const userDetails = await loggedInUser();
      if (userDetails.message === 'user not logged in') {
        setUserInfo(null);
      } else {
        setUserInfo(userDetails);
      }
    }

    fetchUserData();
  }, []);

  return (
    <header className="w-full bg-white shadow-md">
      <HeaderContainer>
        <LeftHeader />
        <RightHeader userInfo={userInfo} setUserInfo={setUserInfo} />
      </HeaderContainer>
    </header>
  );
}

function HeaderContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex justify-between items-center p-4">
      {children}
    </div>
  )
}