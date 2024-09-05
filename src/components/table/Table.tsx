import React, { useState } from "react";
import { useQueryParams } from "utils/useQueryParams";
import SearchBar from "./SearchBar";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import Button from "components/Button";
import TableSkeleton from "./TableSkeleton";
import { useTranslation } from "react-i18next";

export interface TableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onEdit?: (item: T) => void | null;
  onDelete?: (item: T) => void | null;
  onView?: (item: T) => void | null;
  rowsPerPage: number;
  total: number;
  isLoading: boolean;
}

const Table = <T extends Record<string, any>>({
  data = [],
  columns,
  onEdit,
  onDelete,
  onView,
  rowsPerPage = 10,
  total,
  isLoading,
}: TableProps<T>) => {
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const { getParam, setParams } = useQueryParams();

  const currentPage = parseInt(getParam("page") || "1", 10);
  const searchText = getParam("searchText") || "";

  const handleSearchChange = (term: string) => {
    // setSearchParams({ page: "1", searchText: term });
    // navigate(`?page=1&searchText=${term}`);
    setParams({ searchText: term });
  };

  const handlePageChange = (page: number) => {
    // setSearchParams({ page: page.toString(), searchText: searchTerm });
    // navigate(`?page=${page}&searchText=${searchTerm}`);
    setParams({ page });
  };

  const handleSortChange = (key: string, order: "asc" | "desc") => {
    setParams({ sortKey: key, sortOrder: order });
  };
  const handleDeleteAll = (data: {}) => {
    console.log(data, "data in handle delete all");
  };

  const handleToggleSelectRow = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  return (
    <div className="">
      <div className="flex justify-end mb-4 gap-4 items-center">
        {selectedRows.size > 0 && (
          <Button
            variant="danger"
            onClick={() => selectedRows.forEach((idx) => handleDeleteAll(data[idx]))}
          >
            Delete Selected
          </Button>
        )}
        <SearchBar searchTerm={searchText} onSearchChange={handleSearchChange} />
      </div>
      {isLoading ? (
        <div className=" overflow-x-auto">
          <TableSkeleton />
        </div>
      ) : (
        <>
          <div className=" overflow-x-auto">
            <table className="min-w-full bg-sidebar">
              <TableHeader
                columns={columns}
                selectAll={selectedRows.size === data.length}
                onToggleSelectAll={() =>
                  setSelectedRows(
                    selectedRows.size === data.length
                      ? new Set()
                      : new Set(data.map((_, idx) => idx))
                  )
                }
              />
              {data.length > 0 && (
                <TableBody
                  data={data}
                  columns={columns}
                  selectedRows={selectedRows}
                  onToggleSelectRow={handleToggleSelectRow}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onView={onView}
                />
              )}
            </table>
            {!data.length && (
              <div className="bg-sidebar text-text w-full flex justify-center items-center p-4">
                {t("noAvailableData")}
              </div>
            )}
          </div>
          {data.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalPages={Math.ceil(total / rowsPerPage)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Table;
