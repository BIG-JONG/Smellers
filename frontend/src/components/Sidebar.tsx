    interface SidebarProps {
      isOpen: boolean;
      onMouseLeave?: () => void;
      userName?: string;
      userInfo?: string;
      createPerfume?: string;
      perfumeList?: string;
      followList?: string;
      className?:string
    }

    function Sidebar({ 
      isOpen,
      onMouseLeave,
      userName,
      userInfo,
      createPerfume,
      perfumeList,
      followList,
      className
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
                <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
                  회원 정보 관리
                </a>
              </li>
              <li>
                <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
                  향수 등록
                </a>
              </li>
              <li>
                <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  향수 리스트
                </a>
              </li>

              <li>
                <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  팔로우 리스트
                </a>
              </li>
            </ul>
          </div>

          {/* user profile */}
          <div className="fixed left-0 bottom-0 w-full border-t border-gray-100">
            <a href="#" className="flex w-full items-center gap-2 bg-white p-4 hover:bg-gray-50">
              <img
                alt="User Profile"
                src="/test.jpg"
                className="size-10 rounded-full object-cover"
              />

              <div>
                <p className="text-xs">
                  <strong className="block font-medium">lee</strong>

                  <span> pp@gmail.com </span>
                </p>
              </div>
            </a>
          </div>
        </div>
      )
    }

    export default Sidebar;