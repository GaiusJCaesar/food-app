"use client";
import { getUser } from "@/components/providers/auth-provider";
import { API_URL } from "@/constants/apiConfigs";

interface props {
  method?: RequestInit["method"];
  body?: RequestInit["body"];
  path: string;
  queryParams?: Record<string, string>;
}

const buildQueryString = (queryParams?: props["queryParams"]): string => {
  if (!queryParams || Object.keys(queryParams).length === 0) {
    return "";
  }

  const query = new URLSearchParams(queryParams).toString();
  return `?${query}`;
};

export const fetcher = async ({
  method = "GET",
  body,
  path,
  queryParams,
}: props) => {
  const token = getUser()?.id_token;
  const headers: RequestInit["headers"] = {
    Authorization: `Bearer ${token}`,
  };

  const url = API_URL + path + buildQueryString(queryParams);

  const result = await fetch(url, {
    method,
    body,
    headers,
  });
  if (method === "GET" && result.ok) {
    const json = await result.json();
    return json?.data || json;
  }
  return await result.json();
};
