import React, { useState } from "react";
import InputField from "./InputField";
import Textarea from "./Textarea";
import Tag from "./Tag";
import MultiSelectDropdown from "./MultiSelectDropdown"
import Button from "./Button";

function PostForm() {
  const [img, setImg] = useState<string | undefined>(undefined);
  const [perfumeName, setPerfumeName] = useState("");
  const [perfumeBrand, setPerfumeBrand] = useState("");
  const [topNote, setTopNote] = useState("");
  const [middleNote, setMiddleNote] = useState("");
  const [baseNote, setBaseNote] = useState("");
  const [emotion, setEmotion] = useState("");

  const [tag, setTag] = useState(""); 

  const [selectedTop, setSelectedTop] = useState<string[]>([]);
  const [selectedMiddle, setSelectedMiddle] = useState<string[]>([]);
  const [selectedBase, setSelectedBase] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl);
    }
  };

  // 태그 입력 필드의 onChange 핸들러
  // 사용자가 입력하는 대로 `tag` 상태에 업데이트합니다.
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  //  `tag` 문자열을 배열로 분리하는 유틸리티 함수
  // 쉼표(,)를 기준으로 분리하고, 각 태그의 앞뒤 공백을 제거하며, 비어있는 태그는 제외합니다.
  const parseTags = (tagString: string): string[] => {
    return tagString
      .split(',') // 쉼표로 분리
      .map(t => t.trim()) // 각 태그의 앞뒤 공백 제거
      .filter(t => t.length > 0); // 비어있는 태그 제외
  };

  // 태그 삭제 핸들러 (선택 사항)
  // Tag 컴포넌트에서 클릭 이벤트 발생 시 호출.
  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = parseTags(tag); // 현재 태그 문자열을 배열로 파싱
    const updatedTags = currentTags.filter(t => t !== tagToRemove); // 삭제할 태그 제외
    setTag(updatedTags.join(', ')); // 업데이트된 배열을 다시 쉼표로 연결하여 `tag` 상태에 저장
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
            type="text" 
            value={perfumeName}
            onChange={(e) => setPerfumeName(e.target.value)}
            placeholder="향수 이름 입력"
          />
          <InputField
            className="w-full text-gray-600"
            label="브랜드"
            type="text" 
            value={perfumeBrand}
            onChange={(e) => setPerfumeBrand(e.target.value)}
            placeholder="향수 브랜드 입력"
          />
        </div>
      </div>

      {/* 나머지 입력 필드: 중앙 정렬 유지 */}
      <div className="flex w-full gap-4 flex-wrap justify-start">
          <div className="flex-1 w-full">
            <MultiSelectDropdown
              label="탑 노트"
              options={["라벤더", "머스크", "샌달우드"]}
              value={selectedTop}
              onChange={setSelectedTop}
              maxSelect={3}
              placeholder="선택"
            />
            <MultiSelectDropdown
              label="미들 노트"
              options={["라벤더", "머스크", "샌달우드"]}
              value={selectedMiddle}
              onChange={setSelectedMiddle}
              maxSelect={3}
              placeholder="선택"
            />
            <MultiSelectDropdown
              label="베이스 노트"
              options={["라벤더", "머스크", "샌달우드"]}
              value={selectedBase}
              onChange={setSelectedBase}
              maxSelect={3}
              placeholder="선택"
            />
          </div>
        <Textarea
          label="내용"
          className="w-full text-gray-600"
          placeholder="향수에 대해 기록해 주세요."
        />

        {/* 태그 입력 필드 (기존 `tag` 상태와 연결) */}
        <InputField
          className="w-full text-gray-600"
          label="태그"
          type="text" 
          value={tag}
          onChange={handleTagChange} // `tag` 상태를 직접 업데이트
          placeholder="쉼표(,)로 구분하여 태그를 입력해 주세요."
        />

        {/* 렌더링된 태그 목록 */}
        <div className="w-full flex flex-wrap gap-2 mt-2">
          {parseTags(tag).map((singleTag, index) => ( // `tag` 문자열을 파싱해서 렌더링
            <Tag
              key={singleTag + index} // 고유 key를 위해 태그 내용과 index 조합
              text={singleTag}
              colorClasses="bg-indigo-100 text-indigo-800"
              onClick={() => handleRemoveTag(singleTag)} // 클릭 시 삭제
            />
          ))}
        </div>

        <InputField
          className="w-full text-gray-600"
          label="감정"
          type="text"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          placeholder="감정을 기록해 주세요."
          />
        <Button className="mx-auto block"/>
      </div>
    </div>
  );
}

export default PostForm;