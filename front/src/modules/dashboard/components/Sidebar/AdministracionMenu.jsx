import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes";
import { usePermissions } from "../../../auth/hooks/usePermissions";

const AdministracionMenu = () => {
    const location = useLocation();
    const [administracionOpen, setAdministracionOpen] = useState(location.pathname.includes(CONSTANTS_ROUTES.ADMIN.BASE)
    );
    const { can } = usePermissions();

    return (
        <>
            <button
                className={`flex gap-2 items-center font-semibold p-3  rounded-lg hover:bg-secondary-complement/80 transition-all duration-300 w-full cursor-pointer hover:text-dark-primary ${administracionOpen ? "bg-secondary-complement/50 text-dark-primary" : "text-white"
                    }`}
                onClick={() => setAdministracionOpen(!administracionOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-5 w-5" fill="currentColor"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" /></svg>
                ADMINISTRACIÓN
            </button>
            {administracionOpen && (
                <ul className="ml-10 space-y-3 mt-2 p-2 bg-secondary-complement/40 rounded-lg">
                    {can('admin', 'view', 'generacion_tarjetas') && (
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
                    )}

                    {can('admin', 'view', 'asignacion_tianguis') && (
                        <li
                            className={`font-semibold w-full text-sm hover:text-dark-primary cursor-pointer transition-all duration-200 ${location.pathname.includes(CONSTANTS_ROUTES.ADMIN.ASIGNACION_TIANGUIS)
                                ? "text-dark-primary"
                                : "text-white"
                                }`}
                        >
                            <NavLink className={`flex`} to={CONSTANTS_ROUTES.ADMIN.ASIGNACION_TIANGUIS}>
                                ASIGNACIÓN DE TIANGUIS
                            </NavLink>
                        </li>
                    )}

                    {can('admin', 'view', 'recargas') && (
                        <li
                            className={`font-semibold w-full text-sm hover:text-dark-primary cursor-pointer transition-all duration-200 ${location.pathname.includes(CONSTANTS_ROUTES.ADMIN.RECARGAS)
                                ? "text-dark-primary"
                                : "text-white"
                                }`}
                        >
                            <NavLink className={`flex`} to={CONSTANTS_ROUTES.ADMIN.RECARGAS}>
                                RECARGAS
                            </NavLink>
                        </li>
                    )}
                </ul>
            )}
        </>
    );
};

export default AdministracionMenu;
