import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import UserProfileSection from "@/components/UserProfileSection";
import PerfumeListSection from "@/components/PerfumeListSection";
import { Product } from "@/components/ProductCard";
import axios from 'axios';

const UserPerfumeListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ nickname: string; email: string; profileImg: string } | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token || !userId) {
      console.error(' 요청 불가: token 또는 userId가 존재하지 않음', { token, userId });
      return;
    }

    const fetchPublicPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/following/allPublicPost?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('응답 성공:', response.data);

        const { userInfo, perfumes } = response.data.data;

        const mappedPerfumes: Product[] = perfumes.map((perfume: any) => ({
          id: perfume.perfumeId,
          name: perfume.perfumeName,
          imageUrl: perfume.images?.[0]?.url_path
            ? `http://localhost:4000/uploads/${perfume.images[0].url_path}`
            : 'https://placehold.co/150x150?text=No+Image',
          price: perfume.price || 0,
          rating: perfume.point || 0,
          reviews: perfume.reviews?.length || 0,
          ingredients: perfume.notes?.map((note: any) => note.noteName) || []
        }));

        setUser({
          nickname: userInfo.nickname,
          email: userInfo.email,
          profileImg: userInfo.profileImg   
            ? `http://localhost:4000/uploads/${userInfo.profileImg}`
            : 'https://placehold.co/300x300?text=No+Image',
        });

        setPerfumes(mappedPerfumes);
      } catch (err) {
        console.error("공개 글 조회 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicPosts();
  }, [userId]);

  const handlePerfumeClick = (id: string) => {
    navigate(`/perfumes/${id}`);
  };

  return (
    <div className="p-4 pt-[74px]">
      {user ? (
        <UserProfileSection
          profileImageUrl={user.profileImg}
          nickname={user.nickname}
          email={user.email}
          isCurrentUser={false}
          isFollowing={true}
        />
      ) : (
        <div className="text-center">유저 정보를 불러오는 중...</div>
      )}

      {loading ? (
        <div className="text-center mt-10">로딩 중...</div>
      ) : (
        <PerfumeListSection
          // title="전체 게시물"
          perfumes={perfumes}
          currentPage={1}
          totalPage={1}
          onPageChange={() => {}}
          onPerfumeClick={handlePerfumeClick}
        />
      )}
    </div>
  );
};

export default UserPerfumeListPage;
