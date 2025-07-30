// frontend/src/components/Sidebar.tsx

import React from 'react';

// Sidebar 컴포넌트가 받을 props를 정의합니다.
interface SidebarProps {
  isOpen: boolean; // 사이드바 열림/닫힘 상태
  onMouseLeave?: () => void; // 사이드바에서 마우스가 벗어났을 때 호출될 함수
  // userName, userInfo, createPerfume, perfumeList, followList, className은
  // 현재 Sidebar 컴포넌트 내부에서 사용되지 않으므로 제거합니다.
  // 만약 나중에 이 값들을 Sidebar 내에서 동적으로 표시하거나 활용할 계획이라면 다시 추가할 수 있습니다.
}

function Sidebar({
  isOpen,
  onMouseLeave,
  // 사용되지 않는 props는 여기서도 제거합니다.
}: SidebarProps) {

  return (
    <div
      className={`
        fixed top-[74px] left-0 z-40 h-[calc(100%-64px)] w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      onMouseLeave={onMouseLeave}
    >

      {/* side bar content */}
      <div className="px-4 py-6 flex-grow overflow-auto">
        <ul className="mt-6 space-y-1">
          <li>
            {/* 실제 라우팅 경로로 변경해야 합니다. 예: /mypage/info */}
            <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
              회원 정보 관리
            </a>
          </li>
          <li>
            {/* 실제 라우팅 경로로 변경해야 합니다. 예: /perfume/create */}
            <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
              향수 등록
            </a>
          </li>
          <li>
            {/* 실제 라우팅 경로로 변경해야 합니다. 예: /perfumes */}
            <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              향수 리스트
            </a>
          </li>
          <li>
            {/* 실제 라우팅 경로로 변경해야 합니다. 예: /follow */}
            <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              팔로우 리스트
            </a>
          </li>
        </ul>
      </div>

      {/* user profile */}
      <div className="fixed left-0 bottom-0 w-full border-t border-gray-100">
        {/* 실제 라우팅 경로로 변경해야 합니다. 예: /mypage */}
        <a href="#" className="flex w-full items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt="User Profile"
            // 이미지 경로를 public 폴더의 이미지로 수정하거나, 실제 사용자 프로필 이미지 URL로 변경해야 합니다.
            // 여기서는 임시 플레이스홀더 이미지를 사용합니다.
            src="https://placehold.co/40x40/cccccc/333333?text=User"
            className="size-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">lee</strong> {/* 실제 사용자 이름으로 동적 변경 필요 */}
              <span> pp@gmail.com </span> {/* 실제 사용자 이메일로 동적 변경 필요 */}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
