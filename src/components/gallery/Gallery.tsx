import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Alert from "components/Alert";
import GlobalPagination from "components/GlobalPagination";
import Loading from "components/Loading";
import apiEndpoints from "configs/apiEndPoints";
import { FC, useEffect, useState } from "react";
import toastFunc from "utils/toast";
import { useMutationCustom, useQueryCustom } from "utils/useQueryCUstom";

type Photo = {
  _id: string;
  title: string;
  path: string;
  mimetype: string;
};

type GalleryProps = {
  folderSlug?: string;
  handleClickedImage: (photo: Photo | null) => void;
  selectedPhoto: Photo | null;
  handleModal: () => void;
  editable?: boolean;
};

const limit = 20;

const Gallery: FC<GalleryProps> = ({ handleClickedImage, selectedPhoto, handleModal }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [page, setPage] = useState(1);
  const [preLoad, setPreLoad] = useState(true);

  const getting = async () => await axios.get(apiEndpoints.files, { params: { page, limit } });

  const { data, isLoading, refetch } = useQueryCustom({
    name: `gallery_get`,
    url: () =>
      axios.get(apiEndpoints.files, {
        params: {
          page,
          limit,
        },
      }),
    queryKey: ["gallery", page, limit],
  });

  useEffect(() => {
    if (data) {
      const indexOfSelectedPhoto = data?.data?.data?.result?.findIndex(
        (image: Photo) => image._id === selectedPhoto?._id
      );
      setSelectedPhotoIndex(indexOfSelectedPhoto);
    }
  }, [data, selectedPhoto]);

  useEffect(() => {
    setTimeout(() => {
      setPreLoad(false);
    }, 1000);

    return () => {
      setPreLoad(true);
    };
  }, []);

  const handleClickedImageWithIndex = (photo: Photo, index: number) => {
    handleClickedImage(photo);
    setSelectedPhotoIndex(index);
    setIsEditMode(false);
  };

  const handleCancelSelectedImage = () => {
    handleClickedImage(null);
    setSelectedPhotoIndex(null);
  };

  const { mutate: deletePhoto } = useMutationCustom({
    name: "gallery_changeStatus",
    url: async (id: string) => await axios.delete(`${apiEndpoints.files}/${id}`),
    onSuccess: () => {
      toastFunc.success({ title: "Photo deleted successfully" });
      refetch();
      handleCancelSelectedImage();
    },
    invalidQuery: ["gallery", page, limit],
  });

  const handleDeleteButton = (photo: Photo) => {
    Alert.confirm({
      title: "Are you sure?",
      message: `You want to delete "${photo.title || photo._id}"?`,
      onConfirm: () => deletePhoto(photo._id),
    });
  };

  const count = data?.data?.data?.total || 0;
  const photos = data?.data?.data?.result || [];

  return (
    <div className="w-full h-full">
      {preLoad || isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading size="w-8" />
        </div>
      ) : (
        <>
          <div className="flex justify-end items-center mb-4">
            {count > 0 && (
              <span className="text-sm text-mute">
                Showing {Math.min(page * limit, count)} of {count} entries
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {photos.length > 0 ? (
              photos.map((photo: Photo, index: number) => (
                <div
                  key={photo._id}
                  className={`relative w-full overflow-hidden border border-border rounded-md transition300 ${
                    selectedPhotoIndex === index
                      ? "border-success border-2 scale-95"
                      : "hover:shadow-lg"
                  } transition-transform`}
                >
                  <div className="absolute top-2 right-2 z-10 flex space-x-2">
                    <button
                      className="bg-danger text-white rounded-full w-6 h-6 flex justify-center items-center"
                      onClick={() => handleDeleteButton(photo)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-3" />
                    </button>
                    {selectedPhotoIndex === index && (
                      <button
                        className="bg-success text-white rounded-full w-6 h-6 flex justify-center items-center"
                        onClick={handleModal}
                      >
                        <FontAwesomeIcon icon={faEdit} className="w-3" />
                      </button>
                    )}
                  </div>
                  {photo.mimetype.startsWith("image/") ? (
                    <img
                      src={photo.path}
                      alt="gallery item"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => handleClickedImageWithIndex(photo, index)}
                    />
                  ) : photo.mimetype.startsWith("video/") ? (
                    <video
                      src={photo.path}
                      controls
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => handleClickedImageWithIndex(photo, index)}
                    />
                  ) : (
                    <img
                      src="/path/to/pdf-icon.png"
                      alt="pdf item"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => handleClickedImageWithIndex(photo, index)}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-text">
                <h2>No Data</h2>
              </div>
            )}
          </div>
          <div className="mt-4">
            <GlobalPagination
              total={count}
              limit={limit}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
