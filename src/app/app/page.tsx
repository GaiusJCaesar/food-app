"use client";

import { getUser } from "@/api/users/getUser";
import { useAuth } from "@/hooks/auth-hooks";
import { useEffect } from "react";

export default function Page() {
  const auth = useAuth();
  console.log(auth);
  useEffect(() => {
    (async () => {
      await getUser();
    })();
  });
  return <>HELLO WORLD</>;
}
