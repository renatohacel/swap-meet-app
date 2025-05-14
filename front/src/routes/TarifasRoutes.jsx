/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import PuestosTarifas from "../modules/catalogs/tarifas/puestos/PuestosTarifas";
import TarjetasTarifas from "../modules/catalogs/tarifas/tarjetas/TarjetasTarifas";
import TarjetasTarifasForm from "../modules/catalogs/tarifas/tarjetas/components/TarjetasTarifasForm";

const TarifasRoutes = () => {
  return (
    <Routes>
      <Route path="/puestos" element={<PuestosTarifas />} />

      <Route path="/tarjetas" element={<TarjetasTarifas />} />
      <Route path="/tarjetas/add" element={<TarjetasTarifasForm />} />
      <Route path="/tarjetas/update" element={<TarjetasTarifasForm />} />

      <Route path='/*' element={<Navigate to={'/home'} />} />

    </Routes>

  );
};

export default TarifasRoutes;
