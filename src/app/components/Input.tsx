import { HTMLAttributes } from "react";

interface InputInterface extends HTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value: string;
}
export const Input = ({
  name,
  label,
  className,
  value,
  ...rest
}: InputInterface) => {
  return (
    <div>
      <div className="text-xl font-bold">{label}</div>
      <input
        className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        name={name}
        value={value}
        {...rest}
      />
    </div>
  );
};
