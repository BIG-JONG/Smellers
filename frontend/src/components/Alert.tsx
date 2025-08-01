// Alert.tsx

import React from 'react';

// Alert 타입 정의
interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info'; 
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ message, type = 'info', className }) => {
  const getTypeClasses = (alertType: string) => {
    switch (alertType) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'info': // 기본값
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700';
    }
  };

  const getIcon = (alertType: string) => {
    switch (alertType) {
      case 'success': //성공
        return '✔️';
      case 'error': //에러
        return '❌';
      case 'warning': //경고
        return '⚠️';
      case 'info': //정보(기본값)
      default:
        return 'ℹ️'; 
    }
  };

  return (
    <div
      className={`w-full p-4 mb-4 text-sm rounded-lg border-l-4 ${getTypeClasses(type)} ${className || ''}`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="flex-shrink-0 w-5 h-5 mr-2">{getIcon(type)}</span>
        <div>
          {message}
        </div>
      </div>
    </div> 
  );
};

export default Alert;