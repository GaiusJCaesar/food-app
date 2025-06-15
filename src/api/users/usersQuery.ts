import { fetcher } from "@/utils/fetchService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User } from "../models/users";
import { APIError, QueryOptions } from "../models/defaults";

export const useUserQuery = ({
  ...options
}: QueryOptions<User>): UseQueryResult<User, APIError> => {
  return useQuery({
    ...options,
    queryKey: ["user"],
    queryFn: async () =>
      (await fetcher({
        method: "GET",
        journey: "users",
        includeId: true,
      })) as User,
  });
};
