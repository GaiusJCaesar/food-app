import { QueryObserverOptions } from "@tanstack/react-query";

export type APIError = {
  message: string;
  error: unknown;
};

export type QueryOptions<T> = Omit<
  QueryObserverOptions<T, APIError>,
  "queryKey"
>;
