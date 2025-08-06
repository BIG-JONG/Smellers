import React from 'react';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import FollowButton from '@/components/FollowButton';

interface UserProfileSectionProps {
  profileImageUrl: string;
  nickname: string;
  email: string;
  isCurrentUser: boolean;
  onEditProfile?: () => void;

  onFollow?: () => void;
  onUnfollow?: () => void;
  isFollowing?: boolean;
  isFollowActionLoading?: boolean;
  onProfileClick?: () => void;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  profileImageUrl,
  nickname = "test",
  email,
  isCurrentUser,
  onEditProfile,
  onFollow,
  onUnfollow,
  isFollowing,
  isFollowActionLoading,
  onProfileClick,
}) => {
  return (
    <section
      className="inline-flex flex-col items-center p-8 bg-white rounded-lg cursor-pointer"
      onClick={onProfileClick}
    >
      <div className="mb-4">
        <Avatar src={profileImageUrl} alt={`${nickname} 프로필`} size="xl" />
      </div>

      <div className="text-center">
        <h2 className="text-md font-bold text-gray-600 mb-2">{nickname}</h2>
        <p className="text-gray-600 text-lg mb-4">{email}</p>

        <div className="mt-4" onClick={e => e.stopPropagation()}>
          {isCurrentUser ? (
            <Button onClick={onEditProfile}>
              프로필 수정
            </Button>
          ) : (
            isFollowing !== undefined && (
              <FollowButton
                isFollowing={isFollowing}
                onClick={isFollowing ? onUnfollow : onFollow}
                disabled={isFollowActionLoading}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfileSection;
