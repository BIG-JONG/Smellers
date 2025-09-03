import React from 'react';
import ProductCard, { Product } from './ProductCard'; 
import Pagination from './Pagination'; 

interface PerfumeListSectionProps {
  title?: string;
  perfumes: Product[]; 
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  onPerfumeClick: (id: string) => void;
  centerWhenFew?: boolean;
}

const PerfumeListSection: React.FC<PerfumeListSectionProps> = ({
  title,
  perfumes,
  currentPage,
  totalPage,
  onPageChange,
  centerWhenFew = false,
  onPerfumeClick,
}) => {
  return (
    <div className="p-4 w-full ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className={`${
        centerWhenFew && perfumes.length < 4
          ? 'flex justify-center flex-wrap gap-6'
          : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center'
        }`}
      >
        {perfumes.map((perfume) => (
          <ProductCard
            key={perfume.id}
            product={perfume} 
            onClick={onPerfumeClick} 
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center mb-20">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default PerfumeListSection;
