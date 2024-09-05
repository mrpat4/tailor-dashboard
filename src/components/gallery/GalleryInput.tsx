import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface GalleryInputProps {
  description?: string;
  selectedPhoto?: { path?: string; mimetype: string; src?: string } | null;
  handleModal: () => void;
  label: string;
  name: string;
  isRequired?: boolean;
  size?: "half" | "full";
}

const GalleryInput: FC<GalleryInputProps> = ({
  description,
  selectedPhoto,
  handleModal,
  label,
  name,
  isRequired,
  size = "full",
}) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const renderContent = (value: any) => {
    const isPdf =
      value?.mimetype?.startsWith("application/pdf") ||
      selectedPhoto?.mimetype?.startsWith("application/pdf");
    const isImage =
      value?.mimetype?.startsWith("image/") || selectedPhoto?.mimetype?.startsWith("image/");
    const isVideo =
      value?.mimetype?.startsWith("video/") ||
      selectedPhoto?.mimetype?.startsWith("video/") ||
      value?.path?.endsWith(".mp4") ||
      (typeof value === "string" && value.endsWith(".mp4")) ||
      selectedPhoto?.path?.endsWith(".mp4");

    const src = value?.path || value?.src || selectedPhoto?.path || selectedPhoto?.src || value;
    // || placeholder;

    if (isPdf) {
      return <img src="" alt="thumbnail" className="w-24" />;
    } else if (isImage) {
      return <img src={src} alt="thumbnail" className="w-full max-h-48 object-contain" />;
    } else if (isVideo) {
      return <video src={src} controls className="w-full max-h-80" />;
    } else {
      return (
        <div className="h-64 flex items-center justify-center bg-inputBg rounded-lg">
          <div className="bg-mainSection flex items-center justify-center gap-2 p-4 rounded-lg">
            <FontAwesomeIcon icon={faUpload} className="w-5" />
            <p className="text-sm m-0 text-text">{t("click_to_upload")}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="gallery-component">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={name} className="block text-sm font-medium text-text">
          {t(label)}
          {isRequired && <span className="text-danger"> *</span>}
          {description && <small className="text-text">{description}</small>}
        </label>
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => (
          <div
            onClick={handleModal}
            className={`p-2 transition300 border rounded-lg bg-inputBg hover:border-hoverPrimary cursor-pointer ${
              size === "half" ? "md:w-1/2 w-full" : "w-full"
            }
            ${errors[name] ? "border-danger" : "border-mainSection"}`}
          >
            {renderContent(value)}
          </div>
        )}
      />
      {errors[name] && <p className="text-sm text-danger ">{String(errors[name]?.message)}</p>}
    </div>
  );
};

export default GalleryInput;
