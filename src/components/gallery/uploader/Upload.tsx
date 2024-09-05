import axios from "axios";
import Button from "components/Button";
import apiEndpoints from "configs/apiEndPoints";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { convertBytes } from "utils/others";
import toastFunc from "utils/toast";
import { useMutationCustom } from "utils/useQueryCUstom";
import DragAndDrop from "./DragAndDrop";

const UploadTab: FC = () => {
  const [userUploadedFile, setUserUploadedFile] = useState<File | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width?: number; height?: number }>({});
  const [previewElement, setPreviewElement] = useState<ReactNode | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { t } = useTranslation();

  const handleSelectFile = (file: File) => {
    setUserUploadedFile(file);
  };

  const resetFields = () => {
    setUserUploadedFile(null);
    setPreviewElement(null);
  };

  const onSuccessMutating = () => {
    toastFunc.success({ title: t("success") });
    if (userUploadedFile) {
      URL.revokeObjectURL(userUploadedFile.name);
    }
    resetFields();
  };

  const { isLoading, mutate } = useMutationCustom({
    url: async (params: FormData) => await axios.post(apiEndpoints.files, params),
    invalidQuery: `gallery_get`,
    onSuccess: onSuccessMutating,
  });

  const handleUploadButton = () => {
    if (userUploadedFile) {
      const formData = new FormData();
      formData.append("file", userUploadedFile);
      mutate(formData);
    }
  };

  const handleCancelButton = () => {
    resetFields();
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  useEffect(() => {
    if (userUploadedFile) {
      const fileUrl = URL.createObjectURL(userUploadedFile);

      if (userUploadedFile.type.startsWith("image/")) {
        setPreviewElement(
          <img
            src={fileUrl}
            alt="Preview"
            ref={imageRef}
            onLoad={handleImageLoad}
            className="w-full max-h-[500px] object-contain"
          />
        );
      } else if (userUploadedFile.type.startsWith("video/")) {
        setPreviewElement(<video src={fileUrl} controls className="w-full max-h-[500px]" />);
      } else if (userUploadedFile.type === "application/pdf") {
        setPreviewElement(
          <embed src={fileUrl} type="application/pdf" className="w-full h-[500px]" />
        );
      }
    }
  }, [userUploadedFile]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h5 className="mb-0">{t("upload_your_file")}</h5>
      </div>
      {userUploadedFile ? (
        <div className="flex gap-3 md:flex-row flex-col">
          <div className="md:w-2/4 w-full">
            {previewElement}
            <div className="mt-4">
              <p>
                {t("name")}: {userUploadedFile.name}
              </p>
              <p>
                {t("size")}:{" "}
                {imageDimensions.width && imageDimensions.height
                  ? `${imageDimensions.width} × ${imageDimensions.height}`
                  : t("calculating")}{" "}
                - {convertBytes(userUploadedFile.size)}
              </p>
              <p>
                {t("type")}: {userUploadedFile.type}
              </p>
            </div>
          </div>
          <div className="flex gap-2 md:w-2/4 w-full items-start">
            <Button variant="success" loading={isLoading} onClick={handleUploadButton}>
              {t("upload")}
            </Button>
            <Button variant="danger" onClick={handleCancelButton}>
              {t("cancel")}
            </Button>
          </div>
        </div>
      ) : (
        <DragAndDrop handleSelectFile={handleSelectFile}>
          <input
            type="file"
            name="file"
            id="file"
            accept=".jpg,.jpeg,.png,.pdf,.mp4"
            className="hidden"
            onChange={(e) => handleSelectFile(e.target.files![0])}
          />
          <label
            htmlFor="file"
            className="cursor-pointer text-center block px-4 py-2 rounded bg-secondary text-black"
          >
            {t("click_to_choose")}
          </label>
          <p className="text-center mt-2">{t("or")}</p>
          <p className="text-center text-text">{t("drag_drop")}</p>
          <p className="text-xs text-center mt-2 text-text opacity-60">{t("accepted_formats")}</p>
        </DragAndDrop>
      )}
    </div>
  );
};

export default UploadTab;
