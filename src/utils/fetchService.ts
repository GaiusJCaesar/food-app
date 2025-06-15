"use client";
import { getUser } from "@/components/providers/auth-provider";
import { API_URL } from "@/constants/apiConfigs";

interface props {
  method?: RequestInit["method"];
  body?: RequestInit["body"];
  journey: "users";
  includeId?: boolean;
}

function getJourney(journey: props["journey"], includeId: props["includeId"]) {
  const id = getUser()?.profile.sub;
  switch (journey) {
    case "users":
      return `/users${includeId ? `/${id}` : ""}`;
    default:
      return "/";
  }
}

export const fetcher = async ({
  method = "GET",
  body,
  journey,
  includeId,
}: props) => {
  const token = getUser()?.id_token;
  const headers: RequestInit["headers"] = {
    Authorization: `Bearer ${token}`,
  };

  const result = await fetch(API_URL + getJourney(journey, includeId), {
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
