import { fetcher } from "@/utils/fetchService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User } from "../models/users";
import { APIError, QueryOptions } from "../models/defaults";
import { getUser } from "@/components/providers/auth-provider";

export const useUserQuery = ({
  ...options
}: QueryOptions<User>): UseQueryResult<User, APIError> => {
  const id = getUser()?.profile.sub;
  return useQuery({
    ...options,
    queryKey: ["user"],
    queryFn: async () =>
      (await fetcher({
        method: "GET",
        path: `/users/${id}`,
      })) as User,
  });
};
