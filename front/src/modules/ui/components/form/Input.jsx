const Input = ({ className, ...props }) => {
  return (
    <input
      className={`px-4 py-2 bg-white text-dark-primary rounded-lg border-2 border-primary font-semibold focus:outline-dark-primary ${className}`}
      {...props}
    />
  );
};

export default Input;
