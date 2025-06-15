import { fetcher } from "@/utils/fetchService";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { APIError } from "../models/defaults";
import { Account, AccountPut } from "../models/accounts";

export const useAccountsMutation = (): UseMutationResult<
  Account,
  APIError,
  AccountPut
> => {
  return useMutation({
    mutationFn: async (body: AccountPut) =>
      (await fetcher({
        method: "POST",
        journey: "accounts",
        includeId: false,
        body: JSON.stringify(body),
      })) as Account,
  });
};
