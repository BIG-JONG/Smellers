import React from 'react';
import Avatar from '@/components/Avatar'; // 아바타 컴포넌트 임포트
import Button from '@/components/Button'; // 버튼 컴포넌트 임포트 
import FollowButton from '@/components/FollowButton'; // FollowButton 컴포넌트 임포트

interface UserProfileSectionProps {
  profileImageUrl: string; // 사용자 프로필 이미지 URL
  nickname: string;        // 사용자 닉네임
  email: string;           // 사용자 이메일
  isCurrentUser: boolean;  // 현재 로그인한 사용자의 프로필인지 여부 (수정 버튼 표시 여부 결정)
  onEditProfile?: () => void; // 프로필 수정 버튼 클릭 시 호출될 함수 (옵션)

  // 팔로우 기능 관련 prop 추가
  onFollow?: () => void;     // 팔로우 버튼 클릭 시 호출될 함수
  onUnfollow?: () => void;   // 언팔로우 버튼 클릭 시 호출될 함수
  isFollowing?: boolean;     // 현재 프로필의 사용자를 팔로우 중인지 여부
  isFollowActionLoading?: boolean; // 팔로우/언팔로우 액션이 진행 중인지 (버튼 비활성화용)
  onProfileClick?: () => void;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  profileImageUrl,
  nickname="test",
  email,
  isCurrentUser,
  onEditProfile,
  // 팔로우 기능 관련 prop 구조 분해 할당
  onFollow,
  onUnfollow,
  isFollowing,
  isFollowActionLoading,
}) => {
  return (
    <section className="inline-flex flex-col items-center p-8 bg-white rounded-lg">
    {/* <section className="w-full max-w-4xl bg-white p-8 rounded-lg flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8"> */}
      {/* 프로필 이미지 */}
      <div className="mb-4">
      {/* <div className="flex-shrink-0"> */}
        <Avatar src={profileImageUrl} alt={`${nickname} 프로필`} size="xl" />
      </div>

      {/* 사용자 정보 */}
      <div className="text-center">
      {/* <div className="flex-grow text-center md:text-left"> */}
        <h2 className="text-md font-bold text-gray-600 mb-2">{nickname}</h2>
        <p className="text-gray-600 text-lg mb-4">{email}</p>

        {/* 프로필 수정 또는 팔로우/언팔로우 버튼 */}
        <div className="mt-4">
          {isCurrentUser ? (
            // 현재 로그인한 사용자일 경우 프로필 수정 버튼 표시
            <Button
              onClick={onEditProfile}
            >
              프로필 수정
            </Button>
          ) : (
            // 다른 사용자일 경우 FollowButton 컴포넌트 표시
            // isFollowing이 undefined가 아닐 때만 FollowButton을 렌더링 (로딩 상태 처리)
            isFollowing !== undefined && (
              <FollowButton
                isFollowing={isFollowing}
                onClick={isFollowing ? onUnfollow : onFollow} // 팔로우 여부에 따라 호출 함수 변경
                disabled={isFollowActionLoading} // 액션 진행 중일 때 비활성화
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfileSection;