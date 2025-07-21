import React, { useState } from 'react';

//StarRating 타입 정의
interface StarRatingProps {
  rating: number; //  클릭 가능 모드에서는 사용자가 선택한 값.
  onRatingChange?: (newRating: number) => void; // 별점 변경 시 호출될 함수 (이 prop이 없으면 '읽기 전용')
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0); // 마우스 오버 시 임시 별점
  const isClickable = !!onRatingChange; // onRatingChange가 있으면 클릭 가능 모드

  // 별 색상 (Tailwind CSS)
  const filledColor = 'text-yellow-400'; // 채워진 별 색상 옐로우
  const emptyColor = 'text-gray-300';   // 비어있는 별 색상 그레이

  return (
    <div
      className="flex items-center" // 별들을 가로로 나열
      onMouseLeave={() => isClickable && setHoverRating(0)} // 마우스가 영역 벗어나면 호버 초기화
    >
      {[...Array(5)].map((_, index) => { // 5개의 별을 반복해서 렌더링 (만점 고정)
        const starValue = index + 1; // 1부터 5까지의 별 값

        // 보여줄 별점 (클릭 모드면 호버 별점, 아니면 실제 rating)
        const displayRating = isClickable ? hoverRating : rating;

        // 현재 별이 채워져야 하는지 (별 값이 표시 별점보다 작거나 같으면 채움)
        const isFilled = starValue <= displayRating;

        return (
          <span
            key={index} // React 리스트 렌더링을 위한 고유 키
            className={`
              w-6 h-6                 // 고정된 별 크기
              ${isFilled ? filledColor : emptyColor} // 별 색상 적용
              ${isClickable ? 'cursor-pointer' : ''}  // 클릭 가능하면 마우스 커서 변경
              transition-colors duration-200         // 색상 변경 시 부드러운 전환 효과
            `}
            // 클릭 가능 모드일 때만 이벤트 처리
            onClick={() => isClickable && onRatingChange?.(starValue)}
            onMouseEnter={() => isClickable && setHoverRating(starValue)}
          >
            {/* 별 모양 SVG 아이콘  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.212a.75.75 0 011.424 0l4.5 9A.75.75 0 0116.5 13.5h-9a.75.75 0 01-.712-1.288l4.5-9z"
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