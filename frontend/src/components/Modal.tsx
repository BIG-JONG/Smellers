import React, { useEffect } from 'react';

// Modal 타입 정의
interface ModalProps {
  isOpen: boolean;           // 모달이 열려 있는지 닫혀 있는지
  onClose: () => void;       // 모달 닫기 함수 
  children: React.ReactNode; // 모달 내용
  title?: string;            // 모달 제목
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title = "Modal Title" // 제목 기본값
}) => {
  // 모달 열려있지 않으면 렌더링 X
  if (!isOpen) {
    return null;
  }

  // ESC 키를 눌러 모달 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle" // h2의 id와 연결
      onClick={onClose} // 배경 클릭 시 모달 닫기
    >
      {/* 모달 내용 컨테이너: 클릭 시 닫히지 않도록 이벤트 전파 중단 */}
      <div
      
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 이벤트 버블링(전파) 중단
      >
        <div className="flex items-start justify-between">
          {/* 모달 제목. id="modalTitle"은 aria-labelledby와 연결. */}
          <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
            {title} {/* prop으로 받은 title을 사용 */}
          </h2>

          {/* 닫기 버튼 */}
          <button
            type="button"
            className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
            aria-label="Close" // 스크린 리더 사용자를 위한 버튼 설명
            onClick={onClose} // 닫기 버튼 클릭 시 모달 닫기
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" // X자 모양 SVG 경로
              />
            </svg>
          </button>
        </div>

        {/* 모달 실제 내용이 들어갈 곳 */}
        <div className="mt-4">
          {children} {/* children prop으로 내용 삽입 */}
        </div>
      </div>
    </div>
  );
};

export default Modal;