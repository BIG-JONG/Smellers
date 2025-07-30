import React from 'react';
import PerfumeDetailSection from "@/components/PerfumeDetailSection";
// StarRating과 PerfumeAnalyticsChart는 PerfumeDetailSection 내부에 있으므로 여기서는 임포트할 필요 없습니다.

const PerfumeDetailPage:React.FC=()=>{
  // 실제 데이터는 API 호출 등을 통해 가져와야 하지만, 여기서는 더미 데이터를 사용합니다.
  const dummyPerfume = {
    id: "1",
    imageUrl: "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg",
    name: "Chanel No. 5",
    brand: "Chanel",
    price: 150000,
    topNotes: ["Aldehydes", "Ylang-Ylang", "Neroli"],
    middleNotes: ["Jasmine", "Rose"],
    baseNotes: ["Sandalwood", "Vetiver", "Vanilla"],
    emotionTags: ["Elegant", "Classic", "Warm", "Sophisticated"],
    customTags: ["Daily", "Office"],
    rating: 4.8,
    description: "A timeless, floral fragrance known for elegance and style."
  };

  return(
    // Layout의 pt-[74px]와 일관성을 위해 상단 패딩을 추가합니다.
    // 이 div가 페이지의 최상위 컨테이너 역할을 합니다.
    <div className="p-4 pt-[74px]">
      {/* PerfumeDetailSection 컴포넌트에 향수 데이터를 전달하여 렌더링합니다. */}
      {/* 이 컴포넌트 안에 이미 별점과 그래프가 포함되어 있습니다. */}
      <PerfumeDetailSection perfume={dummyPerfume} />
    </div>
  )
}

export default PerfumeDetailPage;
