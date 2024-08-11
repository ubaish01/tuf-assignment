import clsx from "clsx";

const Input = ({
  type = "text",
  placeholder = "Start typing here",
  value,
  setValue,
  disabled = false,
  inputClass = "",
}: {
  type?: string;
  placeholder?: string;
  value: any;
  setValue: any;
  disabled?: boolean;
  inputClass?: string;
}) => {
  return (
    <input
      disabled={disabled}
      className={clsx("w-full bg-black text-white p-4 rounded-md ", inputClass)}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
    />
  );
};

export default Input;
