import { useEffect, useState } from "react";
import Table from "../../ui/components/table/Table";
import { useUser } from "./hooks/useUser";

const COLUMNS = ["ID", "USUARIO", "APELLIDO", "NOMBRE", "ESTATUS", "TIPO"];
const FIELDS = ["id", "usuario", "apellido", "nombre", "estatus", "tipo"];

const Users = () => {
  const { users, getUsers, loading } = useUser();
  const [usersCleaned, setUsersCleaned] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const cleanedUsers = users.map((user) => ({
        id: user.IdUsuario,
        usuario: user.Usuario,
        apellido: `${user.ApellidoPaterno} ${user.ApellidoMaterno}`,
        nombre: user.Nombre,
        estatus: user.Estatus,
        tipo: user.Tipo,
      }));
      setUsersCleaned(cleanedUsers);
    }
  }, [users]);

  return (
    <>
      <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">
        USUARIOS
      </h1>
      <hr className="mb-12 text-primary/60 border-1" />

      <Table
        columns={COLUMNS}
        data={usersCleaned}
        getFunction={getUsers}
        loading={loading}
        filterFields={FIELDS}
      />
    </>
  );
};

export default Users;
