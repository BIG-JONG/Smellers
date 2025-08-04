import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from "@/components/Pagination";
import PerfumeListSection from "@/components/PerfumeListSection";
import { Product } from "@/components/ProductCard";
import axios from 'axios';

const PerfumeListPage:React.FC=()=>{
  const navigate = useNavigate(); // useNavigate 훅
  const [perfumes, setPerfumes] = useState<Product[]>([]);

  //상세 페이지로 이동
  const handlePerfumeClick = (id: string) => {
    navigate(`/perfumes/${id}`); // /perfumes/:id 경로로 이동
  };

  useEffect(()=>{
    const fetchPerfumes = async()=>{
      try{
        const res = await axios.get('http://localhost:4000/perfumes/public')

        const mappedPerfumes = res.data.data.map((item:any)=>({
          id:item.perfumeId.toString(),
          name:item.perfumeName,
          imageUrl: item.images?.[0]?.url || '', 
          price: item.price || 0, 
          ingredients: item.notes?.map((note: any) => note.noteName) || [],
          rating: Number(item.point),
          reviews: item.reviews?.length || 0,
        }));
        setPerfumes(mappedPerfumes)
        console.log(res.data.data);
      }catch(err){
        console.error("향수 목록 불러오기에 실패", err)
      }
    }
    fetchPerfumes();
  },[])


  

  return(
    <div className="pt-[20px]">
      <PerfumeListSection
        title="전체 게시물"
        perfumes={perfumes}
        currentPage={1}
        totalPage={1}
        onPageChange={() => {}}
        onPerfumeClick={handlePerfumeClick} 
      />
      {/* <div className="mt-8 flex justify-center">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={onPageChange} />
      </div> */}
    </div>
  )
}

export default PerfumeListPage;
