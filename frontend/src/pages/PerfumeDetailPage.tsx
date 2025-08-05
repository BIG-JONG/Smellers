import React, { useEffect, useState } from 'react';
import PerfumeDetailSection from "@/components/PerfumeDetailSection";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function mapPerfumeData(raw: any) {
    return {
        id: String(raw.perfume_id),
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
    const [perfume, setPerfume] = useState<any>(null);

    useEffect(() => {
        if (!id || isNaN(Number(id))) {
            console.error('유효하지 않은 id입니다.');
            return;
        }

        const fetchPerfume = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/perfumes/public/${id}`);
                console.log('API 응답 전체:', response);
                console.log('response.data:', response.data);

                const mappedData = mapPerfumeData(response.data.data ?? response.data);
                setPerfume(mappedData);
            } catch (error) {
                console.error('향수 상세 조회 실패', error);
            }
        };

        fetchPerfume();
    }, [id]);

    if (!id || isNaN(Number(id))) {
        return <div>잘못된 접근입니다.</div>;
    }

    if (!perfume) return <div>향수 정보를 불러오는 중입니다...</div>;

    return (
        <div>
            <PerfumeDetailSection perfume={perfume} isLoggedIn={true} />
        </div>
    );
};

export default PerfumeDetailPage;