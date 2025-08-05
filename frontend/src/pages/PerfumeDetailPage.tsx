import React, { useEffect, useState } from 'react';
import PerfumeDetailSection from "@/components/PerfumeDetailSection";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PerfumeDetailData } from '@/components/PerfumeDetailSection';

function mapPerfumeData(raw: any): PerfumeDetailData {
    return {
        id: Number(raw.perfumeId), // ⭐⭐ perfumeId로 수정 ⭐⭐
        imageUrl: raw.images?.[0]?.url_path ?? '',
        name: raw.perfumeName,
        brand: raw.brandName,
        price: raw.price,
        topNotes: raw.notes?.filter((n: any) => n.noteType === 'TOP').map((n: any) => n.noteName) || [],
        middleNotes: raw.notes?.filter((n: any) => n.noteType === 'MIDDLE').map((n: any) => n.noteName) || [],
        baseNotes: raw.notes?.filter((n: any) => n.noteType === 'BASE').map((n: any) => n.noteName) || [],
        emotionTags: raw.emotionTag ? raw.emotionTag.split(',').map((s: string) => s.trim()) : [],
        customTags: raw.tag ? raw.tag.split(',').map((s: string) => s.trim()) : [],
        rating: raw.point,
        description: raw.content,
    };
}

const PerfumeDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [perfume, setPerfume] = useState<PerfumeDetailData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPerfume = async () => {
            try {
                if (!id || isNaN(Number(id))) {
                    console.error("URL 파라미터 ID가 유효하지 않습니다: ", id);
                    setPerfume(null);
                    setIsLoading(false);
                    return;
                }

                const token = sessionStorage.getItem("token");
                const isLoggedIn = !!token;
                const headers = isLoggedIn ? { 'Authorization': `Bearer ${token}` } : {};
                
                const endpoint = isLoggedIn ? `/perfumes/${id}` : `/perfumes/public/${id}`;
                const response = await axios.get(`http://localhost:4000${endpoint}`, { headers });
                
                if (response.status === 204) {
                    console.warn(`향수 ID ${id}에 대한 데이터가 없습니다.`);
                    setPerfume(null);
                    setIsLoading(false);
                    return;
                }

                let rawData = response.data;
                if (Array.isArray(rawData)) {
                    rawData = rawData[0];
                } else if (rawData.data) {
                    rawData = rawData.data;
                }
                
                // ⭐⭐ 여기도 rawData.perfume_id 대신 rawData.perfumeId를 사용해야 합니다. ⭐⭐
                if (!rawData || isNaN(Number(rawData.perfumeId))) {
                    console.error("서버에서 받은 데이터가 유효하지 않습니다. rawData:", rawData);
                    setPerfume(null);
                    setIsLoading(false);
                    return;
                }

                const mappedData = mapPerfumeData(rawData);
                setPerfume(mappedData);
                
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error(`향수 상세 조회 실패. 상태 코드: ${error.response.status}, 메시지: ${error.response.statusText}`);
                } else {
                    console.error('향수 상세 조회 실패. 네트워크 오류 또는 기타 문제일 수 있습니다.', error);
                }
                setPerfume(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPerfume();
    }, [id]);

    if (isLoading) {
        return <div>향수 정보를 불러오는 중입니다...</div>;
    }

    if (!perfume) {
        return <div>향수 정보를 찾을 수 없습니다.</div>;
    }
    
    const isLoggedIn = !!sessionStorage.getItem("token");

    return (
        <div>
            <PerfumeDetailSection perfume={perfume} isLoggedIn={isLoggedIn} />
        </div>
    );
};

export default PerfumeDetailPage;