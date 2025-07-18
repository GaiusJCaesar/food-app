import { fetcher } from "@/utils/fetchService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { APIError, QueryOptions } from "../models/defaults";
import { Plan } from "../models/plans";

export const usePlansQuery = ({
  accountId,
  dates,
  ...options
}: { accountId: string; dates: string[] } & QueryOptions<
  Plan[]
>): UseQueryResult<Plan[], APIError> => {
  return useQuery({
    ...options,
    queryKey: ["plans"],
    queryFn: async () =>
      (await fetcher({
        method: "GET",
        path: `/accounts/${accountId}/plans`,
        queryParams: { dates: JSON.stringify(dates) },
      })) as Plan[],
  });
};
