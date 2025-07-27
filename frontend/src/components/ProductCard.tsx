import React from 'react';
import StarRating from '@/components/StarRating';


interface Product {
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

function ProductCard({
  product, 
  onClick
}: ProductCardProps) {

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
      href={`/perfume/${product.id}`} 
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className="block w-60 rounded-lg border border-gray-200 shadow-sm shadow-gray-200 bg-white overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-md"
    >
      <img
        alt={product.name}
        src={product.imageUrl}
        onError={handleImageError}
        className="w-full aspect-[3/4] object-cover rounded-t-lg"
      />

      <div className="p-3">
        <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl truncate">{product.name}</h3> {/* product.name 사용 */}
        <h5 className="mt-4 text-lg font-medium text-gray-800 sm:text-xl">₩ {product.price.toLocaleString()}</h5> {/* ✨ product.price 사용 및 포맷팅 */}

        <p className="mt-2 max-w-sm text-gray-700 line-clamp-2">
          {product.ingredients?.join(' | ')}
        </p>

        <div className="flex items-center mt-3">
          <StarRating rating={product.rating} maxRating={5} /> {/* product.rating 사용 */}
          <span className="ml-2 text-sm text-gray-600">({product.reviews})</span> {/* product.reviews 사용 */}
        </div>
      </div>
    </a>
  );
}

export default ProductCard;