/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../modules/dashboard/components/Sidebar/Sidebar";
import Home from "../modules/dashboard/Home";
import AnimatedPage from "../modules/ui/components/AnimatedPage";
import UsersRoutes from "./UsersRoutes";
import TarifasRoutes from "./TarifasRoutes";
import AdminRoutes from "./AdminRoutes";

const DashboardRoutes = () => {
  const location = useLocation();
  return (
    <main className="min-h-screen bg-secondary/20">
      <Sidebar />
      <div className="py-24 px-12 lg:ml-64">
        <div className="bg-secondary-complement rounded-lg py-8 px-4 md:px-16">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

              <Route path="/" element={<Navigate to="/home" />} />

              <Route
                path="/home"
                element={
                  <AnimatedPage>
                    <Home />
                  </AnimatedPage>
                }
              />


              <Route
                path="/users/*"
                element={
                  <AnimatedPage>
                    <UsersRoutes />
                  </AnimatedPage>
                }
              />

              <Route
                path="/tarifas/*"
                element={
                  <AnimatedPage>
                    <TarifasRoutes />
                  </AnimatedPage>
                }
              />

              <Route
                path="/admin/*"
                element={
                  <AnimatedPage>
                    <AdminRoutes />
                  </AnimatedPage>
                }
              />





              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default DashboardRoutes;
