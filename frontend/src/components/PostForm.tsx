import React, { useState } from "react";
import InputField from "./InputField";
import Textarea from "./Textarea";

function PostForm() {
  const [img, setImg] = useState<string | undefined>(undefined);
  const [perfumeName, setPerfumeName] = useState("")
  const [perfumeBrand, setPerfumeBrand] = useState("")
  const [topNote, setTopNote] = useState("")
  const [middleNote, setMiddleNote] = useState("")
  const [baseNote, setBaseNote] = useState("")
  const [emotion, setEmotion] = useState("")
  const [tag, setTag] = useState("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
  {/* 상단: 이미지 + 향수명/브랜드 - 가로 정렬 */}
  <div className="flex w-full gap-6 items-start">
    
    {/* 왼쪽 이미지 영역 */}
    <div className="flex flex-col items-center gap-4 w-1/3">
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      
      {img && (
        <img
          src={img}
          alt="업로드 이미지 미리보기"
          className="w-64 h-auto rounded shadow-md"
        />
      )}

      <label
        htmlFor="image-upload"
        className="block w-full text-center cursor-pointer bg-gray-100 rounded py-2 hover:bg-gray-200"
      >
        이미지 업로드
      </label>
    </div>

    {/* 오른쪽 향수명 + 브랜드 */}
    <div className="flex flex-col gap-4 w-2/3">
      <InputField 
        className="w-full text-gray-600"
        label="향수 명"
        type="perfumeName"
        value={perfumeName}
        onChange={(e)=>setPerfumeName(e.target.value)}
        placeholder="향수 이름 입력"
      />
      <InputField 
        className="w-full text-gray-600"
        label="브랜드"
        type="perfumeBrand"
        value={perfumeBrand}
        onChange={(e)=>setPerfumeBrand(e.target.value)}
        placeholder="향수 브랜드 입력"
      />
    </div>
  </div>

  {/* 나머지 입력 필드: 중앙 정렬 유지 */}
  <div className="flex w-full gap-4 flex-wrap justify-start">
    <InputField 
      className="w-full text-gray-600"
      label="탑 노트"
      type="topNote"
      value={topNote}
      onChange={(e)=>setTopNote(e.target.value)}
      placeholder="탑 노트를 기록해 주세요."
    />
    <InputField 
      className="w-full text-gray-600"
      label="미들 노트"
      type="middleNote"
      value={middleNote}
      onChange={(e)=>setMiddleNote(e.target.value)}
      placeholder="미들 노트를 기록해 주세요."
    />
    <InputField 
      className="w-full text-gray-600"
      label="베이스 노트"
      type="baseNote"
      value={baseNote}
      onChange={(e)=>setBaseNote(e.target.value)}
      placeholder="베이스 노트를 기록해 주세요."
    />
    <Textarea 
      label="내용"
      className="w-full text-gray-600"
      placeholder="향수에 대해 기록해 주세요."
    />
    <InputField 
      className="w-full text-gray-600"
      label="태그"
      type="tag"
      value={tag}
      onChange={(e)=>setTag(e.target.value)}
      placeholder="태그 입력 란입니다."
    />
    <InputField 
      className="w-full text-gray-600"
      label="감정"
      type="emotion"
      value={emotion}
      onChange={(e)=>setEmotion(e.target.value)}
      placeholder="감정을 기록해 주세요."
    />
  </div>
</div>

  );
}

export default PostForm;
