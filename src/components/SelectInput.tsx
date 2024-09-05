// components/ReusableSelect.tsx
import { faChevronDown, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useQueryParams } from "utils/useQueryParams";
import Loading from "./Loading";
import SearchBar from "./table/SearchBar";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  name: string;
  label?: string;
  options: SelectOption[];
  isMulti?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  withSearch?: boolean;
  isLoading?: boolean;
  searchFullSize?: boolean;
}

const SelectInput: FC<SelectProps> = ({
  name,
  label,
  options,
  isMulti = false,
  isRequired,
  placeholder = "Select your item",
  withSearch,
  isLoading,
  searchFullSize,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { getParam, setParams } = useQueryParams();

  const searchText = getParam("searchText") || "";

  const handleSelect = (option: SelectOption) => {
    if (isMulti) {
      setSelectedOptions((prev) =>
        prev.some((selected) => selected.value === option.value)
          ? prev.filter((selected) => selected.value !== option.value)
          : [...prev, option]
      );
      setIsOpen(false);
      setSearchTerm("");
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
      setSearchTerm("");
    }
  };
  const handleSearchChange = (term: string) => {
    setParams({ searchText: term });
  };

  const handleClear = () => {
    setSelectedOptions([]);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2 mb-3">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-text mb-0">
          {label}
          {isRequired && <span className="text-danger"> *</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <div
              onClick={() => (isLoading ? () => {} : setIsOpen(!isOpen))}
              className="bg-inputBg w-full px-3 py-2 border border-inputBg rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm cursor-pointer flex justify-between items-center"
            >
              {selectedOptions.length > 0
                ? selectedOptions.map((option) => option.label).join(", ")
                : placeholder}
              <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronDown} className="w-3" />
            </div>
            {isOpen && (
              <div className="absolute z-10 mt-1 w-full bg-inputBg border border-inputBg rounded-md shadow-lg max-h-40 overflow-auto">
                {withSearch && (
                  <SearchBar
                    searchTerm={searchText}
                    onSearchChange={handleSearchChange}
                    isFullSize={searchFullSize}
                    color="sidebar"
                  />
                )}
                {/* <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-inputBg block w-full px-3 py-2 border-b border-inputBg rounded-t-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                /> */}
                {isLoading && (
                  <div className="px-2 py-3">
                    <Loading size="text-sm" />
                  </div>
                )}
                {filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      handleSelect(option);
                      field.onChange(isMulti ? selectedOptions : option);
                      handleSearchChange("");
                    }}
                    className={`cursor-pointer px-3 py-2 hover:bg-hoverPrimary transition300 ${
                      selectedOptions.some((selected) => selected.value === option.value)
                        ? "bg-primary text-text"
                        : "text-text"
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
            {isMulti && selectedOptions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedOptions.map((option) => (
                  <div
                    key={option.value}
                    className="bg-[#2d2d2d] text-white px-2 py-1 rounded-md flex items-center"
                  >
                    {option.label}
                    <span
                      onClick={() => handleSelect(option)}
                      className="ml-2 cursor-pointer text-danger"
                    >
                      ×
                    </span>
                  </div>
                ))}
                <button
                  onClick={handleClear}
                  className="bg-[#2d2d2d] text-white px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      />
      {errors[name] && <p className="text-sm text-danger -mt-1">{String(errors[name]?.message)}</p>}
    </div>
  );
};

export default SelectInput;
