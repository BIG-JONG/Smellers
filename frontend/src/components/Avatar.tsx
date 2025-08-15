import React from 'react';

interface AvatarProps {
  imageUrl?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, alt = 'https://placehold.co/40x40/cccccc/333333?text=User', size = 'md', className }) => {
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

const defaultBgTextClasses = 'bg-gray-200 text-gray-800 flex items-center justify-center';

return (
    <div
      className={`
        relative rounded-full overflow-hidden
        ${getSizeClasses(size)}
        ${imageUrl ? '' : defaultBgTextClasses} 
        ${className || ''}
      `}
    >
      {imageUrl ? ( 
        <img
          src={imageUrl}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover" 
        />
      ) : ( 
        <span className="font-bold uppercase">
          {alt ? alt.charAt(0) : ''} 
        </span>
      )}
    </div>
 );
};
export default Avatar;