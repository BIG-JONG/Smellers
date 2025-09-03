import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PerfumeListSection from '@/components/PerfumeListSection';
import { Product } from '@/components/ProductCard';
import Layout from '@/components/Layout';

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
        const response = await axios.post(
          `http://localhost:4000/perfumes/search`,
          { perfumeName: query } 
        );
        
        if (response.data && Array.isArray(response.data.data)) {
          const mappedPerfumes: Product[] = response.data.data.map((item: any) => ({
            id: item.perfumeId.toString(),
            name: item.perfumeName,
            brand: item.brand,
            imageUrl: item.images?.[0]?.url_path
              ? `http://localhost:4000/uploads/${item.images[0].url_path}`
              : '',
            price: item.price || 0,
            rating: Number(item.point),
            reviews: item.reviews?.length || 0,
            ingredients: item.notes?.map((note: any) => note.noteName) || [],
          }));

          setPerfumes(mappedPerfumes);
        } else {
          setError("검색 결과 데이터 형식이 올바르지 않음.");
          setPerfumes([]);
        }

        setCurrentPage(1);
      } catch (err) {
        setError("검색 결과를 가져오는 데 실패 백 로직을 확인.");
        setPerfumes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handlePerfumeClick = (id: string) => {
    navigate(`/perfumes/public/${id}`);
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
    <Layout>
    <div className="pt-[20px] p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">"{query}"에 대한 검색 결과</h1>
      
      {currentPerfumes.length > 0 ? (
        <div className={`w-full ${
          currentPerfumes.length < 4
            ? "flex justify-center"
            : ""
        }`}>
          <PerfumeListSection
            title=""
            perfumes={currentPerfumes}
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={setCurrentPage}
            onPerfumeClick={handlePerfumeClick} 
            centerWhenFew
          />
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10 text-lg font-medium">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
    </Layout>
  );
};

export default SearchResultsPage;