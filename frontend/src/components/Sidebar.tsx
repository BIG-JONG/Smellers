import { Link } from 'react-router-dom'; 

interface SidebarProps {
  isOpen: boolean; 
  onMouseLeave?: () => void;
  className?: string; 
  isLoggedIn: boolean;
  user?:{
    name: string;
    email: string;
    profileImageUrl?: string;
  };
  onLogout: () => void;
}

function Sidebar({
  isOpen,
  onMouseLeave,
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

      <div className="px-4 py-6 flex-grow overflow-auto">
        <ul className="mt-6 space-y-1">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/mypage/info-update" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
                  개인정보 수정
                </Link>
              </li>
              <li>
                <Link to="/mypage/perfumes" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
                  마이페이지
                </Link>
              </li>
              <li>
                <Link to="/perfume/create" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
                  향수 등록
                </Link>
              </li>
              <li>
                <Link to="/follow" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  팔로잉 리스트
                </Link>
              </li>
            </>
          ) : null}
          <li>
            <Link to="/perfumes" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              게시판
            </Link>
          </li>
        </ul>
      </div>

      <div className="fixed left-0 bottom-0 w-full border-t border-gray-100">
        {isLoggedIn && user ? (
          <div className="flex flex-col">
            <Link to="/mypage/perfumes" className="flex w-full items-center gap-2 bg-white p-4 hover:bg-gray-50">
              <img
                alt="User Profile"
                src={user.profileImageUrl || 'https://placehold.co/40x40/cccccc/333333?text=User'}
                className="size-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs">
                  <strong className="block font-medium">{user.name}</strong>
                  <span>{user.email}</span>
                </p>
              </div>
            </Link>
          </div>
        ) : (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500">로그인이 필요합니다.</p>
            <Link to="/login" className="text-sm font-medium text-green-500 hover:underline">
              로그인
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;