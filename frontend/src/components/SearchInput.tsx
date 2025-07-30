import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}


const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "",
}) => {
  return (
    <div className="flex-grow mx-8 max-w-md">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-700"
          aria-label="Search"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;