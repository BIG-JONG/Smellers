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
  autoFocus?: boolean;
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
  const readOnlyClass = readOnly ? " text-gray-500 cursor-not-allowed" : "text-gray-700";

  return (
    <div className={`mb-4 w-full ${className || ''}`}>
      <label htmlFor={inputId} className="block sm:text-sm text-gray-700 text-xs font-bold mb-2">
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
          rounded-lg leading-tight
          py-2 px-2 
          sm:py-5 sm:px-4
          h-auto min-h-0
          appearance-none border-none !ring-0 !shadow-none outline-none
          ${error ? 'ring-2 ring-red-500' : ''}
          placeholder-gray-400
          focus:ring-2 focus:ring-blue-500 
          w-full max:w-[550px]
          ${readOnlyClass}
          placeholder:text-xs sm:placeholder:text-sm
          [-webkit-appearance:none]
          [-webkit-tap-highlight-color:transparent]
        `}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
