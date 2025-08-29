import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes";
import { usePermissions } from "../../../auth/hooks/usePermissions";
import SubMenuPoint from "../../../ui/components/sidebar/SubMenuPoint";
import MenuPoint from "../../../ui/components/sidebar/MenuPoint";
import CatalogosIcon from "../../../ui/components/icons/CatalogosIcon";

const CatalogosMenu = () => {
  const location = useLocation();
  const { can } = usePermissions();
  const [catalogosOpen, setCatalogosOpen] = useState(
    location.pathname.includes(CONSTANTS_ROUTES.CATALOGO.BASE)
  );
  return (
    <>
      <MenuPoint name="CATÁLOGOS" state={catalogosOpen} onClickFunction={() => setCatalogosOpen(!catalogosOpen)} icon={<CatalogosIcon />} />
      {catalogosOpen && (
        <ul className="ml-10 space-y-3 mt-2 p-2 bg-secondary-complement/40 rounded-lg">

          {can('catalogs', 'view', 'users') && (
            <SubMenuPoint route={CONSTANTS_ROUTES.CATALOGO.USUARIOS} name="USUARIOS" />
          )}

          {can('catalogs', 'view', 'tarifas_puestos') && (
            <SubMenuPoint route={`${CONSTANTS_ROUTES.CATALOGO.TARIFAS.BASE}${CONSTANTS_ROUTES.CATALOGO.TARIFAS.PUESTOS}`} name="TARIFAS DE PUESTOS" />
          )}

          {can('catalogs', 'view', 'tarifas_tarjetas') && (
            <SubMenuPoint route={`${CONSTANTS_ROUTES.CATALOGO.TARIFAS.BASE}${CONSTANTS_ROUTES.CATALOGO.TARIFAS.TARJETAS}`} name="TARIFAS DE TARJETAS" />
          )}

        </ul>
      )}
    </>
  );
};

export default CatalogosMenu;
