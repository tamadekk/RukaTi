import { useState } from "react";
import { toast } from "sonner";

type UseAsyncActionOptions = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
};

export const useAsyncAction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const execute = async <T>(
    fn: () => Promise<T>,
    options?: UseAsyncActionOptions,
  ) => {
    setIsLoading(true);
    try {
      await fn();
      if (options?.successMessage) {
        toast.success(options.successMessage);
      }
      options?.onSuccess?.();
    } catch (error) {
      console.error(error);
      if (options?.errorMessage) {
        toast.error(options.errorMessage);
      }
      options?.onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, execute };
};
