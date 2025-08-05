import React from 'react';
import { Link } from 'react-router-dom'; 

interface SidebarProps {
  isOpen: boolean; 
  onMouseLeave?: () => void; // 사이드바에서 마우스가 벗어났을 때 호출될 함수
  className?: string; 
  isLoggedIn:boolean
  user?:{
    name:string;
    email:string;
    profileImageUrl?:string
  }
}

  

function Sidebar({
  isOpen,
  onMouseLeave,
  className,
  isLoggedIn, 
  user,
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
          <li>
            {/* FAQ */}
            <Link to="/faq" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              FaQ
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
              <strong className="block font-medium">lee</strong>
              <span> pp@gmail.com </span>
            </p>
          </div>
        </Link>
      </div>
    </div>
    //   <div className="fixed left-0 bottom-0 w-full border-t border-gray-100">
    //     {isLoggedIn && user ? (
    //       <Link
    //         to="/mypage/perfumes"
    //         className="flex w-full items-center gap-2 bg-white p-4 hover:bg-gray-50"
    //       >
    //         <img
    //           alt="User Profile"
    //           src={
    //             user.profileImageUrl
    //               ? user.profileImageUrl
    //               : 'https://placehold.co/40x40/cccccc/333333?text=User'
    //           }
    //           className="w-10 h-10 rounded-full object-cover"
    //         />
    //         <div>
    //           <p className="text-xs">
    //             <strong className="block font-medium">{user.name}</strong>
    //             <span>{user.email}</span>
    //           </p>
    //         </div>
    //       </Link>
    //     ) : (
    //      null
    //     )}
    //   </div>
    // </div>
  );
}

export default Sidebar;
