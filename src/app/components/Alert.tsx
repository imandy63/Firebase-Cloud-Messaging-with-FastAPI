export const FailedAlert = ({ text }: { text: string }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span className="font-medium">Failed!</span> {text}
    </div>
  );
};

export const SuccessAlert = ({ text }: { text: string }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span className="font-medium">Success!</span> {text}
    </div>
  );
};
