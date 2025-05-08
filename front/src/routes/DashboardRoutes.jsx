import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../modules/dashboard/components/Sidebar/Sidebar";
import Home from "../modules/dashboard/Home";
import Users from "../modules/catalogs/users/Users";

const DashboardRoutes = () => {
  return (
    <main className="min-h-screen bg-secondary/20">
      <Sidebar />
      <div className="py-24 px-12 lg:ml-64">
        <div className="bg-secondary-complement rounded-lg py-8 px-16">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />

            {/* POSIBILEMENTE PROTEGIDA */}
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};

export default DashboardRoutes;
