import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStore, getStore } from "./api";

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStore,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shops"],
      });
    },
  });
};

export const useGetStore = (slug: string) => {
  return useQuery({
    queryKey: ["shops"],
    queryFn: ()  => getStore(slug),
  });
};
