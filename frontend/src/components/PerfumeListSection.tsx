import React from 'react';
import ProductCard, { Product } from './ProductCard'; // Product 타입을 임포트합니다.
import Pagination from './Pagination'; // Pagination 컴포넌트 임포트 (있다고 가정)

interface PerfumeListSectionProps {
  title: string;
  perfumes: Product[]; // Product 배열을 받습니다.
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  onPerfumeClick: (id: string) => void; // 향수 클릭 핸들러 prop 추가
}

const PerfumeListSection: React.FC<PerfumeListSectionProps> = ({
  title,
  perfumes,
  currentPage,
  totalPage,
  onPageChange,
  onPerfumeClick, // prop 받기
}) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {perfumes.map((perfume) => (
          <ProductCard
            key={perfume.id}
            product={perfume} // perfume 객체 전체를 product prop으로 전달
            onClick={onPerfumeClick} // ProductCard에 클릭 핸들러 전달
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default PerfumeListSection;
