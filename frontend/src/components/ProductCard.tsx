import React from 'react';
import StarRating from '@/components/StarRating';

export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  ingredients?: string[];
  rating: number;
  reviews?: number;
}

interface ProductCardProps {
  product: Product;
  onClick?: (id: string) => void; // 클릭 이벤트 핸들러 prop을 받습니다.
}

function ProductCard({
  product,
  onClick
}: ProductCardProps) {

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/300x400/CCCCCC/333333?text=No+Image';
  };

  const handleClick = () => {
    if (onClick) {
      onClick(product.id); // prop으로 받은 onClick 함수를 호출.
    }
  };

  return (
    <a
      href={`/perfumes/${product.id}`}
      onClick={(e) => {
        e.preventDefault(); // <a> 태그의 기본 동작(페이지 새로고침)을 막습니다.
        handleClick(); // ProductCardProps로 받은 onClick 함수를 호출.
      }}
      className="block w-60 rounded-md border border-gray-100 shadow-lg shadow-gray-100 bg-white overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-md"
    >
      <img
        alt={product.name}
        src={product.imageUrl}
        onError={handleImageError}
        className="w-full aspect-[3/4] object-cover rounded-t-lg"
      />

      <div className="p-3">
        <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl truncate">{product.name}</h3>
        <h5 className="mt-4 text-md font-medium text-gray-800 sm:text-md">₩ {product.price.toLocaleString()}</h5>

        <p className="mt-2 max-w-sm text-gray-700 line-clamp-2">
          {product.ingredients?.join(' | ')}
        </p>

        <div className="flex items-center">
          <StarRating rating={product.rating} maxRating={5} className="w-2 h-2"/>
          <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
        </div>
      </div>
    </a>
  );
}

export default ProductCard;
