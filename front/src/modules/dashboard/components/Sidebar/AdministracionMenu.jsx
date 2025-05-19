import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const AdministracionMenu = () => {
    const location = useLocation();
    const [administracionOpen, setAdministracionOpen] = useState(
        location.pathname.includes("/admin") || location.pathname.includes("/admin/generacion-tarjetas")
    );
    return (
        <>
            <button
                className={`flex gap-2 items-center font-semibold p-3  rounded-lg hover:bg-secondary/70 transition-all duration-200 w-full cursor-pointer hover:text-dark-primary ${administracionOpen ? "bg-secondary/70 text-dark-primary" : "text-white"
                    }`}
                onClick={() => setAdministracionOpen(!administracionOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5"
                    fill="currentColor"><path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" /></svg>
                ADMINISTRACIÓN
            </button>
            {administracionOpen && (
                <ul className="ml-10 space-y-1 mt-2 p-2 bg-secondary/70 rounded-lg">
                    <li
                        className={`font-semibold w-full text-sm hover:text-dark-primary cursor-pointer transition-all duration-200 ${location.pathname.includes("/admin/generacion-tarjetas")
                            ? "text-dark-primary"
                            : "text-white"
                            }`}
                    >
                        <NavLink className={`flex`} to={"/admin/generacion-tarjetas"}>
                            GENERACIÓN DE TARJETAS
                        </NavLink>
                    </li>
                </ul>
            )}
        </>
    );
};

export default AdministracionMenu;
