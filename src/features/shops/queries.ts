import { useMutation } from "@tanstack/react-query";
import { createStore } from "./api";

export const useCreateStore = () => {
  return useMutation({
    // mutationFn: createStore
  })
}