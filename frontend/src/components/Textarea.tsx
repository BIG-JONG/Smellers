type TextareaProps = {
  value?:string
  defaultValue?:string
  onChange?:React.ChangeEventHandler<HTMLTextAreaElement>
  placeholder?:string
  className?:string
  disabled?:boolean
  required?:boolean
  name?:string
  id?:string
  label?:string
}

function Textarea({
  value,
  defaultValue,
  onChange,
  placeholder,
  className,
  disabled,
  required,
  name,
  id,
  label
}:TextareaProps){
  return(
   <div className={`mb-4 ${className || ''}`}>
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>

    <textarea
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      rows={4}
      className="mt-0.5 w-full resize-none rounded shadow-sm sm:text-sm"
    />
  </div>

  )
}

export default Textarea;