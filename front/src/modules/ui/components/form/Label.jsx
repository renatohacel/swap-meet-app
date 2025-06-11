const Label = ({ children, className, ...props }) => {
  return (
    <label className={`mb-2 font-semibold ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
