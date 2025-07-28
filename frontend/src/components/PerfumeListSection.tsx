import React from 'react';
import ProductCard, { Product } from '@/components/ProductCard';
import Pagination from '@/components/Pagination';

interface PerfumeListSectionProps {
  title: string;
  perfumes: Product[]; 
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  onPerfumeClick?: (perfumeId: string) => void;
}

const PerfumeListSection: React.FC<PerfumeListSectionProps> = ({
  title,
  perfumes,
  currentPage,
  totalPage,
  onPageChange,
  onPerfumeClick,
}) => {
  const handleProductClick = (perfumeId: string) => {
    if (onPerfumeClick) {
      onPerfumeClick(perfumeId);
    }
  };

  return (
    <section className="w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{title}</h2>

      {perfumes.length === 0 ? (
        <p className="text-gray-600 text-center py-8">표시할 향수 기록이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {perfumes.map(perfume => (
            <ProductCard
              key={perfume.id}
              product={perfume} // 
              onClick={() => handleProductClick(perfume.id)}
            />
          ))}
        </div>
      )}

      {totalPage > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
};

export default PerfumeListSection;