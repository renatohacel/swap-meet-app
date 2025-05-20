import { useEffect, useState } from "react";
import Table from "../../ui/components/table/Table";
import { useUser } from "./hooks/useUser";
import Loader from "../../ui/components/Loader";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const COLUMNS = ["ID", "USUARIO", "APELLIDO PATERNO", "APELLIDO MATERNO", "NOMBRE", "ESTATUS", "TIPO"];
const FIELDS = ["id", "usuario", "apellido", "nombre", "estatus", "tipo"];

const Users = () => {
  const location = useLocation()
  const { users, getUsers, loading, editNavigate } = useUser();
  const [usersCleaned, setUsersCleaned] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (location.state?.toast) {
      const { type, message } = location.state.toast;
      toast[type](message, {
        position: "top-right",
        duration: 1500,
      });

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (users.length > 0) {
      const cleanedUsers = users.map((user) => ({
        id: user.IdUsuario,
        username: user.Usuario,
        first_lastname: user.ApellidoPaterno,
        second_lastname: user.ApellidoMaterno,
        full_name: user.Nombre,
        status: user.Estatus,
        type: user.Tipo,
      }));
      setUsersCleaned(cleanedUsers);
    }
  }, [users]);

  return (
    <section>
      <Toaster />
      <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">
        USUARIOS
      </h1>
      <hr className="mb-12 text-primary/30 border-1" />

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="w-32 opacity-60 text-primary" />
        </div>
      ) : (
        <Table
          columns={COLUMNS}
          data={usersCleaned}
          filterFields={FIELDS}
          addLink={"add"}
          editFunction={editNavigate}
        />
      )}
    </section>
  );
};

export default Users;
