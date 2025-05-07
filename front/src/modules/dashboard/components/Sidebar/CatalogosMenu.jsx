import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const CatalogosMenu = () => {
  const [catalogosOpen, setCatalogosOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <button
        className={`flex gap-2 items-center font-semibold p-3  rounded-lg hover:bg-secondary/70 transition-all duration-200 w-full cursor-pointer hover:text-dark-primary ${
          catalogosOpen ? "bg-secondary/70 text-dark-primary" : "text-white"
        }`}
        onClick={() => setCatalogosOpen(!catalogosOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5l0-377.4c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8L0 454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5l0-370.3c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11L304 456c0 11.4 11.7 19.3 22.4 15.5z" />
        </svg>
        <span>CATALOGOS</span>
      </button>
      {catalogosOpen && (
        <ul className="ml-10 space-y-1 mt-2 p-2 bg-secondary/70 rounded-lg">
          <li
            className={`font-semibold w-full text-sm hover:text-dark-primary cursor-pointer transition-all duration-200 ${
              location.pathname === "/users"
                ? "text-dark-primary"
                : "text-white"
            }`}
          >
            <NavLink className={`flex`} to={"/users"}>
              USUARIOS
            </NavLink>
          </li>
          <li className="text-white font-semibold text-sm hover:text-dark-primary cursor-pointer transition-all duration-200">
            <NavLink className={`flex`}>TARIFAS</NavLink>
          </li>
        </ul>
      )}
    </>
  );
};

export default CatalogosMenu;
