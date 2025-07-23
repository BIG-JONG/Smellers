import { useState } from "react"
import Sidebar from './SideBar'

function Layout(){
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return(
    <div className="relative min-h-screen">
      {/* 사이드 바 */}
      <Sidebar isOpen={isSidebarOpen}/>
      {/* 햄버거 메뉴 */}
        <button
          onClick ={()=>setIsSidebarOpen(!isSidebarOpen)}
          // className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
          className="fixed top-4 left-4 z-50 inline-flex items-center justify-center rounded-md p-2 text-gray-700 bg-white hover:bg-gray-100 focus:visible:ring-2 focus-visible:ring-inset focus:ring-black"
          aria-label="Toggle sidebar"
        >
          <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          >
          {isSidebarOpen?(
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ):(
            //햄버거 아이콘
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
          </svg>
        </button>

        {/* sidebar component */}
        <Sidebar isOpen={isSidebarOpen}/>
        
        {/* main content */}
        <main className="flex-1 p-4 ml-[20%]">
          <h1>content</h1>
        </main>
      </div>

  )
}


export default Layout

