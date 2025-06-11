/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import Users from "../modules/catalogs/users/Users";
import UsersForm from "../modules/catalogs/users/components/UsersForm";
import { CONSTANTS_ROUTES } from "../utils/constansRoutes";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/add" element={<UsersForm />} />
      <Route path="/update" element={<UsersForm />} />
      <Route path='/*' element={<Navigate to={`${CONSTANTS_ROUTES.CATALOGO.USUARIOS}`} />} />
    </Routes>
  );
};

export default UsersRoutes;
