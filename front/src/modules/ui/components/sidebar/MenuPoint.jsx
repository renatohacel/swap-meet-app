
const MenuPoint = ({ name = "", state = false, onClickFunction = () => { }, icon = <></> }) => {
    return (
        <button
            className={`flex gap-2 items-center font-semibold p-3  rounded-lg hover:bg-secondary-complement/80 transition-all duration-300 w-full cursor-pointer hover:text-dark-primary ${state ? "bg-secondary-complement/50 text-dark-primary" : "text-white"
                }`}
            onClick={onClickFunction}
        >
            {icon}
            {name}
        </button>
    )
}

export default MenuPoint