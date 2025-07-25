import React from 'react';
import StarRating from '@/components/StarRating'; // StarRating (별점 표시용)

interface ProductCardProps {
  id: string;
  image: string;
  productName?: string;
  price?: string;
  ingredient?: string[];
  rating: number;
  reviews: number; 

  onClick?: (id: string) => void;
}

function ProductCard({
  image,
  productName = "퍼퓸 이브닝글로우",
  price = "130,000",
  ingredient = ["로즈", "라즈베리", "머스크"],
  id,
  rating, 
  reviews, 
  onClick
}: ProductCardProps) {

  // --- 포함된 부분: 이미지 로드 실패 시 대체 이미지 처리 ---
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/300x400/CCCCCC/333333?text=No+Image';
  };

  const handleClick = () => {
    if (onClick) {
      onClick(id); // 클릭 시 id 전달
    }
  };

  return (
    <a
      href={`/perfume/${id}`} // 나중에 실제 상세 페이지 경로로 연결
      onClick={(e) => {
        e.preventDefault(); // 기본 링크 이동 방지
        handleClick(); // prop으로 전달받은 onClick 함수 호출
      }}
      className="block w-60 rounded-lg border border-gray-200 shadow-sm shadow-gray-200 bg-white overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-md"
    >
      <img
        alt={productName} // alt 속성 추가 (접근성)
        src={image} // image prop을 사용
        onError={handleImageError} // --- 포함된 부분: 이미지 로드 에러 핸들러 ---
        className="w-full aspect-[3/4] object-cover rounded-t-lg"
      />

      <div className="p-3">
        <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl truncate">{productName}</h3>
        <h5 className="mt-4 text-lg font-medium text-gray-800 sm:text-xl">₩ {price}</h5>

        <p className="mt-2 max-w-sm text-gray-700 line-clamp-2">
          {ingredient?.join(' | ')}
        </p>

        {/* --- 포함된 부분: 별점 및 리뷰 수 표시 --- */}
        <div className="flex items-center mt-3">
          <StarRating rating={rating} maxRating={5} />
          <span className="ml-2 text-sm text-gray-600">({reviews})</span>
        </div>
      </div>
    </a>
  );
}

export default ProductCard;