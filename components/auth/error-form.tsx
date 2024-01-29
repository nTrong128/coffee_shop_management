import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({message}: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center rounded-md gap-x-2 p-3 bg-destructive/15 text-destructive text-sm">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
};
