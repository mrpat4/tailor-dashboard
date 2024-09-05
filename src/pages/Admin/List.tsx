import axios from "axios";
import Alert from "components/Alert";
import Table from "components/table/Table";
import Title from "components/Title";
import apiEndpoints from "configs/apiEndPoints";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toastFunc from "utils/toast";
import { useMutationCustom, useQueryCustom } from "utils/useQueryCUstom";
import { useQueryParams } from "utils/useQueryParams";
import { columns, Data } from "./columns";
import { CONFIGS } from "./configs";

const AdminPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getParam } = useQueryParams();

  // ----------------------- query param keys
  const page = parseInt(getParam("page") || "1", 10);
  const searchText = getParam("searchText") || "";
  const sortKey = getParam("sortKey") || "";
  const sortOrder = getParam("sortOrder") || "asc";
  // ------------------------ get table data query
  const { data, isLoading, refetch } = useQueryCustom({
    name: `${CONFIGS.title}_get`,
    url: () =>
      axios.get(apiEndpoints[CONFIGS.apiName].base, {
        params: {
          page,
          searchText,
          sortKey,
          sortOrder,
        },
      }),
    queryKey: [CONFIGS.apiName, page, searchText, sortKey, sortOrder],
  });
  // -------------------------- delete action mutation
  const { mutate: deleteItem } = useMutationCustom({
    name: `${CONFIGS.title}_delete`,
    url: async (id: string) => await axios.delete(`${apiEndpoints[CONFIGS.apiName].base}/${id}`),
    onSuccess: () => {
      toastFunc.success({ title: t("deleteSuccess") });
      // refetch();
    },
    invalidQuery: [CONFIGS.apiName, page, searchText, sortKey, sortOrder],
  });

  // --------------------------------- table action handlers
  const handleEdit = (data: Data) => {
    navigate(`${CONFIGS.routes.base}/edit/${data?._id}`);
  };

  const handleDelete = (data: Data) => {
    Alert.confirm({
      title: t("areYouSure"),
      // message: `You want to delete "${data.name || data._id}"?`,
      message: `${t("wantToDelete", { changeablePart: `"${data.name || data._id}"` })}`,
      onConfirm: () => deleteItem(data._id),
    });
  };

  const handleView = (data: Data) => {
    console.log("View user:", data);
  };

  return (
    <div>
      <Title
        hasBtn={true}
        btnTitle={t("addTitle", { changeablePart: t(CONFIGS.title) })}
        title={t("listTile", { changeablePart: t(CONFIGS.title) })}
        url={CONFIGS.routes.base + CONFIGS.routes.add}
      />
      <Table
        data={data?.data?.data?.result}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        // onView={handleView}
        rowsPerPage={10}
        total={data?.data?.data?.total || 0}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminPage;
