import React from 'react';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';  
import Button from '@/components/Button';         

interface Perfume {
  id: string;
  imageUrl: string; 
  name: string;     
  price: number;    
  ingredients?: string[];
  rating: number;   
  reviews?: number; 
}

interface UserPerfumeListSectionProps {
  title: string;
  perfumes: Perfume[];
  currentPage: number; 
  totalPage: number; 
  onPageChange: (page: number) => void; 
  onPerfumeClick?: (perfumeId: string) => void; 
  onEditPerfume?: (perfumeId: string) => void; 
  onDeletePerfume?: (perfumeId: string) => void; 
}

const UserPerfumeListSection: React.FC<UserPerfumeListSectionProps> = ({
  title,
  perfumes,
  currentPage,
  totalPage,
  onPageChange,
  onPerfumeClick,
  onEditPerfume,
  onDeletePerfume,
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
        <p className="text-gray-600 text-center py-8">등록한 향수 기록이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {perfumes.map(perfume => (
            <div key={perfume.id} className="relative group">
              <ProductCard
                product={perfume} 
                onClick={() => handleProductClick(perfume.id)}
              />

              {(onEditPerfume || onDeletePerfume) && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg space-x-2">
                  {onEditPerfume && (
                    <Button
                      onClick={() => onEditPerfume(perfume.id)}
                      variant="outline" 
                    >
                      수정
                    </Button>
                  )}
                  {onDeletePerfume && (
                    <Button
                      onClick={() => onDeletePerfume(perfume.id)}
                      variant="outline"
                    >
                      삭제
                    </Button>
                  )}
                </div>
              )}
            </div>
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

export default UserPerfumeListSection;
