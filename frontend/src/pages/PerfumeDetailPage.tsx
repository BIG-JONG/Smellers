import React from 'react';
import PerfumeDetailSection from "@/components/PerfumeDetailSection";

const PerfumeDetailPage:React.FC=()=>{

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   setIsLoggedIn(!!token);
  // }, []);

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
    <div>
      <PerfumeDetailSection perfume={dummyPerfume} isLoggedIn={true}/>
    </div>
  )
}

export default PerfumeDetailPage;
