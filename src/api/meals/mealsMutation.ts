import { fetcher } from "@/utils/fetchService";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { APIError } from "../models/defaults";
import { MealPut } from "../models/meals";

export const useMealsMutation = (): UseMutationResult<
  unknown,
  APIError,
  MealPut
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: MealPut) =>
      await fetcher({
        method: "POST",
        journey: "meals",
        includeId: false,
        body: JSON.stringify(body),
      }),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["meals"] }),
  });
};
