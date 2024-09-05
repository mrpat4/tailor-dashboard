import { MutationFunction, useMutation, useQueryClient } from "react-query";
import { QueryFunctionContext, useQuery } from "react-query";

interface UseQueryCustomProps {
  name: string;
  url: (context: QueryFunctionContext) => Promise<any>;
  params?: Record<string, any>;
  onSuccess?: (data: any) => void;
  enabled?: boolean;
  [key: string]: any;
}

interface UseMutationCustomProps {
  name?: string;
  url: MutationFunction<any, any>;
  onSuccess?: (data: any) => void;
  // invalidQuery: string | string[];
  [key: string]: any;
}

export function useQueryCustom({
  name,
  url,
  onSuccess,
  queryKey,
  enabled = true,
  ...prop
}: UseQueryCustomProps) {
  return useQuery(queryKey || [name], url, {
    onSuccess,
    enabled,
    ...prop,
  });
}

export function useMutationCustom({
  name,
  url,
  onSuccess,
  invalidQuery,
  ...prop
}: UseMutationCustomProps) {
  const queryClient = useQueryClient();

  return useMutation(name ? name : "", url, {
    onSuccess,
    // onError: (error) => {
    //   const changedError = changeError(error);
    //   Object.entries(changedError).map(([key, value]) => {
    //     return toastify.error({ title: value.message || value });
    //   });
    // },
    onSettled: () => {
      queryClient.invalidateQueries(invalidQuery);
    },
    ...prop,
  });
}
