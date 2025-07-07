import { useEffect, useState } from "react";
import Table from "../../ui/components/table/Table";
import { useUser } from "./hooks/useUser";
import Loader from "../../ui/components/Loader";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { CardMain } from "../../ui/components/cards/CardMain";
import { useHelper } from "../../helper/hooks/useHelper";

const COLUMNS = [
  "ID",
  "USUARIO",
  "APELLIDO PATERNO", 
  "APELLIDO MATERNO", 
  "NOMBRE", 
  "ESTATUS", 
  "TIPO", 
  // "NIVELES"
];
const FIELDS = ["id", "usuario", "apellido", "nombre", "estatus", "tipo"];

const Users = () => {
  const location = useLocation()
  const { users, getUsers, loading, editNavigate } = useUser();
  const { groups, getGroups } = useHelper();
  const [usersCleaned, setUsersCleaned] = useState([]);

  useEffect(() => {
    getUsers();
    getGroups();
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
    if (users.length > 0 && groups.length > 0) {
      const cleanedUsers = users.map((user) => ({
        id: user.IdUsuario,
        username: user.Usuario,
        first_lastname: user.ApellidoPaterno,
        second_lastname: user.ApellidoMaterno,
        full_name: user.Nombre,
        status: user.Estatus,
        type: groups.find(group => String(group.id) === String(user.Tipo))?.nombre,
        // niveles: user.niveles,
      }));
      setUsersCleaned(cleanedUsers);
    }
  }, [users, groups]);

  return (
    <CardMain title="USUARIOS">
      {(loading || groups.length <= 0) ? (
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
    </CardMain>

  );
};

export default Users;
