import React, { useState } from 'react';

interface StarRatingProps {
  rating: number; 
  onRatingChange?: (newRating: number) => void;
  maxRating?: number; 
  className?:string
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, maxRating = 5 }) => {
  const [hoverRating, setHoverRating] = useState(0); 
  const isClickable = !!onRatingChange; 

  const filledColor = 'text-black'; 
  const emptyColor = 'text-gray-300';   
  
  return (
    <div
      className="flex items-center" 
      onMouseLeave={() => isClickable && setHoverRating(0)}
    >
      {[...Array(maxRating)].map((_, index) => { 
        const starValue = index + 1; 

        const displayRating = hoverRating > 0 ? hoverRating : rating;

        const isFilled = starValue <= displayRating;

        return (
          <span
            key={index} 
            className={`
              w-4 h-4                 
              ${isFilled ? filledColor : emptyColor} 
              ${isClickable ? 'cursor-pointer' : ''}  
              transition-colors duration-200         
            `}

            onClick={() => isClickable && onRatingChange?.(starValue)}
            onMouseEnter={() => isClickable && setHoverRating(starValue)}
          >
            {/* 별 모양 SVG 아이콘 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.212a.75.75 0 011.424 0l2.508 5.076 5.518.801a.75.75 0 01.416 1.279l-3.99 3.879 1.003 5.45a.75.75 0 01-1.088.791L12 18.064l-4.994 2.625a.75.75 0 01-1.088-.79l1.003-5.45-3.99-3.88a.75.75 0 01.416-1.278l5.518-.801 2.508-5.076z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;