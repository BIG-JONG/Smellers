import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;          
  onClose: () => void;       
  children: React.ReactNode; 
  title?: string;            
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title = "Modal Title" 
}) => {
  if (!isOpen) {
    return null;
  }

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
      aria-labelledby="modalTitle" 
      onClick={onClose}
    >
      <div
      
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex items-start justify-between">
          <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
            {title} 
          </h2>

          {/* 닫기 버튼 */}
          <button
            type="button"
            className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
            aria-label="Close" 
            onClick={onClose} 
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
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;