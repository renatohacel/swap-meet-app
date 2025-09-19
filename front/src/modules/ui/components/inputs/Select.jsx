
const Select = ({ options = [], className, ...props }) => {
    return (
        <select
            className={`
                    p-2 
                    bg-white 
                    focus:text-dark-primary 
                    rounded-lg 
                    outline-2 
                    outline-primary 
                    font-semibold 
                    focus:outline-dark-primary 
                    ${className}
                `}
            {...props}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value} className="font-semibold">
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default Select