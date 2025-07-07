
const SaveButton = ({ className, isSubmit = false, ...props }) => {
    return (
        <button
            {...props}
            type="submit"
            disabled={isSubmit}
            className={`
                ${className}
                ${isSubmit ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                border-2
                border-primary 
                bg-primary
                text-secondary-complement 
                items-center 
                text-center 
                rounded-lg 
                hover:outline-none
                font-semibold 
                px-4 py-2 
                hover:bg-dark-primary
                hover:border-dark-primary 
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