import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Button from "./Button";

type AlertProps = {
  title: string;
  message: string;
  onConfirm: () => void;
};

const Alert = {
  confirm: ({ title, message, onConfirm }: AlertProps) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        const handleConfirm = () => {
          onConfirm();
          onClose();
        };
        return (
          <div className="flex flex-col items-center md:w-auto max-w-[300px] text-center">
            <h1 className="text-2xl text-black mb-2">{title}</h1>
            <p className="text-black">{message}</p>
            <div className="flex gap-3 mt-3">
              <Button variant="danger" onClick={onClose}>
                No
              </Button>
              <Button variant="success" onClick={handleConfirm}>
                Yes, Delete it!
              </Button>
            </div>
          </div>
        );
      },
      // title,
      // message,
      // buttons: [
      //   {
      //     label: "Yes",
      //     onClick: onConfirm,
      //   },
      //   {
      //     label: "No",
      //     onClick: () => {},
      //   },
      // ],
    });
  },
};

export default Alert;
