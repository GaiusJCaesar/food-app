"use client";
import { getUser } from "@/components/providers/auth-provider";
import { API_URL } from "@/constants/apiConfigs";

interface props {
  method?: RequestInit["method"];
  body?: RequestInit["body"];
  journey: "users" | "accounts" | "meals";
  queryParams?: Record<string, string>;
  pathId?: string;
  includeId?: boolean;
}

interface JourneyProps {
  journey: props["journey"];
  includeId: props["includeId"];
  pathId: props["pathId"];
}

function getJourney({ journey, includeId, pathId }: JourneyProps) {
  const id = includeId ? getUser()?.profile.sub : pathId;
  switch (journey) {
    case "users":
      return `/users${id ? `/${id}` : ""}`;
    case "accounts":
      return `/accounts${id ? `/${id}` : ""}`;
    case "meals":
      return `/meals${id ? `/${id}` : ""}`;
    default:
      return "/";
  }
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
  journey,
  includeId,
  queryParams,
  pathId,
}: props) => {
  const token = getUser()?.id_token;
  const headers: RequestInit["headers"] = {
    Authorization: `Bearer ${token}`,
  };

  const url =
    API_URL +
    getJourney({ journey, includeId, pathId }) +
    buildQueryString(queryParams);

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
