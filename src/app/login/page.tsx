import LoginUI from "@/ui/login/login-ui";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <LoginUI />
    </Suspense>
  );
}
