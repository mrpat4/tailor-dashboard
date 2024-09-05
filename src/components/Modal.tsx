import { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "xxxxl";
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    xxl: "max-w-2xl",
    xxxl: "max-w-3xl",
    xxxxl: "max-w-4xl",
  };

  return (
    <div className="max-w-x fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-2">
      <div
        className={`relative w-full ${sizeClasses[size]} bg-sidebar rounded-md shadow-lg overflow-auto max-h-[80vh]`}
      >
        <div className="flex justify-between items-center p-4 border-b-inputBg ">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {onClose && (
            <button onClick={onClose} className="text-text hover:text-danger">
              &times;
            </button>
          )}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
