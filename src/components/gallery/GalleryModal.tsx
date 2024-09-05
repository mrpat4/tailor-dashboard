import Modal from "components/Modal";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Gallery from "./Gallery";
import UploadTab from "./uploader/Upload";

interface GalleryModalProps {
  showModal: boolean;
  handleModal: () => void;
  handleClickedImage: (image: any) => void;
  selectedPhoto?: any;
  isGalleryDisabled?: boolean;
  FOLDER_SLUG: string;
  editable?: boolean;
}

const GalleryModal: FC<GalleryModalProps> = ({
  showModal,
  handleModal,
  handleClickedImage,
  selectedPhoto,
  isGalleryDisabled = false,
}) => {
  const [activeTab, setActiveTab] = useState(isGalleryDisabled ? "upload" : "gallery");
  const { t } = useTranslation();

  return (
    <Modal isOpen={showModal} onClose={handleModal} title={t("select_image")} size="xxxxl">
      <div className="flex gap-2 mb-4 border-b border-b-primary">
        {!isGalleryDisabled && (
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-2 rounded-tl-md rounded-tr-md ${
              activeTab === "gallery" ? "bg-primary text-white" : "bg-inputBg text-text"
            }`}
          >
            {t("gallery")}
          </button>
        )}
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded-tl-md rounded-tr-md ${
            activeTab === "upload" ? "bg-primary text-white" : "bg-inputBg text-text"
          }`}
        >
          {t("upload")}
        </button>
      </div>
      <div>
        {activeTab === "gallery" && !isGalleryDisabled && (
          <Gallery
            handleClickedImage={handleClickedImage}
            selectedPhoto={selectedPhoto}
            handleModal={handleModal}
            // editable={editable}
          />
        )}
        {activeTab === "upload" && <UploadTab />}
      </div>
    </Modal>
  );
};

export default GalleryModal;
