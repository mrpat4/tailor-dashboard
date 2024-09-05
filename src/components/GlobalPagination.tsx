import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

type PaginationProps = {
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const GlobalPagination: FC<PaginationProps> = ({ total, limit, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= halfMaxPagesToShow) {
        for (let i = 1; i <= maxPagesToShow - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...", totalPages);
      } else if (currentPage > totalPages - halfMaxPagesToShow) {
        pageNumbers.push(1, "...");
        for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1, "...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...", totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        className="px-3 py-2 text-text hover:text-primary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-4" />
      </button>
      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`px-3 py-2 mx-1 rounded-md ${
              currentPage === page ? "bg-primary text-white" : "bg-tableHead text-mute"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-2">
            {page}
          </span>
        )
      )}
      <button
        className="px-3 py-2 text-text hover:text-primary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-4" />
      </button>
    </div>
  );
};

export default GlobalPagination;
