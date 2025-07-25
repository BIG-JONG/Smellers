// frontend/src/components/PerfumeListSection.tsx

import React from 'react';
import ProductCard from '@/components/ProductCard'; // ProductCard 컴포넌트 임포트
import Pagination from '@/components/Pagination';   // Pagination 컴포넌트 임포트

// ProductCard의 ProductCardProps와 정확히 일치하도록 Perfume 인터페이스를 정의합니다.
interface Perfume {
  id: string;
  image: string;
  productName?: string;
  price?: string;
  ingredient?: string[];
  rating: number;
  reviews: number; // <-- ProductCard의 reviews prop과 일치하도록 추가
}

interface PerfumeListSectionProps {
  title: string;
  perfumes: Perfume[];
  currentPage: number;
  totalPages: number; // 'totalPage' 대신 'totalPages'로 통일 (Pagination 컴포넌트와 일치)
  onPageChange: (page: number) => void;
  onPerfumeClick?: (perfumeId: string) => void;
}

const PerfumeListSection: React.FC<PerfumeListSectionProps> = ({
  title,
  perfumes,
  currentPage,
  totalPages, // 'totalPage' 대신 'totalPages'로 변경
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
              id={perfume.id}
              image={perfume.image}
              productName={perfume.productName}
              price={perfume.price}
              ingredient={perfume.ingredient}
              rating={perfume.rating}
              reviews={perfume.reviews} // <-- reviews prop 전달
              onClick={() => handleProductClick(perfume.id)}
            />
          ))}
        </div>
      )}

      {/* 페이지네이션 (전체 페이지가 1보다 많을 때만 표시) */}
      {totalPages > 1 && ( // 'totalPage' 대신 'totalPages'로 변경
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages} // 'totalPage' 대신 'totalPages'로 변경
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
};

export default PerfumeListSection;
