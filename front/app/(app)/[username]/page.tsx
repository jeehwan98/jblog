"use client";

import { checkUserURL } from "@/api/api-routes";
import { loggedInUserAPI } from "@/api/authAPICalls";
import Body from "@/components/body";
import { useEffect, useState } from "react";

interface UsernameProps {
  params: {
    username: string
  }
}

interface UserInfo {
  id: number;
  userId: string;
  username: string;
  role: string;
  imageUrl: string;
  gender: string;
  createdDate: Date;
}

export default function ProfilePage({ params }: UsernameProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchedUserInfo = async () => {
      try {
        const response = await fetch(`${checkUserURL}/${params.username}`, {
          method: "GET",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' }
        });

        const responseData = await response.json();
        if (response.ok) {
          setUserInfo(responseData.message);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    console.log(userInfo);

    fetchedUserInfo();
  }, []);

  return (
    <Body>
      {userInfo?.role}
    </Body>
  )
}