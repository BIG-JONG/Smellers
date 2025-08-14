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
  onClick?: (id: string) => void;
}
  const ProductCard:React.FC<ProductCardProps>=({product, onClick})=>{
     const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/300x400/CCCCCC/333333?text=No+Image';
      };

      const handleClick = () => {
        if (onClick) {
          onClick(product.id);
        }
      };

    return (
      <a
        href={`/perfumes/${product.id}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
        
        // className="group relative block w-100  border border-gray-100  overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-md"
        className="group relative block w-100 overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-md"
      >
        <div className="relative h-[350px] sm:h-[450px]">
          {/* 호버 투명도 */}
          <img
            alt={product.name}
            src={product.imageUrl}
            onError={handleImageError}
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60"
          />

          {/* 호버 텍스트 */}
          <div className="absolute inset-0 flex flex-col items-start justify-end p-6 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <h3 className="text-xl font-medium text-white line-clamp-1">
              {product.name}
            </h3>
            <h5 className="mt-1.5 text-md font-bold text-white sm:text-md">
              ₩ {product.price.toLocaleString()}
            </h5>
            {product.ingredients && product.ingredients.length > 0 && (
              <p className="mt-1.5 text-xs text-pretty text-white line-clamp-2">
                {product.ingredients.join(' | ')}
              </p>
            )}
            <div className="flex items-center mt-2">
              <StarRating rating={product.rating} maxRating={5} className="w-2 h-2" />
            </div>
          </div>
        </div>
      </a>


      // <a
      //   href={`/perfumes/${product.id}`}
      //   onClick={(e) => {
      //     e.preventDefault(); 
      //     handleClick(); // 클릭 시 라우팅 함수 실행
      //   }}
      //   className="block w-60 rounded-md border border-gray-100 shadow-lg shadow-gray-100 bg-white overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-md"
      // >
      //   <img
      //     alt={product.name}
      //     src={product.imageUrl}
      //     onError={handleImageError}
      //     className="w-full aspect-[3/4] object-cover rounded-t-lg"
      //   />

      //   <div className="p-3">
      //     <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl truncate">{product.name}</h3>
      //     <h5 className="mt-4 text-md font-medium text-gray-800 sm:text-md">₩ {product.price.toLocaleString()}</h5>

      //     <p className="mt-2 max-w-sm text-gray-700 line-clamp-2">

      //       {product.ingredients?.join(' | ')}
      //     </p>

      //     <div className="flex items-center">
      //       <StarRating rating={product.rating} maxRating={5} className="w-2 h-2" />
      //       {/* <span className="ml-2 text-sm text-gray-600">({product.reviews})</span> */}
      //     </div>
      //   </div>
      // </a>
    )
}

export default ProductCard;
