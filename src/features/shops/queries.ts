import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStore, getStore, updateStore } from "./api";

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
    queryKey: ["shops", slug],
    queryFn: () => getStore(slug),
  });
};

export const useUpdateStore = (id: number, data: string | any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updateStore(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shops", id],
      });
    },
  });
};
