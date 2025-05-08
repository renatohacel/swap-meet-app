const TableRow = ({ row }) => {
  return (
    <tr className="even:bg-secondary/20 odd:bg-secondary-complement hover:bg-secondary/20 text-primary-text/70 font-semibold">
      {Object.values(row).map((value, id) => (
        <td key={id} className="p-2">
          {value}
        </td>
      ))}
      {/* ACCIONES */}
      <td></td>
    </tr>
  );
};

export default TableRow;
