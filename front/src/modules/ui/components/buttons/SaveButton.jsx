
const SaveButton = ({ className, ...props }) => {
    return (
        <button
            {...props}
            type="submit"
            className={`
                ${className} 
                outline-2 
                outline-primary 
                text-primary 
                items-center 
                text-center 
                rounded-lg 
                hover:outline-none 
                hover:text-secondary-complement 
                font-semibold 
                cursor-pointer 
                px-4 py-2 
                hover:bg-dark-primary 
                transition-all 
                text-sm 
                focus:outline-dark-primary
            `}
        >
            GUARDAR
        </button>
    )
}

export default SaveButton