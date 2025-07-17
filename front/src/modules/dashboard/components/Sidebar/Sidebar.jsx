/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { NavLink } from "react-router-dom";
import CatalogosMenu from "./CatalogosMenu";
import Logo from "../../../ui/components/Logo";
import AdministracionMenu from "./AdministracionMenu";
import HistorialMenu from "./HistorialMenu";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';

import { Modal } from 'antd';
import PasswordForm from "../../../catalogs/users/components/PasswordForm";
import { Toaster } from "react-hot-toast";
import { usePermissions } from "../../../auth/hooks/usePermissions";



const Sidebar = () => {
  const { handleLogout, login } = useContext(AuthContext);
  const { user } = login;
  const { can } = usePermissions();

  const [isOpen, setIsOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      setUserToEdit({
        id: user.IdUsuario,
        username: user.Usuario,
        first_lastname: user.ApellidoPaterno,
        second_lastname: user.ApellidoMaterno,
        full_name: user.Nombre,
        status: user.Estatus,
        type: user.Tipo,
        niveles: user.niveles
      })
    }
  }, [user])

  return (
    <>
      <Toaster />
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md cursor-pointer transition-all ${isOpen
          ? "hover:bg-secondary text-dark-primary hover:text-primary-text"
          : "hover:bg-primary text-primary hover:text-secondary-complement"
          }`}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 w-64 bg-primary shadow-xl`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* TITLE */}
            <NavLink
              className="flex justify-center items-center font-extrabold mb-5 mt-10 hover:bg-dark-primary/50 p-1 rounded-lg transition-all duration-200 hover:scale-103 hover:-translate-y-1 text-3xl text-center text-secondary-complement"
              to={"/home"}
            >
              <Logo />
            </NavLink>
            <hr className="mb-10 text-secondary-complement/50 border-1" />
            <ul className="space-y-2">
              {can('admin', 'view', 'generacion_tarjetas') && (
                <li>
                  <AdministracionMenu />
                </li>
              )}
              {(can('catalogs', 'view', 'users') ||
                can('catalogs', 'view', 'tarifas_puestos') ||
                can('catalogs', 'view', 'tarifas_tarjetas')) && (
                  <li>
                    <CatalogosMenu />
                  </li>
                )}
              {can('history', 'view', 'historial') && (
                <li>
                  <HistorialMenu />
                </li>
              )}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-auto">
            <hr className="mb-7 text-secondary-complement/50 border-1" />
            <div className="flex items-center justify-between p-3 bg-dark-primary/50 rounded-lg">
              <Tippy content={`✏ Actualizar contraseña`}>
                <button onClick={showModal} className="flex items-center gap-2 justify-start hover:bg-secondary/20 rounded-lg transition-all cursor-pointer px-2 py-1">
                  <div className="w-8 h-8 rounded-full bg-secondary-complement/90 flex items-center justify-center font-bold text-dark-primary uppercase">
                    {user.Usuario.split(" ")[0][0]}
                  </div>
                  <span className="text-secondary-complement font-medium uppercase">
                    {`${user.Usuario}`}
                  </span>
                </button>
              </Tippy>
              <Tippy content="Cerrar sesión">
                <button
                  className="p-2 rounded-lg hover:bg-secondary/20 text-secondary-complement cursor-pointer transition-all duration-200"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1zm10.293 9.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 1 0-1.414 1.414L14.586 9H7a1 1 0 1 0 0 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Tippy>
            </div>
          </div>
        </div>
      </aside>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        style={{ fontFamily: 'var(--font-family-primary)' }}
      // width={1000}
      >
        <PasswordForm id={userToEdit.id} handleOk={handleOk} handleCancel={handleCancel} />
      </Modal>

    </>
  );
};

export default Sidebar;
