import { fetcher } from "@/utils/fetchService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { APIError } from "../models/defaults";
import { Account } from "../models/accounts";

export const useAccountsQuery = (): UseQueryResult<Account, APIError> => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () =>
      (await fetcher({
        method: "GET",
        journey: "accounts",
        includeId: true,
      })) as Account,
  });
};
