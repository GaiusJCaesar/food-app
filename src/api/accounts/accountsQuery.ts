import { fetcher } from "@/utils/fetchService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { APIError, QueryOptions } from "../models/defaults";
import { Account } from "../models/accounts";

export const useAccountsQuery = ({
  id,
  ...options
}: { id: string } & QueryOptions<Account>): UseQueryResult<
  Account,
  APIError
> => {
  return useQuery({
    ...options,
    queryKey: ["accounts", id],
    queryFn: async () =>
      (await fetcher({
        method: "GET",
        path: `/accounts/${id}`,
      })) as Account,
  });
};
