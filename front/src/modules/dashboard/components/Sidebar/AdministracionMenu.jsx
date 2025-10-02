import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes";
import { usePermissions } from "../../../auth/hooks/usePermissions";
import SubMenuPoint from "../../../ui/components/sidebar/SubMenuPoint";
import MenuPoint from "../../../ui/components/sidebar/MenuPoint";
import AdministracionIcon from "../../../ui/components/icons/AdministracionIcon";

const AdministracionMenu = () => {
    const location = useLocation();
    const [administracionOpen, setAdministracionOpen] = useState(location.pathname.includes(CONSTANTS_ROUTES.ADMIN.BASE)
    );
    const { can } = usePermissions();

    return (
        <>
            <MenuPoint name="ADMINISTRACIÓN" state={administracionOpen} onClickFunction={() => setAdministracionOpen(!administracionOpen)} icon={<AdministracionIcon />} />
            {administracionOpen && (
                <ul className="ml-10 space-y-3 mt-2 p-2 bg-secondary-complement/40 rounded-lg">
                    {can('admin', 'view', 'generacion_tarjetas') && (
                        <SubMenuPoint route={CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS} name="GENERACIÓN DE TARJETAS" />
                    )}

                    {can('admin', 'view', 'asignacion_tianguis') && (
                        <SubMenuPoint route={CONSTANTS_ROUTES.ADMIN.ASIGNACION_TIANGUIS} name="ASIGNACIÓN DE TIANGUIS" />
                    )}

                    {can('admin', 'view', 'recargas') && (
                        <SubMenuPoint route={CONSTANTS_ROUTES.ADMIN.RECARGAS} name="RECARGAS" />
                    )}

                    {can('admin', 'view', 'capturar_insen') && (
                        <SubMenuPoint route={CONSTANTS_ROUTES.ADMIN.CAPTURAR_INSEN} name="CAPTURAR INSEN" />
                    )}

                    {can('admin', 'create', 'boletos') && (
                        <SubMenuPoint route={CONSTANTS_ROUTES.ADMIN.BOLETOS} name="BOLETOS" />
                    )}

                    {can('admin', 'create', 'reportes_totales_dia') && (
                        <SubMenuPoint route={CONSTANTS_ROUTES.ADMIN.REPORTES.TOTALES_POR_DIA} name="REPORTE TOTALES POR DÍA" />
                    )}

                    {can('admin', 'create', 'reportes_totales_insen') && (
                        <SubMenuPoint route={CONSTANTS_ROUTES.ADMIN.REPORTES.TOTALES_POR_INSEN} name="REPORTE TOTALES POR INSEN" />
                    )}
                    {can('admin', 'create', 'reportes_totales_generales') && (
                        <SubMenuPoint route={CONSTANTS_ROUTES.ADMIN.REPORTES.TOTALES_GENERALES} name="REPORTE TOTALES GENERALES" />
                    )}
                    {can('admin', 'create', 'reportes_padron_tianguis') && (
                        <SubMenuPoint route={CONSTANTS_ROUTES.ADMIN.REPORTES.PADRON_TIANGUIS} name="REPORTE PADRÓN TIANGUIS" />
                    )}
                </ul>
            )}
        </>
    );
};

export default AdministracionMenu;
