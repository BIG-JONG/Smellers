// PerfumeDetailSection.tsx
import React, { useEffect, useRef, useState } from 'react';
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
import UserProfile from './UserProfile';
import Alert from './Alert';

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
    point: number;
    description: string;
}

interface PerfumeDetailSectionProps {
    perfume: PerfumeDetailData | null;
    isLoggedIn: boolean;
    onDelete: () => void;
    author: { userId: number; nickname: string; profileImg: string | null } | null;
    handleAuthorClick: (userId: number, nickname: string) => void;
    currentUserId: number | null;
}
const areNotesEqual = (notes1: string[], notes2: string[]): boolean => {
    if (notes1.length !== notes2.length) {
        return false;
    }
    const sortedNotes1 = [...notes1].sort();
    const sortedNotes2 = [...notes2].sort();
    return sortedNotes1.every((note, index) => note === sortedNotes2[index]);
};


const PerfumeDetailSection: React.FC<PerfumeDetailSectionProps> = ({ perfume, isLoggedIn, onDelete, author, handleAuthorClick, currentUserId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [noteKanValues, setNoteKanValues] = useState<{ [noteName: string]: number }>({});
    


    const prevPerfumeNotesRef = useRef<{
        id: number | null,
        top: string[],
        middle: string[],
        base: string[]
    }>({ id: null, top: [], middle: [], base: [] });

    if (!perfume || isNaN(Number(perfume.id))) {
        return null;
    }

    useEffect(() => {
        const currentPerfumeId = perfume.id;
        const currentTopNotes = perfume.topNotes;
        const currentMiddleNotes = perfume.middleNotes;
        const currentBaseNotes = perfume.baseNotes;

        const prevPerfumeId = prevPerfumeNotesRef.current.id;
        const prevTopNotes = prevPerfumeNotesRef.current.top;
        const prevMiddleNotes = prevPerfumeNotesRef.current.middle;
        const prevBaseNotes = prevPerfumeNotesRef.current.base;
        
        const hasIdChanged = currentPerfumeId !== prevPerfumeId;
        const hasNotesChanged = 
            !areNotesEqual(currentTopNotes, prevTopNotes) ||
            !areNotesEqual(currentMiddleNotes, prevMiddleNotes) ||
            !areNotesEqual(currentBaseNotes, prevBaseNotes);

        if (hasIdChanged || hasNotesChanged) {
            const newKanValues: { [noteName: string]: number } = {};
            const getRandomInRange = (min: number, max: number): number => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            [...currentTopNotes, ...currentMiddleNotes, ...currentBaseNotes].forEach(note => {
                let kanValue;
                if (currentTopNotes.includes(note)) {
                    kanValue = getRandomInRange(1, 3);
                } else if (currentMiddleNotes.includes(note)) {
                    kanValue = getRandomInRange(4, 6);
                } else { // base note
                    kanValue = getRandomInRange(7, 9);
                }
                newKanValues[note] = kanValue;
            });

            setNoteKanValues(newKanValues);
        } 

        prevPerfumeNotesRef.current = {
            id: currentPerfumeId,
            top: currentTopNotes,
            middle: currentMiddleNotes,
            base: currentBaseNotes
        };
    }, [perfume.id, perfume.topNotes, perfume.middleNotes, perfume.baseNotes]);



    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/300x400/CCCCCC/333333?text=No+Image';
    };

    const categoryColors = {
        top: { bg: 'rgba(255, 174, 191, 0.8)', border: 'rgba(255, 174, 191, 0.8)' },
        middle: { bg: 'rgba(194, 230, 255, 0.8)', border: 'rgba(194, 230, 255, 0.8)' },
        base: { bg: 'rgba(215, 255, 231, 0.8)', border: 'rgba(215, 255, 231, 0.8)' },
    };

    const allIndividualNotes = [
        ...perfume.topNotes.map(note => ({ name: note, category: '탑 노트', color: categoryColors.top.bg, borderColor: categoryColors.top.border, kan: noteKanValues[note] || 0 })),
        ...perfume.middleNotes.map(note => ({ name: note, category: '미들 노트', color: categoryColors.middle.bg, borderColor: categoryColors.middle.border, kan: noteKanValues[note] || 0 })),
        ...perfume.baseNotes.map(note => ({ name: note, category: '베이스 노트', color: categoryColors.base.bg, borderColor: categoryColors.base.border, kan: noteKanValues[note] || 0 })),
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

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");
    const [alertMessage, setAlertMessage] = useState("");

    const handleDeleteClick = async () => {
        const perfumeId = Number(perfume.id);
        if (isNaN(perfumeId) || perfumeId <= 0) {
            setAlertType("error");
            setAlertMessage("삭제에 실패했습니다.");
            setShowAlert(true);
            return;
        }

        const token = sessionStorage.getItem("token");
        if (!token) {
            setAlertType("warning");
            setAlertMessage("로그인이 필요합니다.");
            setShowAlert(true);
            return;
        }

        try {
            await axios.delete(`http://localhost:4000/perfumes/${perfumeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setAlertType("success");
            setAlertMessage("향수 삭제 완료!");
            setShowAlert(true);
            
            setTimeout(() => {
                setShowAlert(false);
                onDelete();
            }, 2000);

        } catch (error) {
            setAlertType("error");
            setAlertMessage("향수 삭제에 실패했습니다.");
            setShowAlert(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return <PostForm perfumeToEdit={perfume} onCancel={handleCancelEdit} />;
    }

    const isAuthor = isLoggedIn && author && author.userId === currentUserId;
    // console.log("isLoggedIn:", isLoggedIn);
    // console.log("author:", author);
    // console.log("currentUserId:", currentUserId);
    // console.log("isAuthor:", isAuthor);

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
                         <StarRating rating={perfume.point} maxRating={5} />
                        <span className="ml-2 text-gray-600">({perfume.point.toFixed(1)})</span>
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
            {author && (
                <div className="mt-5 p-3 bg-white  w-full max-w-4xl">
                    <UserProfile
                        nickName={author.nickname}
                        profileImageUrl={
                            author.profileImg
                                ? `http://localhost:4000/uploads/${author.profileImg}`
                                : undefined 
                        }
                        userId={author.userId.toString()}
                        alt={author.nickname}
                        onClick={() => handleAuthorClick(author.userId, author.nickname)}
                    />
                </div>
            )}
            <div className='mt-20'>
                {isAuthor && (
                    <div className='flex gap-2'>
                        <Button actionType="edit" onClick={handleEditClick}>수정</Button>
                        <Button actionType='delete' onClick={handleDeleteClick}>삭제</Button>
                    </div>
                )}
            </div>

            {showAlert && ( 
                <div className="mt-4 w-full">
                    <Alert type={alertType} message={alertMessage} />
                </div>
            )}
            <div className='mt-17 mb-20'/>
        </div>
    );
};

export default PerfumeDetailSection;