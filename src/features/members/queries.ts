import { useQuery } from "@tanstack/react-query";
import { getStoreMembers } from "./client-api";

export const useGetStoreMembers = (storeId: number) => {
  return useQuery({
    queryFn: getStoreMembers,
    queryKey: ["members"],
    enabled: !!storeId,
  });
};
