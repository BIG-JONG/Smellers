// PerfumeDetailSection.tsx
import React, { useState } from 'react';
import ImageCard from './ImageCard';
import StarRating from './StarRating';
import Tag from './Tag';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Button from './Button';
import PostForm from './PostForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export interface PerfumeDetailData {
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
    rating: number;
    description: string;
}

interface PerfumeDetailSectionProps {
    perfume: PerfumeDetailData | null;
    isLoggedIn: boolean;
}

const PerfumeDetailSection: React.FC<PerfumeDetailSectionProps> = ({ perfume, isLoggedIn }) => {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    // perfume 객체가 없거나 id가 유효하지 않으면 아무것도 렌더링하지 않음
    if (!perfume || isNaN(Number(perfume.id))) {
        return null;
    }

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/300x400/CCCCCC/333333?text=No+Image';
    };

    const getRandomInRange = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const categoryColors = {
        top: { bg: 'rgba(255, 174, 191, 0.8)', border: 'rgba(255, 174, 191, 0.8)' },
        middle: { bg: 'rgba(194, 230, 255, 0.8)', border: 'rgba(194, 230, 255, 0.8)' },
        base: { bg: 'rgba(215, 255, 231, 0.8)', border: 'rgba(215, 255, 231, 0.8)' },
    };

    const allIndividualNotes = [
        ...perfume.topNotes.map(note => ({
            name: note,
            category: '탑 노트',
            kan: getRandomInRange(1, 3),
            color: categoryColors.top.bg,
            borderColor: categoryColors.top.border
        })),
        ...perfume.middleNotes.map(note => ({
            name: note,
            category: '미들 노트',
            kan: getRandomInRange(4, 6),
            color: categoryColors.middle.bg,
            borderColor: categoryColors.middle.border
        })),
        ...perfume.baseNotes.map(note => ({
            name: note,
            category: '베이스 노트',
            kan: getRandomInRange(7, 9),
            color: categoryColors.base.bg,
            borderColor: categoryColors.base.border
        })),
    ];

    const chartLabels = allIndividualNotes.map(note => note.name);
    const chartDataValues = allIndividualNotes.map(note => note.kan);
    const chartBackgroundColors = allIndividualNotes.map(note => note.color);
    const chartBorderColors = allIndividualNotes.map(note => note.borderColor);

    const noteChartData = {
        labels: chartLabels,
        datasets: [
            {
                label: '노트 존재감',
                data: chartDataValues,
                backgroundColor: chartBackgroundColors,
                borderColor: chartBorderColors,
                borderWidth: 1,
            },
        ],
    };

    const noteChartOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        const index = context.dataIndex;
                        const noteInfo = allIndividualNotes[index];
                        return `${noteInfo.category}: ${noteInfo.name} (${noteInfo.kan})`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    display: false,
                    stepSize: 1,
                    font: {
                        family: 'Inter',
                    },
                    color: '#666',
                },
                grid: {
                    display: false,
                    drawBorder: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 14,
                        family: 'Inter',
                    },
                    color: '#333',
                },
            },
        },
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDeleteClick = async () => {
        const perfumeId = Number(perfume.id);
        if (isNaN(perfumeId) || perfumeId <= 0) {
            alert("유효하지 않은 향수 ID입니다. 관리자에게 문의하세요.");
            console.error("삭제하려는 향수의 ID가 유효하지 않습니다:", perfume.id);
            return;
        }

        if (window.confirm(`${perfume.name} 향수를 정말 삭제하시겠습니까?`)) {
            const token = sessionStorage.getItem("token");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }

            try {
                await axios.delete(`http://localhost:4000/perfumes/${perfumeId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                alert("향수 삭제 완료!");
                // 삭제 후 메인 페이지로 이동
                navigate('/');
            } catch (error) {
                console.error("향수 삭제 실패", error);
                alert("향수 삭제에 실패했습니다. 관리자에게 문의하세요.");
            }
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    // 수정 폼이 켜졌을 때와 꺼졌을 때를 분리하여 렌더링
    if (isEditing) {
        return <PostForm perfumeToEdit={perfume} onCancel={handleCancelEdit} />;
    }

    // isEditing이 false일 때, 즉 일반적인 상세 페이지를 보여줌
    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24 p-6 md:p-12 max-w-4xl mx-auto bg-white rounded-lg">
                <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                    <ImageCard src={perfume.imageUrl} alt={perfume.name} onError={handleImageError} />
                </div>
                <div className="flex flex-col gap-2 w-full md:w-2/3">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{perfume.name}</h2>
                    <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-300">{perfume.brand}</p>
                    <p className="text-md font-bold text-black dark:text-black">
                        ₩ {perfume.price.toLocaleString()}
                    </p>
                    {perfume.description && (
                        <p className="mt-5 text-gray-700 dark:text-gray-300 leading-relaxed">
                            {perfume.description}
                        </p>
                    )}
                    <div className="flex items-center">
                        <StarRating rating={perfume.rating} maxRating={5} />
                        <span className="ml-2 text-gray-600">({perfume.rating.toFixed(1)})</span>
                    </div>
                    {perfume.emotionTags && perfume.emotionTags.length > 0 && (
                        <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
                                {perfume.emotionTags.map((tagText, index) => (
                                    <Tag key={index} text={tagText} colorClasses="bg-blue-100 text-blue-800" />
                                ))}
                            </div>
                        </div>
                    )}
                    {perfume.customTags && perfume.customTags.length > 0 && (
                        <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
                                {perfume.customTags.map((tagText, index) => (
                                    <Tag key={index} text={tagText} colorClasses="bg-green-100 text-green-800" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg mt-8 flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">향의 구성 비율</h3>
                {allIndividualNotes.length > 0 ? (
                    <div className="relative w-full" style={{ height: `${allIndividualNotes.length * 35 + 50}px` }}>
                        <Bar data={noteChartData} options={noteChartOptions} />
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">표시할 향료 데이터가 없습니다.</p>
                )}
                <div className="w-full mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center">
                        <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: categoryColors.top.bg }}></span>
                        탑 노트
                    </div>
                    <div className="flex items-center">
                        <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: categoryColors.middle.bg }}></span>
                        미들 노트
                    </div>
                    <div className="flex items-center">
                        <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: categoryColors.base.bg }}></span>
                        베이스 노트
                    </div>
                </div>
            </div>
            <div className='flex gap-2 mt-20'>
                {isLoggedIn && (
                    <>
                        <Button actionType="edit" onClick={handleEditClick}>수정</Button>
                        <Button actionType='delete' onClick={handleDeleteClick}>삭제</Button>
                    </>
                )}
            </div>
            <div className='mt-17 mb-20'/>
        </div>
    );
};

export default PerfumeDetailSection;