/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import Users from "../../modules/catalogs/users/Users";
import UsersForm from "../../modules/catalogs/users/components/UsersForm";
import { CONSTANTS_ROUTES } from "../../utils/constansRoutes";
import ProtectedRoute from "../ProtectedRoute";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute module={'catalogs'} action={'view'} resource={'users'}>
          <Users />
        </ProtectedRoute>
      } />
      <Route path="/add" element={
        <ProtectedRoute module={'catalogs'} action={'create'} resource={'users'}>
          <UsersForm />
        </ProtectedRoute>
      } />
      <Route path="/update" element={
        <ProtectedRoute module={'catalogs'} action={'update'} resource={'users'}>
          <UsersForm />
        </ProtectedRoute>
      } />
      <Route path='/*' element={<Navigate to={`${CONSTANTS_ROUTES.CATALOGO.USUARIOS}`} />} />
    </Routes>
  );
};

export default UsersRoutes;
