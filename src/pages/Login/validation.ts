import * as yup from "yup";

export const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
