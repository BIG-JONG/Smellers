import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import Textarea from "./Textarea";
import Tag from "./Tag";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Button from "./Button";
import { PerfumeDetailData } from './PerfumeDetailSection'; // PerfumeDetailData 타입 import

interface PostFormProps {
    perfumeToEdit?: PerfumeDetailData; // 수정할 향수 데이터 (선택 사항)
    onCancel: () => void; // 취소 버튼 클릭 시 실행될 함수
}

// PostForm 컴포넌트가 props를 받도록 수정
function PostForm({ perfumeToEdit, onCancel }: PostFormProps) {
    const [img, setImg] = useState<string | undefined>(undefined);
    const [perfumeName, setPerfumeName] = useState("");
    const [perfumeBrand, setPerfumeBrand] = useState("");
    const [perfumePrice, setPerfumePrice] = useState("");
    const [topNote, setTopNote] = useState("");
    const [middleNote, setMiddleNote] = useState("");
    const [baseNote, setBaseNote] = useState("");
    const [emotion, setEmotion] = useState("");
    const [description, setDescription] = useState(""); 

    const [tag, setTag] = useState(""); 
    const [selectedTop, setSelectedTop] = useState<string[]>([]);
    const [selectedMiddle, setSelectedMiddle] = useState<string[]>([]);
    const [selectedBase, setSelectedBase] = useState<string[]>([]);

    // perfumeToEdit 데이터가 있을 때 상태를 초기화
    useEffect(() => {
        if (perfumeToEdit) {
            setImg(perfumeToEdit.imageUrl);
            setPerfumeName(perfumeToEdit.name);
            setPerfumeBrand(perfumeToEdit.brand);
            setPerfumePrice(perfumeToEdit.price.toString()); 
            // 모든 노트들을 합쳐서 문자열로 변환
            setTopNote(perfumeToEdit.topNotes.join(", "));
            setMiddleNote(perfumeToEdit.middleNotes.join(", "));
            setBaseNote(perfumeToEdit.baseNotes.join(", "));
            // MultiSelectDropdown에 맞게 배열 상태도 초기화
            setSelectedTop(perfumeToEdit.topNotes);
            setSelectedMiddle(perfumeToEdit.middleNotes);
            setSelectedBase(perfumeToEdit.baseNotes);
            setEmotion(perfumeToEdit.emotionTags.join(", "));
            setTag(perfumeToEdit.customTags.join(", "));
            setDescription(perfumeToEdit.description);
        }
    }, [perfumeToEdit]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImg(imageUrl);
        }
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    };

    const parseTags = (tagString: string): string[] => {
        return tagString
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0);
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const currentTags = parseTags(tag);
        const updatedTags = currentTags.filter(t => t !== tagToRemove);
        setTag(updatedTags.join(', '));
    };

    const handleSubmit = () => {
        if (perfumeToEdit) {
            // 수정 로직 (예: API 호출)
            alert(`${perfumeToEdit.name} 향수 수정 완료!`);
        } else {
            // 등록 로직
            alert("새로운 향수 등록 완료!");
        }
        onCancel(); // 작업 완료 후 다시 상세 페이지로 돌아감
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
            <div className="flex w-full gap-6 items-start">
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
                    <InputField
                        className="w-full text-gray-600"
                        label="가격"
                        type="text" 
                        value={perfumePrice}
                        onChange={(e) => setPerfumePrice(e.target.value)}
                        placeholder="향수 가격 입력"
                    />
                </div>
            </div>
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="향수에 대해 기록해 주세요."
                />
                <InputField
                    className="w-full text-gray-600"
                    label="태그"
                    type="text" 
                    value={tag}
                    onChange={handleTagChange}
                    placeholder="쉼표(,)로 구분하여 태그를 입력해 주세요."
                />
                <div className="w-full flex flex-wrap gap-2 mt-2">
                    {parseTags(tag).map((singleTag, index) => (
                        <Tag
                            key={singleTag + index}
                            text={singleTag}
                            colorClasses="bg-indigo-100 text-indigo-800"
                            onClick={() => handleRemoveTag(singleTag)}
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
                <div className="flex gap-2 mx-auto">
                    <Button type="button" onClick={onCancel}>
                        취소
                    </Button>
                    <Button className="block" type="submit" onClick={handleSubmit}>
                        {perfumeToEdit ? "수정 완료" : "등록"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PostForm;