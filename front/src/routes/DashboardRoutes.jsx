/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../modules/dashboard/components/Sidebar/Sidebar";
import Home from "../modules/dashboard/Home";
import AnimatedPage from "../modules/ui/components/AnimatedPage";
import UsersRoutes from "./catalogos/UsersRoutes";
import TarifasRoutes from "./catalogos/TarifasRoutes";
import LotesRoutes from "./administracion/LotesRoutes";
import { CONSTANTS_ROUTES } from "../utils/constansRoutes";
import Historial from "../modules/historial/Historial";
import ProtectedRoute from "./ProtectedRoute";
import AsignaTianguisRoutes from "./administracion/AsignaTianguisRoutes";
import CapturarInsenRoutes from "./administracion/CapturarInsenRoutes";
import RecargasRoutes from "./administracion/RecargasRoutes";
import BoletosRoutes from "./administracion/BoletosRoutes";
import ReportesRoutes from "./administracion/ReporteTotalesPorDiaRoutes";
import ReporteTotalesPorDiaRoutes from "./administracion/ReporteTotalesPorDiaRoutes";
import ReporteTotalesPorInsenRoutes from "./administracion/ReporteTotalesPorInsenRoutes";
import ReporteTotalesGeneralesRoutes from "./administracion/ReporteTotalesGeneralesRoutes";

const DashboardRoutes = () => {
  const location = useLocation();
  return (
    <main className="min-h-screen">
      <Sidebar />
      <div className="py-24 px-12 lg:ml-64">
        <div className="bg-secondary-complement/40 rounded-lg py-8 px-4 md:px-16 shadow-md">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

              <Route path="/" element={<Navigate to={CONSTANTS_ROUTES.HOME} />} />
              {/* HOME */}
              <Route
                path={CONSTANTS_ROUTES.HOME}
                element={
                  <AnimatedPage>
                    <Home />
                  </AnimatedPage>
                }
              />

              {/* CATALOGO */}
              <Route
                path={`${CONSTANTS_ROUTES.CATALOGO.USUARIOS}/*`}
                element={
                  <AnimatedPage>
                    <UsersRoutes />
                  </AnimatedPage>
                }
              />

              <Route
                path={`${CONSTANTS_ROUTES.CATALOGO.TARIFAS.BASE}/*`}
                element={
                  <AnimatedPage>
                    <TarifasRoutes />
                  </AnimatedPage>
                }
              />
              {/* FIN DE CATALOGO */}

              {/* ADMINISTRACIÓN */}
              <Route
                path={`${CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS}/*`}
                element={
                  <AnimatedPage>
                    <LotesRoutes />
                  </AnimatedPage>

                }
              />

              <Route
                path={`${CONSTANTS_ROUTES.ADMIN.ASIGNACION_TIANGUIS}/*`}
                element={
                  <AnimatedPage>
                    <AsignaTianguisRoutes />
                  </AnimatedPage>
                }
              />

              <Route
                path={`${CONSTANTS_ROUTES.ADMIN.RECARGAS}/*`}
                element={
                  <AnimatedPage>
                    <RecargasRoutes />
                  </AnimatedPage>
                }
              />

              <Route
                path={`${CONSTANTS_ROUTES.ADMIN.CAPTURAR_INSEN}/*`}
                element={
                  <AnimatedPage>
                    <CapturarInsenRoutes />
                  </AnimatedPage>
                }
              />

              <Route
                path={`${CONSTANTS_ROUTES.ADMIN.BOLETOS}/*`}
                element={
                  <AnimatedPage>
                    <BoletosRoutes />
                  </AnimatedPage>
                }
              />

              <Route
                path={`${CONSTANTS_ROUTES.ADMIN.REPORTES.TOTALES_POR_DIA}/*`}
                element={
                  <AnimatedPage>
                    <ReporteTotalesPorDiaRoutes />
                  </AnimatedPage>
                }
              />

              <Route
                path={`${CONSTANTS_ROUTES.ADMIN.REPORTES.TOTALES_POR_INSEN}/*`}
                element={
                  <AnimatedPage>
                    <ReporteTotalesPorInsenRoutes />
                  </AnimatedPage>
                }
              />

              <Route
                path={`${CONSTANTS_ROUTES.ADMIN.REPORTES.TOTALES_GENERALES}/*`}
                element={
                  <AnimatedPage>
                    <ReporteTotalesGeneralesRoutes />
                  </AnimatedPage>
                }
              />

              {/* FIN DE ADMINISTRACIÓN */}

              {/* HISTORIAL */}

              <Route
                path={`${CONSTANTS_ROUTES.HISTORIAL}/`}
                element={
                  <ProtectedRoute module={'history'} action={'view'} resource={'historial'}>
                    <AnimatedPage>
                      <Historial />
                    </AnimatedPage>
                  </ProtectedRoute>
                }
              />

              {/* FIN DE HISTORIAL */}

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default DashboardRoutes;
