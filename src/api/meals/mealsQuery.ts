import { fetcher } from "@/utils/fetchService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Meal } from "../models/meals";
import { APIError, QueryOptions } from "../models/defaults";

export const useMealsQuery = ({
  accountId,
  ...options
}: { accountId: string } & QueryOptions<Meal[]>): UseQueryResult<
  Meal[],
  APIError
> => {
  return useQuery({
    ...options,
    queryKey: ["meals"],
    queryFn: async () =>
      (await fetcher({
        method: "GET",
        path: `/accounts/${accountId}/meals`,
        queryParams: { accountId },
      })) as Meal[],
  });
};
