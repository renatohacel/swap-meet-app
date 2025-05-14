/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import PuestosTarifas from "../modules/catalogs/tarifas/puestos/PuestosTarifas";
import TarjetasTarifas from "../modules/catalogs/tarifas/tarjetas/TarjetasTarifas";

const TarifasRoutes = () => {
  return (
    <Routes>
      <Route path="/puestos" element={<PuestosTarifas />} />

      <Route path="/tarjetas" element={<TarjetasTarifas />} />

    </Routes>

  );
};

export default TarifasRoutes;
