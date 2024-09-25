export const TextDisplayer = ({ text }: { text: string }) => {
  return (
    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {text}
    </div>
  );
};
