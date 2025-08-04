import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfumeListSection from "@/components/PerfumeListSection";
import UserProfileSection from "@/components/UserProfileSection";
import { Product } from "@/components/ProductCard";
import axios from 'axios';

const MyPerfumeListPage: React.FC = () => {
  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchMyPerfumes();
  }, []);

  const fetchMyPerfumes = async () => {
    setLoading(true);
    setError(null);
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:4000/perfumes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const fetchedPerfumes: Product[] = response.data.map((perfume: any) => ({
        id: perfume.perfumeId,
        name: perfume.perfumeName,
        imageUrl: perfume.images[0]?.url_path || 'https://placehold.co/300x400/CCCCCC/333333?text=No+Image',
        price: perfume.price,
        rating: perfume.point,
        reviews: 0,
        ingredients: perfume.notes.map((note: any) => note.noteName).join(' | ').split(' | ')
      }));

      setPerfumes(fetchedPerfumes);
      setTotalPage(1);
    } catch (err: any) {
      console.error("향수 리스트를 가져오는 데 실패했습니다:", err);
      setError("향수 목록을 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePerfumeClick = (id: string) => {
    navigate(`/perfumes/${id}`);
  };

  const handleEditProfileClick = () => {
    navigate('/mypage/info-update');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <UserProfileSection
        profileImageUrl="https://www.chanel.com/images/w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg"
        nickname="testUser"
        email="test@gmail.com"
        isCurrentUser={true}
        onEditProfile={handleEditProfileClick}
      />
      {loading ? (
        <div className="text-center mt-10">로딩 중...</div>
      ) : error ? (
        <div className="text-center mt-10 text-red-500">{error}</div>
      ) : perfumes.length === 0 ? (
        <div className="text-center mt-10">등록된 향수가 없습니다.</div>
      ) : (
        <PerfumeListSection
          title="내가 등록한 향수"
          perfumes={perfumes}
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={handlePageChange}
          onPerfumeClick={handlePerfumeClick}
        />
      )}
    </div>
  );
};

export default MyPerfumeListPage;