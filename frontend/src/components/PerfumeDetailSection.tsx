import { useState } from "react";
import ImageCard from "./ImageCard";

function PerfumeDetailSection(){
  const [img, setImg] = useState("https://img.vogue.co.kr/vogue/2024/12/style_67618e13dd977-1050x1400.jpg")
  const [perfumeName, setPerfumeName] = useState("블랑 쉬폰 오 드 퍼퓸");
  const [perfumeBrand, setPerfumeBrand] = useState("딥 디크");
  const [price, setPrice] = useState(133000)
  const [topNote, setTopNote] = useState("베르가못");
  const [middleNote, setMiddleNote] = useState("화이트 머스크");
  const [baseNote, setBaseNote] = useState("자스민");
  const [emotion, setEmotion] = useState("감정태그");
  const [tag, setTag] = useState("태그"); 
  

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-start gap-24 p-12 max-w-4xl mx-auto ">
        <ImageCard src={img} alt={perfumeName}/>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">{perfumeName}</p>
          <p className="mt-6 text-xl font-bold text-gray-500 dark:text-gray-200">{perfumeBrand}</p>
          <p className="mt-1 text-md font-bold text-gray-500 dark:text-gray-200">\{price}</p>
          <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-200">{topNote}</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{middleNote}</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{baseNote}</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{emotion}</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{tag}</p>
        </div>
      </div>
    </div>
  )
}

export default PerfumeDetailSection