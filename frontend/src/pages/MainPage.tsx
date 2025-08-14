import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentPost from "@/components/CurrentPost";
import MainInfo from "@/components/MainInfo";
import RecommendPerfume from "@/components/RecommendPerfume";
import ProductCard from '@/components/ProductCard';

interface Post {
  perfumeId: number;
  perfumeName: string;
  brandName: string;
  images: { url_path: string }[];
  ingredients: string[]; 
  createdAt: string;
  perfumeStatus:string;
  price: number; 
  rating: number;
}

const MainPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [randomPost, setRandomPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/perfumes/public');
        const fetchedPosts: Post[] = response.data.data.map((item: any) => ({
          perfumeId: item.perfumeId, 
          perfumeName: item.perfumeName,
          brandName: item.brandName, 
          images: item.images,
          ingredients: item.notes?.map((note: any) => note.noteName) || [],
          content: item.content,
          createdAt: item.createdAt,
          perfumeStatus: item.perfumeStatus,
          price: item.price || 0,
          rating: Number(item.point), 
        }));

        const activePosts = fetchedPosts.filter(post => post.perfumeStatus !== 'N');
        
        if (activePosts.length > 0) {
          const sortedPosts = [...activePosts].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setLatestPosts(sortedPosts.slice(0, 5));

          const randomIndex = Math.floor(Math.random() * activePosts.length);
          setRandomPost(activePosts[randomIndex]);

          setAllPosts(activePosts);
        } else {
          setLatestPosts([]);
          setRandomPost(null);
        }
      } catch (err) {
        setError("게시물을 불러오는 데 실패했습니다. 서버 상태를 확인해주세요.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-40 text-lg text-gray-600">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center mt-40 text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="mt-35">
      <MainInfo />
      {randomPost && (
        <a 
          href="https://nonfiction.com/product/detail.html?product_no=640&cate_no=151&display_group=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RecommendPerfume
            post={{
              perfumeId: randomPost.perfumeId,
              perfumeName: randomPost.perfumeName,
              brandName: randomPost.brandName,
              images: randomPost.images,
              ingredients: randomPost.ingredients,
              createdAt: randomPost.createdAt,
            }}
          />
        </a>
      )}
      
      {/* 아래 5개: 가장 최신 게시글 5개를 깔끔하게 일렬 정렬 */}
      <div className="container mx-auto px-4 mt-20">
        {/* <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">최신 게시글</h2> */}
        {latestPosts.length > 0 ? (
          <div className="flex justify-center md:justify-between gap-4 flex-wrap md:flex-nowrap">
            {latestPosts
              .filter(post => post.perfumeStatus !== 'N')
              .map((post) => (
          <div key={post.perfumeId} className="w-full sm:w-1/2 md:w-1/5">
                <ProductCard // ⭐️ CurrentPost 대신 ProductCard를 사용합니다.
                  product={{
                    id: String(post.perfumeId),
                    imageUrl: post.images?.[0]?.url_path
                      ? `http://localhost:4000/uploads/${post.images[0].url_path}`
                      : 'https://placehold.co/300x400/CCCCCC/333333?text=No+Image',
                    name: post.perfumeName,
                    ingredients: post.ingredients,
                    price: post.price,
                    rating: post.rating, 
                  }}
                  onClick={() => window.location.href = `/perfumes/${post.perfumeId}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg font-medium">게시물이 없습니다.</div>
        )}
      </div>
      <div className="mt-80"/>
    </div>
  );
};

export default MainPage;