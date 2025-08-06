import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import Textarea from "./Textarea";
import Tag from "./Tag";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Button from "./Button";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface PerfumeDetailData {
    id: number;
    imageUrl: string;
    name: string;
    brand: string;
    price: number;
    topNotes: string[];
    middleNotes: string[];
    baseNotes: string[];
    emotionTags: string[];
    customTags: string[];
    description: string;
}

interface PostFormProps {
    perfumeToEdit?: PerfumeDetailData;
    onCancel: () => void;
}

function PostForm({ perfumeToEdit, onCancel }: PostFormProps) {
    const [img, setImg] = useState<File | undefined>(undefined);
    const [previewImgUrl, setPreviewImgUrl] = useState<string | undefined>(undefined);
    const [perfumeName, setPerfumeName] = useState("");
    const [perfumeBrand, setPerfumeBrand] = useState("");
    const [perfumePrice, setPerfumePrice] = useState("");
    const [selectedTop, setSelectedTop] = useState<string[]>([]);
    const [selectedMiddle, setSelectedMiddle] = useState<string[]>([]);
    const [selectedBase, setSelectedBase] = useState<string[]>([]);
    const [tag, setTag] = useState("");
    const [emotion, setEmotion] = useState("");
    const [description, setDescription] = useState("");
    
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");
    const [alertMessage, setAlertMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (perfumeToEdit) {
            setPreviewImgUrl(perfumeToEdit.imageUrl);
            setPerfumeName(perfumeToEdit.name);
            setPerfumeBrand(perfumeToEdit.brand);
            setPerfumePrice(perfumeToEdit.price.toString()); 
            setSelectedTop(perfumeToEdit.topNotes);
            setSelectedMiddle(perfumeToEdit.middleNotes);
            setSelectedBase(perfumeToEdit.baseNotes);
            setTag(perfumeToEdit.customTags.join(", "));
            setEmotion(perfumeToEdit.emotionTags.join(", "));
            setDescription(perfumeToEdit.description);
        }
    }, [perfumeToEdit]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImg(file);
            setPreviewImgUrl(URL.createObjectURL(file));
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowAlert(false);
        setLoading(true);

        const token = sessionStorage.getItem("token");

        if (!token) {
            setAlertType("error");
            setAlertMessage("로그인이 필요합니다.");
            setShowAlert(true);
            setLoading(false);
            return;
        }

        // ⭐ 수정된 부분: id가 NaN인지 확인하고, 유효한 숫자인지 검증합니다.
        const perfumeId = perfumeToEdit?.id;
        const isEditingMode = perfumeToEdit !== undefined;
        
        if (isEditingMode) {
            if (perfumeId === undefined || isNaN(Number(perfumeId))) {
                setAlertType("error");
                setAlertMessage("수정할 향수 정보가 유효하지 않습니다.");
                setShowAlert(true);
                setLoading(false);
                return;
            }
        }
        
        const notes = [
            ...selectedTop.map(note => ({ noteType: "TOP", noteName: note })),
            ...selectedMiddle.map(note => ({ noteType: "MIDDLE", noteName: note })),
            ...selectedBase.map(note => ({ noteType: "BASE", noteName: note })),
        ];

        const formData = new FormData();
        formData.append("perfumeName", perfumeName);
        formData.append("brandName", perfumeBrand);
        formData.append("price", String(perfumePrice));
        formData.append("content", description);
        formData.append("tag", parseTags(tag).join(','));
        formData.append("emotionTag", parseTags(emotion).join(','));
        formData.append("isPublic", "Y");
        formData.append("perfumeStatus", "Y");
        formData.append("notes", JSON.stringify(notes));
        formData.append("point", String(0)); 

        if (img) {
            formData.append("images", img);
        }

        const method = isEditingMode ? "put" : "post";
        const url = isEditingMode 
            ? `http://localhost:4000/perfumes/${perfumeId}`
            : 'http://localhost:4000/perfumes';

        try {
            const res = await axios[method](url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (res.status === 201 || res.status === 200) {
                setAlertType("success");
                setAlertMessage(isEditingMode ? "향수 정보가 성공적으로 수정되었습니다." : "향수 정보가 성공적으로 등록되었습니다.");
                setShowAlert(true);
                setTimeout(() => navigate('/perfumes'), 2000);
            }
        } catch (err: any) {
            console.error("서버 응답 오류:", err.response?.data || err.message);
            setAlertType("error");
            setAlertMessage(isEditingMode ? "향수 정보 수정에 실패했습니다." : "향수 정보 등록에 실패했습니다.");
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto mt-10">
            <form onSubmit={handleSubmit} className="w-full">
                <h1 className="text-4xl font-extrabold mb-8 text-center">
                    {perfumeToEdit ? "향수 수정" : "향수 등록"}
                </h1>
                <div className="flex w-full gap-6 items-start">
                    <div className="flex flex-col items-center gap-4 w-1/3">
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        {previewImgUrl && (
                            <img
                                src={previewImgUrl}
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
                <div className="flex w-full gap-4 flex-wrap justify-start mt-6">
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
                        <Button type="button" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button className="block" type="submit" disabled={loading}>
                            {loading ? "처리 중..." : (perfumeToEdit ? "수정" : "등록")}
                        </Button>
                    </div>
                </div>
            </form>
            <div className={`mt-4 w-full h-12 transition-opacity duration-300 ${showAlert ? 'opacity-100' : 'opacity-0'}`}>
                <Alert type={alertType} message={alertMessage} />
            </div>
        </div>
    );
}

export default PostForm;