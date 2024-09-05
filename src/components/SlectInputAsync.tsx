import axios from "axios";
import apiEndpoints from "configs/apiEndPoints";
import { FC, useEffect, useState } from "react";
import { useQueryCustom } from "utils/useQueryCUstom";
import { useQueryParams } from "utils/useQueryParams";
import SelectInput, { SelectOption } from "./SelectInput";

interface SelectInputAsyncProps {
  name: string;
  label?: string;
  isMulti?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  apiName: string;
}

const SelectInputAsync: FC<SelectInputAsyncProps> = ({
  name,
  apiName,
  placeholder = "Choose...",
  isRequired,
  label,
}) => {
  const { getParam } = useQueryParams();
  const searchText = getParam("searchText") || "";
  const [mainData, setMainData]: any[] = useState([]);
  console.log("🚀 ~ mainData:", mainData);

  function transformDataToSelectOptions(dataArray: any): SelectOption[] {
    return dataArray.map((data: any) => ({
      value: data._id,
      label: data?.name || data?.title || "No Label",
    }));
  }

  const { data, isLoading, refetch } = useQueryCustom({
    name: `${name}_get`,
    url: () =>
      axios.get(apiEndpoints[apiName], {
        params: {
          searchText,
          limit: 30,
        },
      }),
    queryKey: [name, searchText],
  });

  useEffect(() => {
    if (data?.data?.data?.result) {
      const editedData = transformDataToSelectOptions(data?.data?.data?.result);
      setMainData(editedData);
    }
  }, [data, searchText]);

  return (
    <SelectInput
      name={name}
      options={mainData}
      isLoading={isLoading}
      withSearch
      placeholder={isLoading ? "Wait for data ..." : placeholder}
      searchFullSize
      isRequired={isRequired}
      label={label}
    />
  );
};

export default SelectInputAsync;
