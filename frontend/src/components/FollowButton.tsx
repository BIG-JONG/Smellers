import React from 'react';
import Button from '@/components/Button'; // Button 컴포넌트 임포트

interface FollowButtonProps {
  isFollowing: boolean; // 현재 팔로우 중인지 여부
  onClick?: () => void; // 버튼 클릭 시 호출될 함수
  disabled?: boolean; // 버튼 비활성화 여부
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing, onClick, disabled }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={isFollowing ? "bg-gray-300 text-gray-800 hover:bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
};

export default FollowButton;