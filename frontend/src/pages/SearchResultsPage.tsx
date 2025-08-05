import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PerfumeListSection from '@/components/PerfumeListSection';
import { Product } from '@/components/ProductCard';

const SearchResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [perfumes, setPerfumes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perfumesPerPage = 12;

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        setPerfumes([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      setPerfumes([]);
      
      try {
        console.log(`[프론트엔드] 백엔드로 POST 요청 전송: { perfumeName: "${query}" }`);
        const response = await axios.post(
          `http://localhost:4000/perfumes/search`,
          { perfumeName: query } 
        );
        
        console.log(`[프론트엔드] 백엔드에서 받은 원시 데이터:`, response.data);

        if (response.data && Array.isArray(response.data.data)) {
          const mappedPerfumes: Product[] = response.data.data.map((item: any) => ({
            id: item.perfumeId.toString(),
            name: item.perfumeName,
            brand: item.brand,
            imageUrl: item.images?.[0]?.url_path || '',
            price: item.price || 0,
            rating: Number(item.point),
            reviews: item.reviews?.length || 0,
            ingredients: item.notes?.map((note: any) => note.noteName) || [],
          }));
          
          console.log(`[프론트엔드] 매핑된 검색 결과 (${mappedPerfumes.length} 개):`, mappedPerfumes);
          setPerfumes(mappedPerfumes);
        } else {
          console.error("[프론트엔드] 백엔드에서 받은 데이터 형식이 올바르지 않습니다.", response.data);
          setError("검색 결과 데이터 형식이 올바르지 않습니다.");
          setPerfumes([]);
        }

        setCurrentPage(1);
      } catch (err) {
        console.error("검색 결과를 가져오는 데 실패했습니다:", err);
        setError("검색 결과를 가져오는 데 실패했습니다. 백엔드 서버 및 API 로직을 확인해주세요.");
        setPerfumes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handlePerfumeClick = (id: string) => {
    navigate(`/perfumes/${id}`);
  };

  const totalPage = Math.ceil(perfumes.length / perfumesPerPage);

  const currentPerfumes = perfumes.slice(
    (currentPage - 1) * perfumesPerPage,
    currentPage * perfumesPerPage
  );

  if (loading) {
    return <div className="text-center p-8 text-lg font-medium text-gray-700">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-lg font-medium text-red-500">{error}</div>;
  }
  
  return (
    <div className="pt-[20px] p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">"{query}"에 대한 검색 결과</h1>
      
      {currentPerfumes.length > 0 ? (
        <>
          <PerfumeListSection
            title=""
            perfumes={currentPerfumes}
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={setCurrentPage}
            onPerfumeClick={handlePerfumeClick} 
          />
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10 text-lg font-medium">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;