const Input = ({ className, ...props }) => {
  return (
    <input
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
          pr-8
          bg-white
        ${className}
        `}
      {...props}
    />
  );
};

export default Input;
