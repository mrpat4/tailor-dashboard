import { FC } from "react";

interface TableSkeletonProps {}

const TableSkeleton: FC<TableSkeletonProps> = () => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {Array.from({ length: 8 }).map((_, index) => (
            <th key={index} className="p-2 border border-border bg-border">
              <div className="w-24 h-4 bg-border rounded animate-pulse"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: 8 }).map((_, colIndex) => (
              <td key={colIndex} className="p-2 border border-border">
                <div className="w-24 h-4 bg-border rounded animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
