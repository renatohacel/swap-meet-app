/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import Users from "../modules/catalogs/users/Users";
import UsersForm from "../modules/catalogs/users/components/UsersForm";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/add" element={<UsersForm />} />
      <Route path="/update" element={<UsersForm />} />
      <Route path='/*' element={<Navigate to={'/users'} />} />
    </Routes>
  );
};

export default UsersRoutes;
