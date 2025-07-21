import { useState } from "react";

interface DropdownProps{
  className?:string
  placeholder?:string
  options?:string[];
  getLabel?:(option:string)=>string
}

function Dropdown({
  className,
  placeholder="선택",
  options=['최신 순','오래된 순','별점 순'],
  getLabel=(option)=>(option)

}:DropdownProps){
  const [isOpen, setIsOpen] =useState(false)
  const toggleDropdown = ()=> setIsOpen((prev)=>!prev)
  return (
      <div className="relative inline-flex">
        <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
          <button
            type="button"
            className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            {placeholder}
          </button>

          <button
            type="button"
            onClick={toggleDropdown}
            className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
            aria-label="Menu"
             aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </span>

        {isOpen &&(
          <div
            className="absolute left-1/2 top-12 -translate-x-1/2  z-auto w-max overflow-hidden rounded border border-gray-300 bg-white shadow-sm"
          >
            {options?.map((option, index)=>(
              <button
                key={index}
                type="button"
                className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                onClick={()=>setIsOpen(false)}
              >
                {getLabel(option)}
              </button>
            ))}
          </div>
        )}
    </div>
  )
}

export default Dropdown;
