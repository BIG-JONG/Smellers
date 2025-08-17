import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
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
  const inputId = id || `checkbox-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className='flex items-center mb-2'>
      <input
      type="checkbox"
      id={inputId}
      name={name || inputId} 
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={inputId} className="ml-2 text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
      </div>
  );
};

export default Checkbox;