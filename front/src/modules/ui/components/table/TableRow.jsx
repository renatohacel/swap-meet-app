import EditButton from "../buttons/EditButton";
import { ViewButton } from "../buttons/ViewButton";

const TableRow = ({ row, editFunction, details = false, viewFunction = '', showAcciones = true }) => {
  return (
    <tr className="even:bg-secondary/20 odd:bg-secondary-complement hover:bg-secondary/20 text-primary-text/70 font-semibold text-xs md:text-base">
      {Object.values(row).map((value, index) => (
        <td key={index} className="p-3" >
          {value}
        </td>
      ))}
      {
        showAcciones &&
        <td className="flex justify-center items-center gap-5 p-2">
          {details && <ViewButton onClick={() => viewFunction(row)} />}
          <EditButton onClick={() => editFunction(row)} />
        </td>
      }

    </tr>
  );
};

export default TableRow;
