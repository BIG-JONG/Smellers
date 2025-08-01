import React from 'react';

//Avatar 타입 정의
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; //아바타 크기 (small, medium, large, extra-large)
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = 'User Avatar', size = 'md', className }) => {
  const getSizeClasses = (avatarSize: string) => {
  switch (avatarSize) {
    case 'sm': // 작은 크기
      return 'w-8 h-8 text-sm'; //글자 크기 작게
    case 'lg': // 큰 크기
      return 'w-16 h-16 text-xl'; //글자 크기 크게
    case 'xl': // 아주 큰 크기 (프로필 페이지 등)
      return 'w-24 h-24 text-3xl'; //글자 크기 아주 크게
    case 'md': // 중간 크기 (기본값)
    default:
      return 'w-12 h-12 text-lg'; // 글자 크기 보통
  }
};

const defaultBgTextClasses = 'bg-gray-200 text-gray-800 flex items-center justify-center';

return (
    <div
      className={`
        relative rounded-full overflow-hidden
        ${getSizeClasses(size)}
        ${src ? '' : defaultBgTextClasses} // 이미지가 없으면 기본 배경/텍스트 클래스 적용
        ${className || ''}
      `}
    >
      {src ? ( // src prop이 있으면 이미지를 보여줍니다.
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover" // 이미지가 아바타 영역을 꽉 채우도록 설정
        />
      ) : ( // src prop이 없으면 대체 텍스트나 이니셜을 보여줍니다.
        <span className="font-bold uppercase">
          {alt ? alt.charAt(0) : ''} {/* alt 텍스트의 첫 글자를 보여줍니다. (예: "User Avatar" -> "U") */}
        </span>
      )}
    </div>
 );
};
export default Avatar;