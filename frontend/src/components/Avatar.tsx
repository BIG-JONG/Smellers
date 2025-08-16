import React from 'react';

interface AvatarProps {
  imageUrl?: string;
  userId? :string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl,alt='User', size = 'md', className }) => {
  const getSizeClasses = (avatarSize: string) => {
  switch (avatarSize) {
    case 'sm': 
      return 'w-8 h-8 text-sm';
    case 'lg':
      return 'w-16 h-16 text-xl'; 
    case 'xl': 
      return 'w-24 h-24 text-3xl'; 
    case 'md': 
    default:
      return 'w-12 h-12 text-lg'; 
  }
};

const hasImage = !!imageUrl; 

return (
    <div
      className={`
        relative rounded-full overflow-hidden
        ${getSizeClasses(size)}
        ${!hasImage ? 'bg-gray-200 text-gray-800 flex items-center justify-center' : ''} 
        ${className || ''}
      `}
    >
      {hasImage ? (
        <img
          src={imageUrl}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          // 이미지 로드 실패 시 텍스트로 대체
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const span = e.currentTarget.nextElementSibling as HTMLSpanElement;
            if (span) span.style.display = 'flex';
          }}
        />
      ) : null}
      
      <span 
        className="font-bold uppercase"
        style={{ display: hasImage ? 'none' : 'flex' }}
      >
        {alt ? alt.charAt(0) : ''}
      </span>
    </div>
  );
};
export default Avatar;