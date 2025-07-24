import { useState } from "react";
import TableRow from "./TableRow";
import { useFilter } from "../../hooks/useFilter";
import { NavLink } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker;

const Table = ({
  columns,
  data,
  filterFields,
  addLink,
  editFunction,
  details = false,
  viewFunction = '',
  showNuevo = true,
  showAcciones = true,
  cancel = false,
  cancelFunction,
  edit = true,
  editText = "Editar",
  showDateFilter = true,
  dateFilterName = 'fecha',
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const rowsPerPage = 10; // Número de filas por página

  // Hook de filtro: Aplica el filtro a todos los datos
  const { filteredData } = useFilter(
    data,
    searchInput,
    filterFields,
    dateRange,
    dateFilterName
  );

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
    setDateRange([null, null]); // <-- Reinicia el rango de fechas
    setCurrentPage(1); // Reinicia a la primera página al buscar
  };

  // Exportar a Excel
  const handleExportExcel = () => {
    // Solo exporta los datos filtrados y visibles
    const exportData = filteredData.map(row => {
      // Solo exporta las columnas visibles (no acciones)
      const obj = {};
      columns.forEach((col, idx) => {
        // Usa el nombre del campo de filterFields si existe, si no, usa el nombre de la columna
        const key = filterFields?.[idx] || col;
        obj[col] = row[key] ?? row[col] ?? "";
      });
      return obj;
    });
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "data.xlsx");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between justify-center items-center mb-10 gap-3">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            name="search"
            placeholder="Buscar"
            className="rounded-lg p-2 border-2 border-primary/50 text-primary font-semibold h-full w-32 md:w-auto overflow-x-auto text-sm md:text-base focus:border-dark-primary focus:text-dark-primary transition-all"
            value={searchInput}
            onChange={handleSearchChange} // Cambia aquí para reiniciar la página al buscar
          />

          {showDateFilter && (
            <RangePicker
              name={dateFilterName}
              value={dateRange}
              onChange={(dates) => {
                setDateRange(dates || [null, null]);
                setCurrentPage(1);
              }}
              placeholder={["Fecha inicio", "Fecha fin"]}
              style={{
                borderRadius: "0.5rem",
                padding: "0.5rem",
                border: "2px solid rgba(111, 73, 189, 0.5)",
                color: "var(--color-dark-primary)",
                fontWeight: "600",
                height: "2.5rem",
                minWidth: "8rem",
                fontSize: "0.875rem",
                transition: "all 0.2s",
                background: "transparent",
                fontFamily: 'var(--font-primary)'
              }}
              allowClear
            />
          )}

          <Tippy content="Exportar a Excel">
            <button
              type="button"
              onClick={handleExportExcel}
              className="
              flex 
              items-center
               gap-1 
               px-3 
               py-2 
               rounded-lg 
               border-2 
               border-green-700/50
               text-green-700/50 
               font-semibold 
               text-xs 
               md:text-base 
               transition-all 
               cursor-pointer
               hover:bg-green-700
               hover:border-green-700
               hover:text-white
               hover:outline-none
              "
            >

              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M 14 3 L 2 5 L 2 19 L 14 21 L 14 19 L 21 19 C 21.552 19 22 18.552 22 18 L 22 6 C 22 5.448 21.552 5 21 5 L 14 5 L 14 3 z M 12 5.3613281 L 12 18.638672 L 4 17.306641 L 4 6.6933594 L 12 5.3613281 z M 14 7 L 16 7 L 16 9 L 14 9 L 14 7 z M 18 7 L 20 7 L 20 9 L 18 9 L 18 7 z M 5.1757812 8.296875 L 7.0605469 11.994141 L 5 15.703125 L 6.7363281 15.703125 L 7.859375 13.308594 C 7.934375 13.079594 7.9847656 12.908922 8.0097656 12.794922 L 8.0253906 12.794922 C 8.0663906 13.032922 8.1162031 13.202109 8.1582031 13.287109 L 9.2714844 15.701172 L 11 15.701172 L 9.0058594 11.966797 L 10.943359 8.296875 L 9.3222656 8.296875 L 8.2929688 10.494141 C 8.1929688 10.779141 8.1257969 10.998625 8.0917969 11.140625 L 8.0664062 11.140625 C 8.0084063 10.902625 7.9509531 10.692719 7.8769531 10.511719 L 6.953125 8.296875 L 5.1757812 8.296875 z M 14 11 L 16 11 L 16 13 L 14 13 L 14 11 z M 18 11 L 20 11 L 20 13 L 18 13 L 18 11 z M 14 15 L 16 15 L 16 17 L 14 17 L 14 15 z M 18 15 L 20 15 L 20 17 L 18 17 L 18 15 z"></path>
              </svg>
            </button>
          </Tippy>
        </div>

        {showNuevo && <NavLink
          className="items-center flex gap-1 px-4 py-2 rounded-md text-secondary-complement bg-primary hover:outline-none font-semibold cursor-pointer h-full hover:bg-dark-primary transition-all text-sm border-2 border-primary hover:border-dark-primary"
          to={addLink}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>{" "}
          NUEVO
        </NavLink>}
      </div>

      <div className="overflow-x-auto w-full rounded-lg">
        <table className="w-full text-center border-collapse rounded-lg overflow-hidden text-nowrap">
          <thead>
            <tr>
              {columns.map((column, id) => (
                <th
                  key={id}
                  className="p-2 hover:bg-dark-primary bg-primary text-secondary-complement text-sm md:text-base divide-x divide-secondary transition-all"
                >
                  {column}
                </th>
              ))}
              {
                showAcciones &&
                <th className="p-2 hover:bg-dark-primary bg-primary text-secondary-complement text-sm md:text-base divide-x divide-secondary">
                  ACCIONES
                </th>
              }
            </tr>
          </thead>
          <tbody className="bg-secondary-complement">
            {filteredData.length > 0 ? (
              currentData.map((row, index) => (
                <TableRow key={index} row={row} editFunction={editFunction} details={details} viewFunction={viewFunction} showAcciones={showAcciones} cancel={cancel} edit={edit} cancelFunction={cancelFunction} editText={editText} />
              ))
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
      <div className="flex justify-center items-center mt-4 gap-2 overflow-x-auto">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="md:px-3 px-1 py-1 bg-primary text-secondary-complement rounded-md hover:bg-dark-primary disabled:opacity-50 cursor-pointer text-xs md:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="h-4 w-4 md:h-6 md:w-5"
          >
            <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM116.7 244.7l112-112c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8l0 64 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 64c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5l-112-112c-6.2-6.2-6.2-16.4 0-22.6z" />
          </svg>
        </button>
        {totalPages <= 5 ? (
          Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`md:px-3 sm:px-2 px-[6px] py-1 rounded-md cursor-pointer text-xs md:text-base font-semibold ${currentPage === i + 1
                ? "bg-dark-primary text-secondary-complement"
                : "bg-primary text-secondary-complement hover:bg-dark-primary"
                }`}
            >
              {i + 1}
            </button>
          ))
        ) : (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`md:px-3 sm:px-2 px-[6px] py-1 rounded-md cursor-pointer text-xs md:text-base font-semibold ${currentPage === 1
                ? "bg-dark-primary text-secondary-complement"
                : "bg-primary text-secondary-complement hover:bg-dark-primary"
                }`}
            >
              1
            </button>
            {/* Siempre muestra ... después de la primera si no está cerca */}
            {currentPage > 1 && <span className="px-2 text-primary font-extrabold">...</span>}
            {/* Siempre muestra dos páginas antes y después del currentPage si es posible */}
            {Array.from({ length: 3 }, (_, idx) => {
              const page = currentPage - 1 + idx;
              if (page > 1 && page < totalPages) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`md:px-3 sm:px-2 px-[6px] py-1 rounded-md cursor-pointer text-xs md:text-base font-semibold ${currentPage === page
                      ? "bg-dark-primary text-secondary-complement"
                      : "bg-primary text-secondary-complement hover:bg-dark-primary"
                      }`}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}
            {/* Siempre muestra ... antes de la última si no está cerca */}
            {currentPage < totalPages && <span className="px-2 text-primary font-extrabold">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`md:px-3 sm:px-2 px-[6px] py-1 rounded-md cursor-pointer text-xs md:text-base font-semibold ${currentPage === totalPages
                ? "bg-dark-primary text-secondary-complement"
                : "bg-primary text-secondary-complement hover:bg-dark-primary"
                }`}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="md:px-3 px-1 py-1 bg-primary cursor-pointer text-secondary-complement rounded-md hover:bg-dark-primary disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="h-4 w-4 md:h-6 md:w-5"
          >
            <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm395.3 11.3l-112 112c-4.6 4.6-11.5 5.9-17.4-3.5s-9.9-8.3-9.9-14.8l0-64-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-64c0-6.5 3.9-12.3 9.9-14.8s12.9-1.1 17.4 3.5l112 112c6.2-6.2 6.2-16.4 0-22.6z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Table;
