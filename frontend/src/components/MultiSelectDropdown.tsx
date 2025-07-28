import { useState, useRef, useEffect } from "react";

interface MultiSelectDropdownProps {
  className?: string;
  label?: string;
  placeholder?: string;
  options?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  getLabel?: (option: string) => string;
  maxSelect?: number;
  error?: string;
}

function MultiSelectDropdown({
  className,
  label,
  placeholder = "선택",
  options = ["우디", "머스크", "시트러스"],
  value = [],
  onChange,
  getLabel = (opt) => opt,
  maxSelect = 3,
  error,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleToggle = (option: string) => {
    let nextValues: string[];
    if (value.includes(option)) {
      nextValues = value.filter((v) => v !== option);
    } else {
      if (value.length >= maxSelect) return;
      nextValues = [...value, option];
    }
    onChange?.(nextValues);
  };

  return (
    <div className={`mb-4 relative ${className || ""}`} ref={wrapperRef}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-1 select-none">
          {label}
        </label>
      )}

      {/* 선택 영역 */}
      <div
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown();
          }
        }}
        className={`mt-0.5 w-full rounded border px-3 py-2 text-sm text-gray-700 shadow-sm
          bg-white cursor-pointer
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }
          focus:outline-none focus:ring-1
          flex items-center gap-2
          `}
      >
        {value.length > 0
          ? value.map((v) => getLabel(v)).join(", ")
          : <span className="text-gray-400">{placeholder}</span>}
        <svg
          className={`ml-auto h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* 드롭다운 */}
      {isOpen && (
        <div className="absolute left-0 mt-1 z-10 w-full max-h-60 overflow-auto rounded border border-gray-300 bg-white shadow-sm">
          {options?.map((option, idx) => {
            const selected = value.includes(option);
            return (
              <label
                key={idx}
                className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 select-none"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => handleToggle(option)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {getLabel(option)}
              </label>
            );
          })}
          <div className="border-t border-gray-200 px-3 py-2 text-xs text-gray-400">
            최대 {maxSelect}개까지 선택할 수 있습니다.
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-500 italic select-none">{error}</p>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
