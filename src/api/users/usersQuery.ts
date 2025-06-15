import { fetcher } from "@/utils/fetchService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User } from "../models/users";
import { APIError } from "../models/defaults";

export const useUserQuery = (): UseQueryResult<User, APIError> => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      (await fetcher({
        method: "GET",
        journey: "users",
        includeId: true,
      })) as User,
  });
};
