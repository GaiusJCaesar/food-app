"use client";

import { useAuth } from "@/hooks/auth-hooks";

export default function Page() {
  const auth = useAuth();
  console.log(auth);
  return <>HELLO WORLD</>;
}
