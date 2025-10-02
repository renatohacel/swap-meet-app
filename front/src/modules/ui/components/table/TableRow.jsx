import CancelButton from "../buttons/CancelButton";
import EditButton from "../buttons/EditButton";
import PrintButton from "../buttons/PrintButton";
import { ViewButton } from "../buttons/ViewButton";

const TableRow = ({
  row,
  editFunction,
  details = false,
  viewFunction = '',
  showAcciones = true,
  cancel = false,
  edit = true,
  cancelFunction,
  editText = "Editar",
  print = false,
  printFunction,
}) => {
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
          {print && <PrintButton onClick={() => printFunction(row)} />}
          {details && <ViewButton onClick={() => viewFunction(row)} />}
          {edit && <EditButton text={editText} onClick={() => editFunction(row)} />}
          {cancel && <CancelButton onClick={() => cancelFunction(row)} />}
        </td>
      }


    </tr>
  );
};

export default TableRow;
