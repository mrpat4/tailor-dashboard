import Gallery from "components/gallery/Gallery";
import { TFunction } from "i18next";
import * as yup from "yup";

export const fieldNames = {
  email: "email",
  password: "password",
  confirm_password: "confirm_password",
  name: "name",
  image: "image",
} as const;

type FieldNames = (typeof fieldNames)[keyof typeof fieldNames];

export const validation = (URL_ID: string | undefined, t: TFunction) => {
  return URL_ID
    ? yup.object().shape({
        [fieldNames.name]: yup
          .string()
          .required(t("pleaseEnter", { changeablePart: t(fieldNames.name) }))
          .label(t(fieldNames.name)),
        [fieldNames.email]: yup
          .string()
          .required(t("pleaseEnter", { changeablePart: t(fieldNames.email) }))
          .label(t(fieldNames.email)),
        [fieldNames.password]: yup
          .string()
          .min(6, t("minCharacters"))
          .required(t("pleaseEnter", { changeablePart: t(fieldNames.password) }))
          .label(t(fieldNames.password)),
        [fieldNames.confirm_password]: yup
          .string()
          .oneOf([yup.ref(fieldNames.password)], t("passwordMustMatch"))
          .label(fieldNames.confirm_password),
        [fieldNames.image]: yup.lazy((value) => {
          if (value === undefined || value === null) {
            return yup
              .mixed()
              .required(t("pleaseSelect", { changeablePart: t(fieldNames.image) }))
              .label(fieldNames.image);
          }
          switch (typeof value) {
            case "object":
              return yup
                .object()
                .required(t("pleaseSelect", { changeablePart: t(fieldNames.image) }))
                .label(fieldNames.image); // schema for object
            case "string":
              return yup
                .string()
                .required(t("pleaseSelect", { changeablePart: t(fieldNames.image) }))
                .label(fieldNames.image); // schema for string
            default:
              return yup.mixed();
          }
        }),
      })
    : yup.object().shape({
        [fieldNames.name]: yup
          .string()
          .required(t("pleaseEnter", { changeablePart: t(fieldNames.name) }))
          .label(t(fieldNames.name)),
        [fieldNames.email]: yup
          .string()
          .required(t("pleaseEnter", { changeablePart: t(fieldNames.email) }))
          .label(t(fieldNames.email)),
        [fieldNames.password]: yup
          .string()
          .min(6, t("minCharacters"))
          .required(t("pleaseEnter", { changeablePart: t(fieldNames.password) }))
          .label(t(fieldNames.password)),
        [fieldNames.confirm_password]: yup
          .string()
          .oneOf([yup.ref(fieldNames.password)], t("passwordMustMatch"))
          .label(t(fieldNames.confirm_password)),
        [fieldNames.image]: yup.lazy((value) => {
          if (value === undefined || value === null) {
            return yup
              .mixed()
              .required(t("pleaseSelect", { changeablePart: t(fieldNames.image) }))
              .label(fieldNames.image);
          }
          switch (typeof value) {
            case "object":
              return yup
                .object()
                .required(t("pleaseSelect", { changeablePart: t(fieldNames.image) }))
                .label(fieldNames.image); // schema for object
            case "string":
              return yup
                .string()
                .required(t("pleaseSelect", { changeablePart: t(fieldNames.image) }))
                .label(fieldNames.image); // schema for string
            default:
              return yup.mixed();
          }
        }),
      });
};
