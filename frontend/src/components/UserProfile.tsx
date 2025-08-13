import Avatar from "./Avatar"

interface UserProfileProps {
  className?: string;
  nickName?: string;
  profileImageUrl?: string;  
  onClick?: () => void;
}

function UserProfile({
  className = "",
  nickName = "user",
  profileImageUrl,
  onClick,
}: UserProfileProps) {
  return (
    <div
      className={`flex items-center gap-3 p-2 pl-8 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Avatar imageUrl={profileImageUrl}/>
      <span>{nickName}</span>
    </div>
  );
}

export default UserProfile;
