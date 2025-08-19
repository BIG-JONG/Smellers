import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import UserProfileSection from "@/components/UserProfileSection";
import PerfumeListSection from "@/components/PerfumeListSection";
import { Product } from "@/components/ProductCard";
import axios from 'axios';
import Alert from '@/components/Alert';
import Layout from '@/components/Layout';

interface RawUserData {
  nickname: string;
  email: string;
  profileImg: string | null;
}

interface RawPostData {
  perfumeId: number;
  perfumeName: string;
  price: number;
  point: number;
  reviews: any[];
  notes: any[];
  images: { url_path: string }[];
  perfumeStatus: string;
  createdAt: string;
}
const itemPerPage = 20;

const UserPerfumeListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const targetUserId = searchParams.get('userId');

  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<RawUserData | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isFollowActionLoading, setIsFollowActionLoading] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");
  const [alertMessage, setAlertMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [allPerfumes, setAllPerfumes] = useState<Product[]>([]);

  const fetchUserData = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('token');
      const currentUserIdString = sessionStorage.getItem('user_id');

      if (!token || !targetUserId || !currentUserIdString) {
        console.error('요청 불가: token, targetUserId 또는 currentUserId가 존재하지 않음', 
          { token, targetUserId, currentUserIdString });
        setLoading(false);
        return;
      }
      const currentUserId = JSON.parse(currentUserIdString);
      setIsCurrentUser(currentUserId === parseInt(targetUserId, 10));

      const response = await axios.get(`http://localhost:4000/following/allPublicPost?userId=${targetUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // console.log('응답 성공:', response.data);

      const { userInfo, perfumes: serverPerfumes } = response.data.data;
      // console.log('API에서 받은 isFollowing 값:', initialIsFollowing);

      //팔로우 여부 확인
      let initialIsFollowing = false;
      if(currentUserId !== parseInt(targetUserId, 10)){
        const followCheckResponse = await axios.get(`http://localhost:4000/following/check/${targetUserId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        initialIsFollowing = followCheckResponse.data.isFollowing;
      }

      const activePerfumes = serverPerfumes.filter((perfume: RawPostData) => perfume.perfumeStatus !== 'N');
      
       const sortedPerfumes = [...activePerfumes].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const mappedPerfumes: Product[] = sortedPerfumes.map((perfume: RawPostData) => ({
        id:  String(perfume.perfumeId), 
        name: perfume.perfumeName,
        imageUrl: perfume.images?.[0]?.url_path
          ? `http://localhost:4000/uploads/${perfume.images[0].url_path}`
          : 'https://placehold.co/150x150?text=No+Image',
        price: perfume.price || 0,
        rating: perfume.point || 0,
        reviews: perfume.reviews?.length || 0,
        ingredients: perfume.notes?.map((note: any) => note.noteName) || []
      }));

      const profileImageUrl = userInfo.profileImg
      ? `http://localhost:4000/uploads/${userInfo.profileImg}`
      : 'https://placehold.co/300x300?text=No+Image';
        
      setUser({
        nickname: userInfo.nickname,
        email: userInfo.email,
        profileImg: profileImageUrl 
      });

      setAllPerfumes(mappedPerfumes);
      setTotalPage(Math.ceil(mappedPerfumes.length / itemPerPage));


      setPerfumes(mappedPerfumes);
      if (typeof initialIsFollowing !== 'undefined') {
        setIsFollowing(initialIsFollowing);
      }
    } catch (err) {
      console.error("데이터를 가져오지 못했습니다.", err);
      setIsFollowing(false);
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  useEffect(() => {
    if (targetUserId) {
      fetchUserData();
    }
  }, [fetchUserData, targetUserId]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    setPerfumes(allPerfumes.slice(startIndex, endIndex));
  }, [currentPage, allPerfumes]);


  const handleFollowToggle = useCallback(async (isCurrentlyFollowing: boolean) => {
    setIsFollowActionLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      if (!token || !targetUserId) {
        throw new Error('로그인이 필요하거나 대상 유저 ID가 없습니다.');
      }
      const targetIdNum = parseInt(targetUserId, 10);

      if (isCurrentlyFollowing) {
        // await axios.delete(`http://localhost:4000/following/unfollow/${targetIdNum}`, {
        await axios.get(`http://localhost:4000/following/unfollow/${targetIdNum}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { userId: targetIdNum }
        });
        setAlertType("success");
        setAlertMessage("언팔로우가 되엇습니다.")
      } else {
        // await axios.post(`http://localhost:4000/following/userRegister/${targetIdNum}`, {
        await axios.get(`http://localhost:4000/following/userRegister/${targetIdNum}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlertType("success");
        setAlertMessage("팔로우 되었습니다.");
      }

      setIsFollowing(!isCurrentlyFollowing);
      setShowAlert(true);
      setTimeout(() => {
          setShowAlert(false); 
      }, 2000);

      setIsFollowing(!isCurrentlyFollowing);
    } catch (error) {
      // console.error('팔로우/언팔로우 실패:', error);
      setAlertType("error");
      setAlertMessage("작업에 실패했습니다. 다시 시도해주세요.");
      setShowAlert(true);
      setTimeout(() => {
          setShowAlert(false);
      }, 3000);
    } finally {
      setIsFollowActionLoading(false);
    }
  }, [targetUserId]);

  const handlePerfumeClick = (id: string) => {
    navigate(`/perfumes/${id}`);
  };

  return (
    <Layout>
      <div className="p-4 pt-[74px]">
      
        {user ? (
          <UserProfileSection
            profileImageUrl={user.profileImg || 'https://placehold.co/300x300?text=No+Image'}
            nickname={user.nickname}
            email={user.email}
            isCurrentUser={isCurrentUser}
            isFollowing={isFollowing}
            isFollowActionLoading={isFollowActionLoading}
            onFollow={() => handleFollowToggle(false)}
            onUnfollow={() => handleFollowToggle(true)}
          />
        ) : (
          <div className="text-center">유저 정보를 불러오는 중...</div>
        )}

        {showAlert && (
          <div className="mt-4">
              <Alert message={alertMessage} type={alertType} />
          </div>
        )}

        {loading ? (
          <div className="text-center mt-10">로딩 중...</div>
        ) : (
          <PerfumeListSection
            perfumes={perfumes}
            currentPage={1}
            totalPage={1}
            onPageChange={() => {}}
            onPerfumeClick={handlePerfumeClick}
          />
        )}
      </div>
    </Layout>
  );
};

export default UserPerfumeListPage;