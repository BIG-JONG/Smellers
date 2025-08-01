import React from 'react';
import ProductCard from '@/components/ProductCard'; // ProductCard 컴포넌트 임포트
import Pagination from '@/components/Pagination';   // Pagination 컴포넌트 임포트
import Button from '@/components/Button';         // 수정/삭제 버튼을 위해 Button 컴포넌트 임포트

interface Perfume {
  id: string;
  imageUrl: string; // ProductCard의 'imageUrl'과 일치
  name: string;     // ProductCard의 'name'과 일치
  price: number;    // ProductCard의 'price'와 일치
  ingredients?: string[]; // ProductCard의 'ingredients'와 일치
  rating: number;   // ProductCard의 'rating'과 일치
  reviews?: number; // ProductCard의 'reviews'와 일치
}

interface UserPerfumeListSectionProps {
  title: string; // 섹션 제목 
  perfumes: Perfume[]; // 표시할 향수 목록 데이터
  currentPage: number; // 현재 페이지 번호
  totalPage: number; // 전체 페이지 수 (Pagination 컴포넌트의 totalPage prop과 일치)
  onPageChange: (page: number) => void; // 페이지 변경 시 호출될 함수
  onPerfumeClick?: (perfumeId: string) => void; // 향수 카드 클릭 시 호출될 함수 (옵션)
  onEditPerfume?: (perfumeId: string) => void; // 향수 수정 버튼 클릭 시 호출될 함수 (옵션)
  onDeletePerfume?: (perfumeId: string) => void; // 향수 삭제 버튼 클릭 시 호출될 함수 (옵션)
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
  // ProductCard 클릭 시 상위 컴포넌트로 이벤트 전달
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
            // 수정/삭제 버튼을 ProductCard 위에 오버레이하기 위한 relative 컨테이너
            <div key={perfume.id} className="relative group">
              <ProductCard
                product={perfume} // ProductCard는 'product' 객체 전체를 prop으로 받습니다.
                onClick={() => handleProductClick(perfume.id)}
              />
              {/* 수정/삭제 버튼 (마우스 오버 시 보이도록) */}
              {(onEditPerfume || onDeletePerfume) && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg space-x-2">
                  {onEditPerfume && (
                    <Button
                      onClick={() => onEditPerfume(perfume.id)}
                      variant="outline" // Button 컴포넌트의 variant prop 사용
                    >
                      수정
                    </Button>
                  )}
                  {onDeletePerfume && (
                    <Button
                      onClick={() => onDeletePerfume(perfume.id)}
                      variant="outline" // Button 컴포넌트의 variant prop 사용
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

      {/* 페이지네이션 (전체 페이지가 1보다 많을 때만 표시) */}
      {totalPage > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage} // Pagination 컴포넌트의 totalPage prop과 일치
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
};

export default UserPerfumeListSection;
