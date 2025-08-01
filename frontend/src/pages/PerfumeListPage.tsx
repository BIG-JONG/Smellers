import React from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from "@/components/Pagination";
import PerfumeListSection from "@/components/PerfumeListSection";
import { Product } from "@/components/ProductCard";

const PerfumeListPage:React.FC=()=>{
  const navigate = useNavigate(); // useNavigate 훅.

  // 향수 카드를 클릭했을 때 상세 페이지로 이동
  const handlePerfumeClick = (id: string) => {
    navigate(`/perfumes/${id}`); // /perfumes/:id 경로로 이동합니다.
  };

  const dummyPerfumes: Product[] = [
    {
      id: "1",
      name: "Chanel No. 5",
      imageUrl: "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg",
      price: 150000,
      rating: 4.5,
      reviews: 120,
      ingredients: ["Aldehydes", "Ylang-Ylang", "Neroli"]
    },
    {
      id: "2",
      name: "Dior Sauvage",
      imageUrl: "https://www.dior.com/couture/var/dior/sites/beauty/img/packshot-product/f/F077752000_F077752000_E01_GHC.jpg",
      price: 120000,
      rating: 4.0,
      reviews: 80,
      ingredients: ["Bergamot", "Ambroxan"]
    },
    {
      id: "3",
      name: "Gucci Bloom",
      imageUrl: "https://www.gucci.com/assets/category_image_square/Bloom_Eau_de_Parfum_for_Her.jpg",
      price: 130000,
      rating: 4.0,
      reviews: 95,
      ingredients: ["Jasmine", "Tuberose"]
    },
    {
      id: "4",
      name: "Creed Aventus",
      imageUrl: "https://www.creedfragrances.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/v/aventus_100ml.jpg",
      price: 300000,
      rating: 4.0,
      reviews: 150,
      ingredients: ["Pineapple", "Blackcurrant", "Musk"]
    },
  ];

  return(
    <div className="p-4 pt-[74px]">
      <PerfumeListSection
        title="전체 게시물"
        perfumes={dummyPerfumes}
        currentPage={1}
        totalPage={1}
        onPageChange={() => {}}
        onPerfumeClick={handlePerfumeClick} 
      />
      <Pagination/>
    </div>
  )
}

export default PerfumeListPage;
