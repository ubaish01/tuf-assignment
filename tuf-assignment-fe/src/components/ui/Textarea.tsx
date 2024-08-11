import clsx from "clsx";

const Textarea = ({
  placeholder = "Start typing here",
  value,
  setValue,
  disabled = false,
  inputClass = "",
}: {
  placeholder?: string;
  value: any;
  setValue: any;
  disabled?: boolean;
  inputClass?: string;
}) => {
  return (
    <textarea
      disabled={disabled}
      className={clsx("w-full bg-black text-white p-4 rounded-md ", inputClass)}
      placeholder={placeholder}
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
    />
  );
};

export default Textarea;
