import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStore,
  deleteStore,
  getStore,
  getStores,
  updateStore,
} from "./api";
import { ShopCreationData, ShopData } from "./types";
import { useAuth } from "@/src/context/AuthContext";

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

export const useStore = (id: number) => {
  return useQuery({
    queryKey: ["shop", id],
    queryFn: () => getStore(id),
  });
};

export const useStores = (userId: string) => {
  // const { user } = useAuth();
  // const userId = user?.id;

  // console.log("[useStores] user", userId);

  return useQuery({
    queryKey: ["shops"],
    queryFn: () => getStores(userId),
    enabled: !!userId,
  });
};

export const useUpdateStore = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ShopData) => updateStore(id, data),
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

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteStore(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shops"],
      });
    },
    onError: (error) => {
      console.error("Somethign went wrong while deleting", error);
    },
  });
};
