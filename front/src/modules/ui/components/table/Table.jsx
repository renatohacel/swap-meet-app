import { useState } from "react";
import TableRow from "./TableRow";
import { useFilter } from "../../hooks/useFilter";

const Table = ({ columns, data, loading, filterFields }) => {
  const [searchInput, setSearchInput] = useState("");

  // Hook de filtro
  const { filteredData } = useFilter(data, searchInput, filterFields);

  // console.log(filteredData);

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <input
          type="text"
          name="search"
          placeholder="Buscar"
          className="rounded-md p-2 outline-2 outline-secondary/100 text-primary font-semibold h-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
          <thead className="bg-primary text-secondary-complement text-xl divide-x divide-secondary">
            <tr>
              {columns.map((column, id) => (
                <th key={id} className="p-2">
                  {column}
                </th>
              ))}
              <th className="p-2">
                ACCIONES
              </th>
            </tr>
          </thead>
          <tbody className="bg-secondary-complement">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="p-4">
                  Cargando...
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <TableRow key={index} row={row} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
