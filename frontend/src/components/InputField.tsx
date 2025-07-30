import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  id?: string;
  className?: string;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  id,
  className,
  readOnly = false
}) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    // 이 바깥 div는 여전히 `w-full`을 유지하여 부모 폼의 전체 너비를 차지하게 합니다.
    // 이렇게 해야 InputField 컴포넌트 자체가 폼 내에서 중앙 정렬될 수 있습니다.
    <div className={`mb-4 w-full ${className || ''}`}>
      <label htmlFor={inputId} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>

      <input
        type={type}
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`
          mt-0.5
          rounded-lg text-gray-700 leading-tight
          py-5 px-4
          h-auto min-h-0
          appearance-none border-none !ring-0 !shadow-none outline-none
          ${error ? 'ring-2 ring-red-500' : ''}
          focus:ring-2 focus:ring-blue-500
          placeholder-gray-400

          /* !!! 이 부분을 수정합니다 !!! */
          /* w-full을 제거하고 원하는 고정 픽셀 너비를 지정합니다. */
          /* 예를 들어, w-[500px] 또는 w-[600px] 등으로 변경해 보세요. */
          /* 여기서는 600px로 설정해 보겠습니다. */
          w-[600px] /* <-- 여기에 원하는 픽셀 너비를 직접 입력합니다. */
        `}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default InputField;