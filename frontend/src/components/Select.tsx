import { useState } from "react"

interface SelectProps{
  className?:string
  options?:string[]
  value?:string | string[]
  label?:string
  placeholder?:string
  name?:string
  id?:string
  disabled?: boolean
  multiple?: boolean
  maxSelect?: number;
  onChange?: (value: string | string[]) => void;
}

function Select({
  className="",
  options=["머스크","우디","바닐라"],
  value,
  label="탑노트",
  placeholder="최대 3개 선택",
  name="top",
  id,
  disabled = false,
  multiple = false,
  maxSelect = 3,
  onChange,
}:SelectProps){
  const selectId = id||name;

  // const [notes, setNotes] = useState<string[]>([]);


  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    if(multiple){
      let selectedValues = Array.from(e.target.selectedOptions).map(
        (opt)=>opt.value
      )
      // 최대 3개 선택
      if (selectedValues.length > maxSelect) {
        selectedValues = selectedValues.slice(0, maxSelect);
      }
      onChange?.(selectedValues);
    }else{
      onChange?.(e.target.value)
    }
  }

  const selectedValues = multiple && Array.isArray(value) ?value:[]

  return(
    <div className={className}>
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
        <select
          id={selectId}
          name={name}
          value={multiple ? (value as string[]) : (value as string)}
          onChange={handleChange}
          disabled={disabled}
          multiple={multiple}
          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        >
          {!multiple && placeholder && (
            <option value ="">{placeholder}</option>
          )}
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {multiple && selectedValues.length > 0 && (
          <div className="mt-4">
            {selectedValues.map((val, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded mr-2 inline-block"
              >
                {val}
              </span>
            ))}
          </div>
        )}
    </div>
  )
}


export default Select;