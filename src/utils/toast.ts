import { toast, ToastOptions, ToastContent, TypeOptions, Id } from "react-toastify";

interface ToastifyOptions extends ToastOptions {
  title: ToastContent;
}

interface UpdateOptions extends ToastOptions {
  title: ToastContent;
  id: Id;
  type: TypeOptions;
  isLoading: boolean;
}

const toastFunc = {
  info: ({ title, ...other }: ToastifyOptions) =>
    toast.info(title, {
      ...other,
    }),
  error: ({ title, ...other }: ToastifyOptions) =>
    toast.error(title, {
      ...other,
    }),
  success: ({ title, ...other }: ToastifyOptions) =>
    toast.success(title, {
      ...other,
    }),
  warn: ({ title, ...other }: ToastifyOptions) =>
    toast.warn(title, {
      ...other,
    }),
  update: ({ title, id, type, isLoading, ...other }: UpdateOptions) =>
    toast.update(id, {
      render: title,
      isLoading,
      type,
      ...other,
    }),
};

export default toastFunc;
