import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { TableColumn } from "./Table";

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  selectedRows: Set<number>;
  onToggleSelectRow: (index: number) => void;
  onEdit?: (item: T) => void | null;
  onDelete?: (item: T) => void | null;
  onView?: (item: T) => void | null;
}

const TableBody = <T extends Record<string, any>>({
  data,
  columns,
  selectedRows,
  onToggleSelectRow,
  onEdit,
  onDelete,
  onView,
}: TableBodyProps<T>) => (
  <tbody>
    {data.map((item, index) => (
      <tr key={index} className="hover:bg-mainSection transition300">
        <td className="px-6 py-4 border-b border-border">
          <input
            type="checkbox"
            checked={selectedRows.has(index)}
            onChange={() => onToggleSelectRow(index)}
            className="accent-hoverPrimary"
          />
        </td>
        <td className="px-6 py-4 border-b border-border">
          {onView && (
            <button
              onClick={() => onView(item)}
              className="text-mute hover:dark:text-hoverPrimary transition300 hover:text-hoverPrimary mr-4 parent-animation-on-hover"
              // hover:text-blue-500 dark:hover:text-blue-400 text-info
            >
              <FontAwesomeIcon icon={faEye} className="rubberBand-on-hover" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              className="text-mute hover:dark:text-warning transition300 mr-4 hover:text-warning parent-animation-on-hover"
              // hover:text-yellow-500 dark:hover:text-yellow-400 text-warning
            >
              <FontAwesomeIcon icon={faEdit} className="rubberBand-on-hover" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(item)}
              className="text-mute hover:dark:text-danger transition300 hover:text-danger parent-animation-on-hover"
              // hover:text-red-500 dark:hover:text-red-400 text-danger
            >
              <FontAwesomeIcon icon={faTrash} className="rubberBand-on-hover" />
            </button>
          )}
        </td>
        {columns.map((column) => (
          <td key={column.key} className="px-6 py-4 border-b border-border">
            {column.key === "createdAt"
              ? format(new Date(item[column.key]), "yyyy-MM-dd")
              : column.render
              ? column.render(item)
              : item[column.key]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default TableBody;
