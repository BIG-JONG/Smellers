//랜덤 향수 추천 컴포넌트

import React from 'react';
import ProductCard, { Product } from '@/components/ProductCard';

interface RandomPerfumeRecommendationSectionProps {
  title: string;
  perfume: Product | null;
  onPerfumeClick?: (perfumeId: string) => void;
}

const RandomPerfumeRecommendationSection: React.FC<RandomPerfumeRecommendationSectionProps> = ({
  title,
  perfume,
  onPerfumeClick,
}) => {
  const handleProductClick = () => {
    if (onPerfumeClick && perfume) {
      onPerfumeClick(perfume.id);
    }
  };

  return (
    <section className="w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{title}</h2>

      {!perfume ? (
        <p className="text-gray-600 text-center py-8">표시할 추천 향수 기록이 없습니다.</p>
      ) : (
        <div className="flex justify-center py-4">
          <ProductCard 
            product={perfume}
            onClick={handleProductClick}
          />
        </div>
      )}
    </section>
  );
};

export default RandomPerfumeRecommendationSection;