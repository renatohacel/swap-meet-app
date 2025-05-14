const SectionForm = ({ children, className = "" }) => {
  return (
    <section
      className={`flex flex-col mb-4 text-primary has-[input:focus]:text-dark-primary has-[select:focus]:text-dark-primary ${className}`}
    >
      {children}
    </section>
  );
};

export default SectionForm;
