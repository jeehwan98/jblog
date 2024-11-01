interface UserProps {
  id: number;
  userId: string;
  username: string;
  role: string;
  imageUrl: string;
  gender: string;
  createdDate: Date;
}

interface User {
  users: UserProps | null
}

export default function ProfileSection({ users }: User) {

  const formatDate = (timestamp: Date) => {
    const year = timestamp.getFullYear();
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
    const day = String(timestamp.getDate()).padStart(2, '0');
    return `${year}:${month}:${day}`;
  };

  const formattedDate = users?.createdDate ? formatDate(users.createdDate) : "N/A";
  return (
    <div>
      <h1>{users?.username} Profile</h1>
      <p>User ID: {users?.userId}</p>
      <p>Role: {users?.role}</p>
      <p>Created on: {formattedDate}</p>
    </div>
  )
}