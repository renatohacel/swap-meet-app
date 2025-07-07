/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import PuestosTarifas from "../modules/catalogs/tarifas/puestos/PuestosTarifas";
import TarjetasTarifas from "../modules/catalogs/tarifas/tarjetas/TarjetasTarifas";
import TarjetasTarifasForm from "../modules/catalogs/tarifas/tarjetas/components/TarjetasTarifasForm";
import { CONSTANTS_ROUTES } from "../utils/constansRoutes";
import ProtectedRoute from "./ProtectedRoute";

const TarifasRoutes = () => {
  return (
    <Routes>

      {/* TARIFAS DE PUESTOS */}

      <Route path={CONSTANTS_ROUTES.CATALOGO.TARIFAS.PUESTOS} element={
        <ProtectedRoute module={'catalogs'} action={'view'} resource={'tarifas_puestos'}>
          <PuestosTarifas />
        </ProtectedRoute>
      } />

      {/* TARIFAS DE TARJETAS */}

      <Route path={CONSTANTS_ROUTES.CATALOGO.TARIFAS.TARJETAS} element={
        <ProtectedRoute module={'catalogs'} action={'view'} resource={'tarifas_tarjetas'}>
          <TarjetasTarifas />
        </ProtectedRoute>
      } />
      <Route path={`${CONSTANTS_ROUTES.CATALOGO.TARIFAS.TARJETAS}/add`} element={
        <ProtectedRoute module={'catalogs'} action={'create'} resource={'tarifas_tarjetas'}>
          <TarjetasTarifasForm />
        </ProtectedRoute>
      } />
      <Route path={`${CONSTANTS_ROUTES.CATALOGO.TARIFAS.TARJETAS}/update`} element={
        <ProtectedRoute module={'catalogs'} action={'update'} resource={'tarifas_tarjetas'}>
          <TarjetasTarifasForm />
        </ProtectedRoute>
      } />

      <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.HOME} />} />

    </Routes>

  );
};

export default TarifasRoutes;
