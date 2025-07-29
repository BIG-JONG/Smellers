import React, { SyntheticEvent } from 'react'; 

interface ImageCardProps {
  src: string;
  alt?: string;
  className?: string;
  onError?: (e: SyntheticEvent<HTMLImageElement, Event>) => void; //추가
}

function ImageCard({
  src,
  alt = "image",
  className = "",
  onError 
}: ImageCardProps) {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className={`w-72 rounded-lg shadow-md shadow-gray-200 ${className}`}
        onError={onError}
      />
    </div>
  );
}

export default ImageCard;
