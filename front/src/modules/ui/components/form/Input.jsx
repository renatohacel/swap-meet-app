const Input = ({ className, ...props }) => {
  return (
    <input
      className={`px-4 py-2 bg-secondary-complement text-dark-primary rounded-lg outline-2 outline-primary font-semibold focus:outline-dark-primary ${className}`}
      {...props}
    />
  );
};

export default Input;
