import { DragEvent, FC, memo, ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import toastFunc from "utils/toast";

interface DragAndDropProps {
  handleSelectFile: (file: File) => void;
  children: ReactNode;
}

const DragAndDrop: FC<DragAndDropProps> = ({ handleSelectFile, children }) => {
  const { t } = useTranslation();
  const dropRef = useRef<any>(null);
  const dragRef = useRef<any>(null);
  const [dragging, setDragging] = useState(false);
  const formats = ["jpg", "jpeg", "png"];

  useEffect(() => {
    const dropElement = dropRef?.current;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      if (e.target !== dragRef.current) {
        setDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      if (e.target === dragRef.current) {
        setDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);

      if (files.length > 1) {
        toastFunc.error({ title: t("only_one_file") });
        setDragging(false);
        return;
      }

      if (
        files.some(
          (file) =>
            !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase()))
        )
      ) {
        toastFunc.error({ title: t("only_this_formats", { changeablePart: formats.join(", ") }) });
        setDragging(false);
        return;
      }

      if (files.length) {
        handleSelectFile(files[0]);
      }

      setDragging(false);
    };

    if (dropElement) {
      dropElement?.addEventListener("dragenter", handleDragEnter);
      dropElement?.addEventListener("dragleave", handleDragLeave);
      dropElement?.addEventListener("dragover", handleDragOver);
      dropElement?.addEventListener("drop", handleDrop);
    }

    return () => {
      if (dropElement) {
        dropElement.removeEventListener("dragenter", handleDragEnter);
        dropElement.removeEventListener("dragleave", handleDragLeave);
        dropElement.removeEventListener("dragover", handleDragOver);
        dropElement.removeEventListener("drop", handleDrop);
      }
    };
  }, [formats, handleSelectFile]);

  return (
    <div
      className="relative w-full h-full min-h-[100px] flex flex-col justify-center items-center border border-dashed border-border p-4 mt-4"
      ref={dropRef}
    >
      {dragging && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-hoverPrimary bg-opacity-50 flex justify-center items-center z-10"
          ref={dragRef}
        >
          <p className="text-text text-lg text-center">{t("drop_here")}</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default memo(DragAndDrop);
