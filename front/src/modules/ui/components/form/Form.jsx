const Form = ({ children, className = "", ...props }) => {
  return (
    <form
      method="post"
      className={`gap-y-3 gap-x-10 w-full h-auto grid ${className}`}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
