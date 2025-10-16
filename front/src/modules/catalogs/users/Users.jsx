import { useEffect, useState } from "react";
import Table from "../../ui/components/table/Table";
import { useUser } from "./hooks/useUser";
import Loader from "../../ui/components/Loader";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { CardMain } from "../../ui/components/cards/CardMain";
import { useHelper } from "../../helper/hooks/useHelper";
import { usePermissions } from "../../auth/hooks/usePermissions";

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
const FIELDS = ["id", "username", "first_lastname", "second_lastname", "full_name", "status", "type"];

const Users = () => {
  const location = useLocation()
  const { users, getUsers, loading, editNavigate, isInitialLoad } = useUser();
  const { groups, getGroups } = useHelper();
  const [usersCleaned, setUsersCleaned] = useState([]);
  const { can } = usePermissions();

  // const canViewUsers = can('catalogs', 'view', 'users');
  const canCreateUsers = can('catalogs', 'create', 'users');
  const canUpdateUsers = can('catalogs', 'update', 'users');

  useEffect(() => {
    getUsers();
    getGroups();
  }, []);

  useEffect(() => {
    if (location.state?.toast) {
      const { type, message } = location.state.toast;
      toast[type](message, {
        position: "top-center",
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
      {((loading || groups.length <= 0) && isInitialLoad) ? (
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
          showNuevo={canCreateUsers}
          showAcciones={canUpdateUsers}
          showDateFilter={false}
        />
      )}
    </CardMain>

  );
};

export default Users;
