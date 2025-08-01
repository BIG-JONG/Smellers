import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 임포트합니다.

// Sidebar 컴포넌트가 받을 props를 정의합니다.
interface SidebarProps {
  isOpen: boolean; // 사이드바 열림/닫힘 상태
  onMouseLeave?: () => void; // 사이드바에서 마우스가 벗어났을 때 호출될 함수
  className?: string; // 외부에서 추가적인 Tailwind CSS 클래스를 받을 수 있도록 유지
}

function Sidebar({
  isOpen,
  onMouseLeave,
  className, // props 디스트럭처링에 className을 추가 (사용은 안 하지만 타입 체크를 위해 유지)
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
            {/* '개인정보 수정' 링크를 UserInfoUpdatePage 경로로 변경 */}
            <Link to="/mypage/info-update" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
              개인정보 수정
            </Link>
          </li>
          <li>
            {/* '마이페이지' 링크를 MyPerfumeListPage 경로로 변경 */}
            <Link to="/mypage/perfumes" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
              마이페이지
            </Link>
          </li>
          <li>
            {/* '향수 등록' 링크를 PostPerfumePage 경로로 변경 */}
            <Link to="/perfume/create" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
              향수 등록
            </Link>
          </li>
          <li>
            {/* '게시판' (전체 사람들이 올린 글) 링크를 UserPerfumeListPage 경로로 변경 */}
            <Link to="/perfumes" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              게시판
            </Link>
          </li>
          <li>
            {/* '팔로잉 리스트' 링크를 FollowListPage 경로로 변경 */}
            <Link to="/follow" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              팔로잉 리스트
            </Link>
          </li>
        </ul>
      </div>

      {/* user profile */}
      <div className="fixed left-0 bottom-0 w-full border-t border-gray-100">
        {/* 사용자 프로필 링크를 마이페이지 경로로 변경 */}
        <Link to="/mypage/perfumes" className="flex w-full items-center gap-2 bg-white p-4 hover:bg-gray-50">
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
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
