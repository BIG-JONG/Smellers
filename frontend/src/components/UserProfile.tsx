import Avatar from "./Avatar"

interface UserProfileProps {
  className?: string;
  nickName?: string;
  // 클릭 이벤트를 처리할 함수를 받는 onClick 속성을 추가합니다.
  onClick?: () => void;
}

function UserProfile({
  className = "",
  nickName = "user",
  onClick,
}: UserProfileProps) {
  return (
    // onClick 속성을 div에 연결하여 클릭 이벤트를 처리합니다.
    // 'cursor-pointer' 클래스를 추가해 클릭 가능하다는 것을 시각적으로 표시합니다.
    <div
      className={`flex items-center gap-3 p-2 pl-8 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Avatar/>
      <span>{nickName}</span>
    </div>
  );
}

export default UserProfile;
