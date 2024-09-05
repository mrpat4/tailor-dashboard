import { TableColumn } from "components/table/Table";

export interface Data {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const columns: TableColumn<Data>[] = [
  { key: "_id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true },
  // ----------------------- sample options with render -----------------------
  // {
  //   key: "address.city",
  //   label: "City",
  //   render: (item: any) => item.address.city, // Custom render for nested data
  // },
  // {
  //   key: "tags",
  //   label: "Tags",
  //   render: (item: any) =>
  //     item.tags.map((tag: string) => (
  //       <span key={tag} className="tag">
  //         {tag}
  //       </span>
  //     )),
  // },
];
