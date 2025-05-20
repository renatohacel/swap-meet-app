/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import PuestosTarifas from "../modules/catalogs/tarifas/puestos/PuestosTarifas";
import TarjetasTarifas from "../modules/catalogs/tarifas/tarjetas/TarjetasTarifas";
import TarjetasTarifasForm from "../modules/catalogs/tarifas/tarjetas/components/TarjetasTarifasForm";
import { CONSTANTS_ROUTES } from "../utils/constansRoutes";

const TarifasRoutes = () => {
  return (
    <Routes>
      <Route path={CONSTANTS_ROUTES.CATALOGO.TARIFAS.PUESTOS} element={<PuestosTarifas />} />

      <Route path={CONSTANTS_ROUTES.CATALOGO.TARIFAS.TARJETAS} element={<TarjetasTarifas />} />
      <Route path={`${CONSTANTS_ROUTES.CATALOGO.TARIFAS.TARJETAS}/add`} element={<TarjetasTarifasForm />} />
      <Route path={`${CONSTANTS_ROUTES.CATALOGO.TARIFAS.TARJETAS}/update`} element={<TarjetasTarifasForm />} />

      <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.HOME} />} />

    </Routes>

  );
};

export default TarifasRoutes;
