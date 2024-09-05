import { FC } from "react";
import { useTranslation } from "react-i18next";

interface TableHeaderProps {
  columns: Array<{ key: string; label: string; sortable?: boolean }>;
  selectAll: boolean;
  onToggleSelectAll: () => void;
}

const TableHeader: FC<TableHeaderProps> = ({ columns, selectAll, onToggleSelectAll }) => {
  const { t } = useTranslation();
  return (
    <thead className="bg-tableHead">
      <tr>
        <th className="px-6 py-3 border-b-2 border-border text-left leading-4 text-primary tracking-wider">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={onToggleSelectAll}
            className="accent-hoverPrimary"
          />
        </th>
        <th className="px-6 py-3 border-b-2 border-border text-left leading-4 text-primary tracking-wider">
          {t("actions")}
        </th>
        {columns.map((column) => (
          <th
            key={column.key}
            className="min-w-36 px-6 py-3 border-b-2 border-border text-left leading-4 text-primary tracking-wider"
          >
            {t(column.label)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
