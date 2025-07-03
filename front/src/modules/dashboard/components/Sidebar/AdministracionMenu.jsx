import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes";

const AdministracionMenu = () => {
    const location = useLocation();
    const [administracionOpen, setAdministracionOpen] = useState(location.pathname.includes(CONSTANTS_ROUTES.ADMIN.BASE)
    );
    return (
        <>
            <button
                className={`flex gap-2 items-center font-semibold p-3  rounded-lg hover:bg-secondary-complement/80 transition-all duration-300 w-full cursor-pointer hover:text-dark-primary ${administracionOpen ? "bg-secondary-complement/50 text-dark-primary" : "text-white"
                    }`}
                onClick={() => setAdministracionOpen(!administracionOpen)}
            >
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5"
                    fill="currentColor"><path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" /></svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-5 w-5" fill="currentColor"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" /></svg>
                ADMINISTRACIÓN
            </button>
            {administracionOpen && (
                <ul className="ml-10 space-y-1 mt-2 p-2 bg-secondary-complement/40 rounded-lg">
                    <li
                        className={`font-semibold w-full text-sm hover:text-dark-primary cursor-pointer transition-all duration-200 ${location.pathname.includes(CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS)
                            ? "text-dark-primary"
                            : "text-white"
                            }`}
                    >
                        <NavLink className={`flex`} to={CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS}>
                            GENERACIÓN DE TARJETAS
                        </NavLink>
                    </li>
                </ul>
            )}
        </>
    );
};

export default AdministracionMenu;
