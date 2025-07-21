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
  id
}:TextareaProps){
  return(
    <label>
      <span className="text-sm font-medium text-gray-700"> review </span>
      <br/>
      <textarea
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          name={name}
          id={id}
          className="mt-0.5 w-3/5 resize-none rounded border border-gray-300 shadow-sm sm:text-sm"
          >
      </textarea>
    </label>
  )
}

export default Textarea;