import { FC } from "react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePagination: FC<TablePaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="mt-4 flex justify-center">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-3 py-2 mx-1 rounded-md ${
          currentPage === page ? "bg-primary text-white" : "bg-tableHead text-mute"
        }`}
      >
        {page}
      </button>
    ))}
  </div>
);

export default TablePagination;
