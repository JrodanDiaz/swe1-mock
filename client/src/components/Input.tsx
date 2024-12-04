import { SetStateAction, useState } from "react";

interface Props {
  onChange: React.Dispatch<SetStateAction<any>> | ((arg: any) => void);
  value: string | number;
  placeholder?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
}
export default function Input({
  onChange,
  placeholder,
  value,
  className,
  type = "input",
  disabled = false,
}: Props) {
  const [focused, setFocused] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <input
      className={`px-5 py-3 rounded-full border-2 focus:outline-none w-full ${className} ${
        focused ? "border-main-blue" : "border-black"
      }`}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      disabled={disabled}
      type={type}
    />
  );
}
