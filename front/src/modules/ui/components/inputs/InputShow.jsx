
const InputShow = ({ placeholder = "", value = "", name = "", disabled = true, ...props }) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value ?? ""}
      disabled={disabled}
      autoComplete="off"
      {...props}
      className={`
          rounded-lg
          p-2 
          border-2 
          border-primary 
          text-primary 
          font-semibold 
          h-full 
          w-full
          overflow-x-auto 
          text-sm 
          md:text-base 
          focus:border-dark-primary 
          focus:text-dark-primary 
          focus:outline-none
          transition-all
          bg-white
          ${disabled ? "cursor-not-allowed" : ""}
      `}
    />
  )
}

export default InputShow