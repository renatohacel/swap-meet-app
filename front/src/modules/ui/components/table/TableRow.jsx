import EditButton from "../buttons/EditButton";

const TableRow = ({ row, editFunction }) => {
  return (
    <tr className="even:bg-secondary/20 odd:bg-secondary-complement hover:bg-secondary/20 text-primary-text/70 font-semibold text-xs md:text-base">
      {Object.values(row).map((value, index) => (
        <td key={index}>
          {value}
        </td>
      ))}
      <td className="flex justify-center items-center gap-3 p-2">
        <EditButton onClick={() => editFunction(row)} />
      </td>
    </tr>
  );
};

export default TableRow;
