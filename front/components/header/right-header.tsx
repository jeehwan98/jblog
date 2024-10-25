import React from "react";
import Notification from "./notification/notification";
import { ProfileHeader } from "./profile/profile-header";
import SearchBar from "./search-bar/search-bar";
import { LoginButton } from "@/ui/button/button-ui";

interface UserInfo {
  id: number;
  userId: string;
  username: string;
  role: string;
  imageUrl: string;
  gender: string;
  createdDate: Date;
}

interface RightHeaderProps {
  userInfo?: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

export function RightHeader({ userInfo, setUserInfo }: RightHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <SearchBar />
      <Notification />

      {userInfo ? (
        <ProfileContainer>
          <ProfileHeader userInfo={userInfo} setUserInfo={setUserInfo} />
        </ProfileContainer>
      ) : (
        <LoginButton href="/login">
          로그인
        </LoginButton>
      )}
    </div>
  )
}

function ProfileContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
    </div>
  )
}