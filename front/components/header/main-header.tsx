"use client";

import { useEffect, useState } from "react";
import LeftHeader from "./left-header";
import { RightHeader } from "./right-header";
import { loggedInUserAPI } from "@/api/authAPICalls";
import { currentlyLoggedInUserURL } from "@/api/api-routes";

interface UserInfo {
  id: number;
  userId: string;
  username: string;
  role: string;
  imageUrl: string;
  gender: string;
  createdDate: Date;
}

export default function Header() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchedUserInfo = async () => {
      try {
        const user = await loggedInUserAPI();
        if (user.message === 'user not logged in') {
          setUserInfo(null);
        } else {
          setUserInfo(user);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchedUserInfo();
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