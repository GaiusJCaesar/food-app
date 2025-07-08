"use client";
import { getUser } from "@/components/providers/auth-provider";
import { API_URL } from "@/constants/apiConfigs";

interface props {
  method?: RequestInit["method"];
  body?: RequestInit["body"];
  journey: "users" | "accounts" | "meals";
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

export const fetcher = async ({
  method = "GET",
  body,
  journey,
  includeId,
  pathId,
}: props) => {
  const token = getUser()?.id_token;
  const headers: RequestInit["headers"] = {
    Authorization: `Bearer ${token}`,
  };

  const result = await fetch(
    API_URL + getJourney({ journey, includeId, pathId }),
    {
      method,
      body,
      headers,
    }
  );
  if (method === "GET" && result.ok) {
    const json = await result.json();
    return json?.data || json;
  }
  return await result.json();
};
