import React from 'react';

// Tag 타입 정의
interface TagProps {
  text: string; //태그 안에 들어갈 글자
  colorClasses?: string; //태그 색깔 정하는 정보
}

const Tag: React.FC<TagProps> = ({ text, colorClasses }) => {
  const defaultColorClasses = "bg-gray-200 text-gray-800"; // 색깔 정보 없으면 사용되는 기본 색

  return (
    <span
    //tailwind css 적용
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses || defaultColorClasses}`}
    >
      {text} {/* 태그 텍스트를 표시합니다. */}
    </span>
  );
};

export default Tag;