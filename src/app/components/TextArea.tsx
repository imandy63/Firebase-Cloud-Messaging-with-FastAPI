import { HTMLAttributes } from "react";

type TextAreaProps = HTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  rows: number;
  value: string;
  name: string;
};

const TextArea = ({
  label,
  className,
  rows,
  value,
  name,
  ...rest
}: TextAreaProps) => {
  return (
    <div>
      <div className="text-xl font-bold">{label}</div>
      <textarea
        name={name}
        className={`mt-1 block w-full p-2 border border-gray-300
            rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...rest}
        rows={rows}
        value={value}
      />
    </div>
  );
};

export default TextArea;
