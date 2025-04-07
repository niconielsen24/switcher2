export default function TableRows(/*props: TableRowsProps*/) {
  return (
    <>
      <tr className="bg-gradient-to-t from-gray-300 to-gray-100 shadow-md">
        <td className="p-3 border-r-1 border-l-2">Battle Arena</td>
        <td className="p-3 border-r-1 border-l-1">3</td>
        <td className="p-3 border-r-1 border-l-1">Yes</td>
        <td className="p-3 border-r-1 border-l-1">Active</td>
        <td className="p-3 border-r-1 border-l-1">4</td>
        <td className="p-3 border-r-2 border-l-1 hover:bg-lime-300 hover:cursor-pointer transition duration-300">
          join
        </td>
      </tr>
      <tr className="bg-gradient-to-t from-gray-300 to-gray-100 shadow-md rounded-md">
        <td className="p-3 border-r-1 border-l-2">Battle Arena</td>
        <td className="p-3 border-r-1 border-l-1">3</td>
        <td className="p-3 border-r-1 border-l-1">Yes</td>
        <td className="p-3 border-r-1 border-l-1">Active</td>
        <td className="p-3 border-r-1 border-l-1">4</td>
        <td className="p-3 border-r-2 border-l-1 hover:bg-red-300 hover:cursor-not-allowed transition duration-300">
          join
        </td>
      </tr>
    </>
  );
}
