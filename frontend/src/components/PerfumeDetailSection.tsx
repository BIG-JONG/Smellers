import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface PerfumeDetailData {
  id: string;
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
  perfume: PerfumeDetailData;
  isLoggedIn:boolean;
}

const PerfumeDetailSection: React.FC<PerfumeDetailSectionProps> = ({ perfume, isLoggedIn }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/300x400/CCCCCC/333333?text=No+Image';
  };

  const getRandomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const categoryColors = {
    // top: { bg: 'rgba(255, 174, 191, 0.8)', border: 'rgba(255, 99, 132, 1)' }, // Red-ish
    // middle: { bg: 'rgba(194, 230, 255, 0.8)', border: 'rgba(54, 162, 235, 1)' }, // Blue-ish
    // base: { bg: 'rgba(215, 255, 255, 0.8)', border: 'rgba(75, 192, 192, 1)' }, // Green-ish
    top: { bg: 'rgba(255, 174, 191, 0.8)', border: 'rgba(255, 174, 191, 0.8)' }, // Red-ish
    middle: { bg: 'rgba(194, 230, 255, 0.8)', border: 'rgba(194, 230, 255, 0.8)' }, // Blue-ish
    base: { bg: 'rgba(215, 255, 231, 0.8)', border: 'rgba(215, 255, 231, 0.8)' }, // Green-ish
  };

  const allIndividualNotes = [
  ...perfume.topNotes.map(note => ({
    name: note,
    category: '탑 노트',
    kan: getRandomInRange(1, 3), // 개별 탑 노트에 대한 랜덤 값
    color: categoryColors.top.bg,
    borderColor: categoryColors.top.border
  })),
  ...perfume.middleNotes.map(note => ({
    name: note,
    category: '미들 노트',
    kan: getRandomInRange(4, 6), // 개별 미들 노트에 대한 랜덤 값
    color: categoryColors.middle.bg,
    borderColor: categoryColors.middle.border
  })),
  ...perfume.baseNotes.map(note => ({
    name: note,
    category: '베이스 노트',
    kan: getRandomInRange(7, 9), // 개별 베이스 노트에 대한 랜덤 값
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
      x: { // X축 설정 (가로 막대 차트에서는 가로축이 됩니다)
        beginAtZero: true,
        max: 10,
        ticks: { // X축 숫자(눈금)를 제거
          display: false,
          stepSize: 1,
          font: {
            family: 'Inter',
          },
          color: '#666',
        },
        grid: {
          display: false, // 세로 그리드 라인 제거
          drawBorder: true, // 축 테두리는 유지
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: { // Y축 설정 (가로 막대 차트에서는 세로축이 됩니다)
        grid: {
          display: false, // 가로 그리드 라인 (off)
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

  return (
    <div className="flex flex-col items-center w-full">
      {/* 향수 상세 정보 상단 섹션 */}
      <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24 p-6 md:p-12 max-w-4xl mx-auto bg-white rounded-lg">
        {/* 왼쪽 이미지 영역 */}
        <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
          <ImageCard src={perfume.imageUrl} alt={perfume.name} onError={handleImageError} />
        </div>

        {/* 오른쪽 상세 정보 영역 */}
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          {/* 향수 이름 */}
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{perfume.name}</h2>

          {/* 브랜드 */}
          <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-300">{perfume.brand}</p>

          {/* 가격 */}
          <p className="text-md font-bold text-black dark:text-black">
            ₩ {perfume.price.toLocaleString()}
          </p>

          {/* 상세 설명 */}
          {perfume.description && (
            <p className="mt-5 text-gray-700 dark:text-gray-300 leading-relaxed">
              {perfume.description}
            </p>
          )}

          {/* 평점 */}
          <div className="flex items-center">
            <StarRating rating={perfume.rating} maxRating={5} />
            <span className="ml-2 text-gray-600">({perfume.rating.toFixed(1)})</span>
          </div>

          {/* 감정 태그 */}
          {perfume.emotionTags && perfume.emotionTags.length > 0 && (
            <div className="mt-4">
              {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">감정 태그</h3> */}
              <div className="flex flex-wrap gap-2">
                {perfume.emotionTags.map((tagText, index) => (
                  <Tag key={index} text={tagText} colorClasses="bg-blue-100 text-blue-800" />
                ))}
              </div>
            </div>
          )}

          {/* 사용자 정의 태그 */}
          {perfume.customTags && perfume.customTags.length > 0 && (
            <div className="mt-4">
              {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">사용자 태그</h3> */}
              <div className="flex flex-wrap gap-2">
                {perfume.customTags.map((tagText, index) => (
                  <Tag key={index} text={tagText} colorClasses="bg-green-100 text-green-800" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 개별 향료별 노트 분포 시각화 섹션 (하나의 가로 막대 그래프) */}
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg  mt-8 flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">향의 구성 비율</h3>

        {allIndividualNotes.length > 0 ? (
          <div className="relative w-full" style={{ height: `${allIndividualNotes.length * 35 + 50}px` }}>
            <Bar data={noteChartData} options={noteChartOptions} />
          </div>
        ) : (
          <p className="text-gray-500 mt-4">표시할 향료 데이터가 없습니다.</p>
        )}

        {/* 각 노트 카테고리별 색상 가이드 */}
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
        {isLoggedIn &&(
          <>
            <Button perfumeId={perfume.id} actionType="edit">수정</Button>
            <Button perfumeId={perfume.id} actionType='delete'>삭제</Button>
          </>
        )}
      </div>
      <div className='mt-17 mb-20'/>
    </div>
  );
};

export default PerfumeDetailSection;