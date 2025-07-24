/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../modules/dashboard/components/Sidebar/Sidebar";
import Home from "../modules/dashboard/Home";
import AnimatedPage from "../modules/ui/components/AnimatedPage";
import UsersRoutes from "./UsersRoutes";
import TarifasRoutes from "./TarifasRoutes";
import LotesRoutes from "./LotesRoutes";
import { CONSTANTS_ROUTES } from "../utils/constansRoutes";
import Historial from "../modules/historial/Historial";
import ProtectedRoute from "./ProtectedRoute";
import AsignaTianguisRoutes from "./AsignaTianguisRoutes";
import RecargasRouter from "./RecargasRouter";

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
                    <RecargasRouter />
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
