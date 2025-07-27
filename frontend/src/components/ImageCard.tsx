interface ImageCardProps {
  src: string;
  alt?: string;
  className?: string;
}

function ImageCard({
  src,
  alt = "image",
  className = ""
}: ImageCardProps) {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className={`w-72 rounded-lg shadow-md shadow-gray-200 ${className}`}
      />
    </div>
  );
}

export default ImageCard;
