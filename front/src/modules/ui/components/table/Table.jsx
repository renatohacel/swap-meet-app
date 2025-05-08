import { useState } from "react";
import TableRow from "./TableRow";
import { useFilter } from "../../hooks/useFilter";

const Table = ({ columns, data, filterFields }) => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Número de filas por página

  // Hook de filtro: Aplica el filtro a todos los datos
  const { filteredData } = useFilter(data, searchInput, filterFields);

  // Calcular datos para la página actual
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Cambiar de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reiniciar la página actual al buscar
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página al buscar
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <input
          type="text"
          name="search"
          placeholder="Buscar"
          className="rounded-md p-2 outline-2 outline-secondary/100 text-primary font-semibold h-full"
          value={searchInput}
          onChange={handleSearchChange} // Cambia aquí para reiniciar la página al buscar
        />
        <button className="bg-primary p-2 rounded-md text-secondary-complement font-semibold cursor-pointer h-full hover:bg-dark-primary transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto w-full rounded-lg">
        <table className="w-full text-center border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr>
              {columns.map((column, id) => (
                <th
                  key={id}
                  className="p-2 hover:bg-dark-primary bg-primary text-secondary-complement text-xl divide-x divide-secondary transition-all"
                >
                  {column}
                </th>
              ))}
              <th className="p-2 hover:bg-dark-primary bg-primary text-secondary-complement text-xl divide-x divide-secondary">
                ACCIONES
              </th>
            </tr>
          </thead>
          <tbody className="bg-secondary-complement">
            {filteredData.length > 0 ? (
              currentData.map((row, index) => <TableRow key={index} row={row} />)
            ) : (
              // Mostrar "NO HAY REGISTROS" si no hay datos filtrados
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="p-4 hover:bg-secondary/20 text-primary-text/70 font-semibold"
                >
                  NO HAY REGISTROS
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-primary text-secondary-complement rounded-md hover:bg-dark-primary disabled:opacity-50 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="h-6 w-5"
          >
            <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM116.7 244.7l112-112c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8l0 64 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 64c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5l-112-112c-6.2-6.2-6.2-16.4 0-22.6z" />
          </svg>
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded-md cursor-pointer ${
              currentPage === i + 1
                ? "bg-dark-primary text-secondary-complement"
                : "bg-primary text-secondary-complement hover:bg-dark-primary"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-primary cursor-pointer text-secondary-complement rounded-md hover:bg-dark-primary disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="h-6 w-5"
          >
            <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm395.3 11.3l-112 112c-4.6 4.6-11.5 5.9-17.4-3.5s-9.9-8.3-9.9-14.8l0-64-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-64c0-6.5 3.9-12.3 9.9-14.8s12.9-1.1 17.4 3.5l112 112c6.2-6.2 6.2-16.4 0-22.6z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Table;
