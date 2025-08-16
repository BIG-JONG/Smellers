import { useNavigate } from 'react-router-dom';

interface FooterProps {
  logo?: string;
  copyright?: string;
  className?: string;
}

function Footer({
  //logo,
  copyright,
  className
}: FooterProps) {
  const navigate = useNavigate();

  return (
    <footer className={`bg-gray-100 ${className}`}>
      <div className="relative mx-auto max-w-screen-full px-10 sm:px-16 lg:px-24 py-8 lg:pt-24">
        {/* 맨 위로 이동하는 버튼 */}
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <button
            className="inline-block rounded-full bg-gray-800 p-2 text-white shadow-sm transition hover:bg-gray-800 sm:p-3 lg:p-4"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="맨 위로 가기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            {/* 로고 */}
            <div className="flex justify-center text-teal-600 lg:justify-start">
              <a
                href="#"
                className="flex items-center text-sm font-bold text-gray-900 px-2 pl-10"
                onClick={(e) => {
                  // e.preventDefault();
                  navigate('/');
                }}
              >
                AromaBase
              </a>
            </div>
          </div>

          {/* 소셜 미디어 링크 */}
          <ul
            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
          >
            <li>
              <a className="flex items-center text-gray-700 transition hover:text-gray-700/75" href="#"> 
                <img 
                  src="/notion.png" 
                  alt="notion Logo" 
                  className="w-5 h-5 relative top-0.5" />
              </a>
            </li>

            <li>
              <a 
                className="text-gray-700 transition hover:text-gray-700/75" 
                href="https://github.com/BIG-JONG/Smellers.git">
                <img 
                  src="/github.png" 
                  alt="github Logo" 
                  className="w-5 h-5 relative top-0.5" />
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-6 ml-9 leading-relaxed text-gray-500">
          향기로운 기억들이 모여 새로운 이야기가 시작되는 곳,<br/>
          나만의 향수를 기록하고 특별한 순간들을 함께 나누는 공간<br/>
          당신의 취향과 감성을 펼쳐 보세요.<br/>
        </p>
        
        {/* 저작권 표시 */}
        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          {copyright ?? "Copyright © 2025. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
export default Footer;
