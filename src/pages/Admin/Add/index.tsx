import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Button from "components/Button";
import Loading from "components/Loading";
import Modal from "components/Modal";
import TextInput from "components/TextInput";
import Title from "components/Title";
import CardLayout from "components/form/CardLayout";
import FormLayout from "components/form/FormLayout";
import TwoSideLayout from "components/form/TwoSideLayout";
import GalleryInput from "components/gallery/GalleryInput";
import GalleryModal from "components/gallery/GalleryModal";
import apiEndpoints from "configs/apiEndPoints";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import toastFunc from "utils/toast";
import { useMutationCustom, useQueryCustom } from "utils/useQueryCUstom";
import { CONFIGS } from "../configs";
import { fieldNames, validation } from "./validation";
import SelectInput from "components/SelectInput";
import SelectInputAsync from "components/SlectInputAsync";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
  image?: any;
}

const Add: FC = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const URL_ID = id ? id : "";
  const [editInitialLoading, setEditInitialLoading] = useState(id ? true : false);
  const { t } = useTranslation();

  const updateOrCreate = URL_ID
    ? (params: any) => axios.put(apiEndpoints[CONFIGS.apiName].base + "/" + URL_ID, params)
    : (params: any) => axios.post(apiEndpoints[CONFIGS.apiName].base, params);

  const methods = useForm<FormValues>({
    resolver: yupResolver(validation(URL_ID, t)),
  });

  // --------------------------------------------------- data by id query
  const onSuccessDataById = ({ data }: any) => {
    let params = { ...data?.data };
    methods.reset({
      ...params,
    });
    setEditInitialLoading(false);
  };
  const { data: dataById } = useQueryCustom({
    name: `${CONFIGS.title}_getById`,
    url: () => axios.get(apiEndpoints[CONFIGS.apiName].base + "/" + URL_ID),
    onSuccess: onSuccessDataById,
    enabled: !!URL_ID,
  });
  // --------------------------------------------------- Create or update mutation (base on URL_ID)
  const { isLoading, mutate: submitData } = useMutationCustom({
    url: updateOrCreate,
    invalidQuery: `${CONFIGS.title}_get`,
    onSuccess: () => {
      toastFunc.success({ title: "Success" });
      navigate(CONFIGS.routes.base);
    },
  });

  // -------------------------------------------- onSubmit
  const onSubmit = (data: FormValues) => {
    const requestData = {
      ...data,
      password: data.password || undefined,
    };
    submitData(requestData);
  };

  // ---------------------------------------- select options sample
  // const fruitOptions = [
  //   { value: "apple", label: "Apple" },
  //   { value: "banana", label: "Banana" },
  //   { value: "cherry", label: "Cherry" },
  //   { value: "date", label: "Date" },
  //   { value: "elderberry", label: "Elderberry" },
  // ];
  // -------------------------------- gallery sample ----------------------------------
  const [showModalFlagUrl, setShowModalFlagUrl] = useState(false);
  const [thumbnailFlagUrl, setThumbnailFlagUrl] = useState<{
    mimetype: string;
    src: string;
  } | null>(null);

  const handleGalleryModalFlagUrl = () => {
    setShowModalFlagUrl(!showModalFlagUrl);
  };

  const handleSelectThumbnailFlagUrl = (thumbnail: { mimetype: string; src: string }) => {
    setThumbnailFlagUrl(thumbnail);
    methods.setValue(fieldNames.image, thumbnail);
    methods.clearErrors(fieldNames.image);
  };

  return (
    <div>
      {editInitialLoading && (
        <Modal isOpen={true} title={t("loadingData")}>
          <Loading size="xl" />
        </Modal>
      )}
      <Title
        hasBtn
        btnTitle={t("backTitle", { changeablePart: t(CONFIGS.title) })}
        title={
          URL_ID
            ? t("editTitle", { changeablePart: t(CONFIGS.title) })
            : t("addNew", { changeablePart: t(CONFIGS.title) })
        }
        url={CONFIGS.routes.base + CONFIGS.routes.list}
      />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormLayout
            main={
              <CardLayout>
                <TwoSideLayout
                  left={
                    <>
                      <TextInput
                        isRequired
                        name={fieldNames.name}
                        placeholder={t("enterNamePHolder")}
                        label="Name"
                        size="full"
                      />
                      <TextInput
                        isRequired
                        name={fieldNames.email}
                        placeholder={t("enterEmailPHolder")}
                        label="Email"
                        size="full"
                      />
                      <TextInput
                        isRequired
                        name={fieldNames.password}
                        placeholder={t("enterPasswordPHolder")}
                        type="password"
                        label="Password"
                        size="full"
                      />
                      <TextInput
                        isRequired
                        name={fieldNames.confirm_password}
                        placeholder={t("confirmPasswordPHolder")}
                        type="password"
                        label="Confirm password"
                        size="full"
                      />
                      <SelectInputAsync
                        name="test selection"
                        apiName="servingUnit"
                        label="test"
                        isRequired
                      />
                    </>
                  }
                  right={
                    <GalleryInput
                      isRequired
                      handleModal={handleGalleryModalFlagUrl}
                      selectedPhoto={thumbnailFlagUrl}
                      label="Photo"
                      name={fieldNames.image}
                      size="full"
                    />
                  }
                />
              </CardLayout>
            }
            side={
              <CardLayout head={{ title: "action" }}>
                <Button type="submit" variant="success" isFullSize loading={isLoading}>
                  {t("submit")}
                </Button>
              </CardLayout>
            }
          />
          {/* <SelectInput name="test selection" options={fruitOptions} /> */}
          {/* <SelectInput name="test2 selection" options={fruitOptions} /> */}
        </form>
      </FormProvider>
      <GalleryModal
        showModal={showModalFlagUrl}
        handleModal={handleGalleryModalFlagUrl}
        handleClickedImage={handleSelectThumbnailFlagUrl}
        selectedPhoto={thumbnailFlagUrl}
        FOLDER_SLUG="your-folder-slug"
      />
    </div>
  );
};

export default Add;
