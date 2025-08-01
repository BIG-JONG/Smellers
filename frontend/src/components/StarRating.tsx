import React, { useState } from 'react';

// StarRating 타입 정의
interface StarRatingProps {
  rating: number; // 현재 표시할 별점 (읽기 전용 모드) 또는 사용자가 선택한 값 (클릭 가능 모드)
  onRatingChange?: (newRating: number) => void; // 별점 변경 시 호출될 함수 (이 prop이 없으면 '읽기 전용')
  maxRating?: number; // 최대 별점 (기본값 5)
  className?:string
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, maxRating = 5 }) => {
  const [hoverRating, setHoverRating] = useState(0); // 마우스 오버 시 임시 별점
  const isClickable = !!onRatingChange; // onRatingChange가 있으면 클릭 가능 모드

  // 별 색상 (Tailwind CSS)
  const filledColor = 'text-black'; // 채워진 별 색상
  const emptyColor = 'text-gray-300';   // 비어있는 별 색상
  
  return (
    <div
      className="flex items-center" // 별들을 가로로 나열
      onMouseLeave={() => isClickable && setHoverRating(0)} // 마우스가 영역 벗어나면 호버 초기화
    >
      {[...Array(maxRating)].map((_, index) => { // maxRating 개수만큼 별을 반복해서 렌더링
        const starValue = index + 1; // 1부터 maxRating까지의 별 값

        // 보여줄 별점
        const displayRating = isClickable ? hoverRating : rating;

        // 현재 별이 채워져야 하는지 (별 값이 표시 별점보다 작거나 같으면 채움)
        const isFilled = starValue <= displayRating;

        return (
          <span
            key={index} // React 리스트 렌더링을 위한 고유 키
            className={`
              w-4 h-4                 // 고정된 별 크기
              ${isFilled ? filledColor : emptyColor} // 별 색상 적용
              ${isClickable ? 'cursor-pointer' : ''}  // 클릭 가능하면 마우스 커서 변경
              transition-colors duration-200         // 색상 변경 시 부드러운 전환 효과
            `}
            // 클릭 가능 모드일 때만 이벤트 처리
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