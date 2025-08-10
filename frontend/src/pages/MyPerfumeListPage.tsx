import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfumeListSection from "@/components/PerfumeListSection";
import UserProfileSection from "@/components/UserProfileSection";
import { Product } from "@/components/ProductCard";
import axios from 'axios';

interface UserProfile {
  nickname: string;
  email: string;
  profileImg: string;
}

const MyPerfumeListPage: React.FC = () => {
  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState<Product[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user_id = sessionStorage.getItem("user_id");

    if (!token || !user_id) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        setUser({
          nickname: userData.nickname,
          email: userData.email,
          profileImg: userData.profileImg
            ? `http://localhost:4000/uploads/${userData.profileImg}`
            : 'https://placehold.co/300x300?text=No+Image',
          });
      } catch (err) {
        console.error("사용자 정보를 불러오는 데 실패했습니다:", err);
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      }
    };

    const fetchMyPerfumes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:4000/perfumes/public');
        const allPerfumes = response.data.data;

        const filtered = allPerfumes.filter(
          (perfume: any) => perfume.userId?.toString() === user_id && perfume.perfumeStatus !== 'N'
        );

        const fetchedPerfumes: Product[] = filtered.map((perfume: any) => ({
          id: perfume.perfumeId,
          name: perfume.perfumeName,
          imageUrl: perfume.images?.[0]?.url_path 
            ? `http://localhost:4000/uploads/${perfume.images[0].url_path}`
            : 'https://placehold.co/300x400/CCCCCC/333333?text=No+Image',
          price: perfume.price || 0,
          rating: perfume.point || 0,
          reviews: perfume.reviews?.length || 0,
          ingredients: perfume.notes?.map((note: any) => note.noteName) || []
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
    
    // 두 API를 모두 호출합니다.
    fetchUserInfo();
    fetchMyPerfumes();

  }, []);

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
      {user ? (
        <UserProfileSection
          profileImageUrl={user.profileImg}
          nickname={user.nickname}
          email={user.email}
          isCurrentUser={true}
          onEditProfile={handleEditProfileClick}
        />
      ) : (
        <div className="text-center mt-10">사용자 정보를 불러오는 중...</div>
      )}

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
