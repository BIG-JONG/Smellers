import React from 'react';

// Checkbox 타입정의
interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 체크 상태 변경 시 호출
  id?: string;
  name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  id,
  name,
}) => {
  // id 미제공시 간단한 id 생성
  const inputId = id || `checkbox-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className='flex items-center mb-2'>
      <input
      type="checkbox"
      id={inputId}
      name={name || inputId} //name 없으면 id 사용
      checked={checked}
      onChange={onChange}
      //Tailwind css 적용
      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={inputId} className="ml-2 text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
      </div>
  );
};

export default Checkbox;