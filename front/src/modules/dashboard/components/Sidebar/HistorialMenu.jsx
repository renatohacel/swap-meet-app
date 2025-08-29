import { NavLink, useLocation } from "react-router-dom"
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes"
import HistorialIcon from "../../../ui/components/icons/HistorialIcon"

const HistorialMenu = () => {
    const location = useLocation()
    return (
        <NavLink
            className={`
                flex items-center font-semibold p-3 rounded-lg hover:bg-secondary-complement/80 transition-all duration-200 gap-2 w-full cursor-pointer hover:text-dark-primary ${location.pathname.includes(CONSTANTS_ROUTES.HISTORIAL) ? "bg-secondary-complement/50 text-dark-primary" : "text-secondary-complement"}
            `}
            to={CONSTANTS_ROUTES.HISTORIAL}
        >
            <HistorialIcon />
            <span>HISTORIAL</span>
        </NavLink>
    )
}

export default HistorialMenu
