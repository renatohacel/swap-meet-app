import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { NavLink } from "react-router-dom";
import CatalogosMenu from "./CatalogosMenu";

const Sidebar = () => {
  const { handleLogout, login } = useContext(AuthContext);
  const { user } = login;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-secondary-complement hover:bg-secondary cursor-pointer"
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
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 bg-primary shadow-xl`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* TITLE */}
            <NavLink
              className="flex justify-center items-center font-extrabold mb-5 mt-10 hover:bg-secondary/70 p-1 rounded-lg transition-all duration-200 hover:scale-103 hover:-translate-y-1"
              to={"/home"}
            >
              <span className="text-3xl text-center text-secondary-complement">
                TIANGUIS
              </span>
            </NavLink>
            <hr className="mb-10 text-secondary-complement/50 border-1" />
            <ul className="space-y-2">
              <li>
                <button className="flex items-center font-semibold p-3 text-secondary-complement rounded-lg hover:bg-secondary/70 transition-all duration-200 gap-2 w-full cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-5 w-5 text-secondary-complement"
                    fill="currentColor"
                  >
                    <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z" />
                  </svg>
                  <span>ADMINISTRACIÓN</span>
                </button>
              </li>
              <li>
                <CatalogosMenu />
              </li>
              <li>
                <button className="flex items-center font-semibold p-3 text-secondary-complement rounded-lg hover:bg-secondary/70 transition-all duration-200 gap-2 w-full cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-5 w-5 text-secondary-complement"
                    fill="currentColor"
                  >
                    <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z" />
                  </svg>
                  <span>HISTORIAL</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-auto">
            <hr className="mb-7 text-secondary-complement/50 border-1" />
            <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-dark-primary">
                  {user.Nombre.split(" ")[0][0]}
                </div>
                <span className="text-secondary-complement font-medium">
                  {user.Nombre.split(" ")[0]}
                </span>
              </div>
              <button
                className="p-2 rounded-lg hover:bg-secondary/70 text-secondary-complement cursor-pointer transition-all duration-200"
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
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
