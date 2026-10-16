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

export const useGetStore = (id: number) => {
  return useQuery({
    queryKey: ["shops", id],
    queryFn: () => getStore(id),
  });
};

export const useUpdateStore = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateStore(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shops", id],
      });
    },
    onError: (error) => {
      console.error("Somethign went wrong while updating", error);
    },
  });
};
