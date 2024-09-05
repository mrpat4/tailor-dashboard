// components/ReusableInput.tsx
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface TextInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  size?: "half" | "full";
}

const TextInput: FC<TextInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  isRequired,
  size = "half",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1 mb-3">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-text mb-0">
          {label}
          {isRequired && <span className="text-danger"> *</span>}
        </label>
      )}
      <div className={`${size === "half" ? "md:w-1/2 w-full" : "w-full"} relative mt-1`}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={name}
              type={type === "password" && showPassword ? "text" : type}
              placeholder={placeholder}
              {...field}
              className={` transition300 bg-inputBg block px-3 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                errors[name] ? "border-danger" : "border-inputBg"
              }`}
            />
          )}
        />
        {type === "password" && (
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 -translate-y-1/2 right-0 pr-3 flex items-center text-mute cursor-pointer"
          />
        )}
      </div>
      {errors[name] && <p className="text-sm text-danger -mt-1">{String(errors[name]?.message)}</p>}
    </div>
  );
};

export default TextInput;
