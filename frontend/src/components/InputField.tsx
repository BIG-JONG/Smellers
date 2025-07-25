import React from 'react' ;

// inputField 타입 정의
interface InputFieldProps {
  label: string; ///(Ex: 아이디, 비밀번호)
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  id?: string;
  className?:string //추가
  readOnly?:boolean //추가
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
  readOnly=false
}) => {
  //아이디가 제공되지 않으면 간단한 id 생성/
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`mb-4 ${className || ''}`}>
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
        // tailwindcss 적용
        className={`mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm ${
          error ? 'border-red-500' : '' // 에러가 있으면 테두리를 빨간색으로
        } focus:border-blue-500 focus:ring-blue-500`}
      />
      {/* 에러 메시지 표시 부분 추가 */}
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default InputField;