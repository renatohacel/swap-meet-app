import { NavLink } from "react-router-dom"

const SubMenuPoint = ({ route = "/", name = "" }) => {
    return (
        <>
            <li
                className={`font-semibold w-full text-sm hover:text-dark-primary cursor-pointer transition-all duration-200 ${location.pathname.includes(route)
                    ? "text-dark-primary"
                    : "text-white"
                    }`}
            >
                <NavLink className={`flex`} to={route}>
                    • {name}
                </NavLink>
            </li>
        </>
    )
}

export default SubMenuPoint