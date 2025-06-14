"use client";
import { Title } from "@/components/ui/text";
import { useRedirect } from "@/hooks/useRedirect";
// import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const DashboardUI = () => {
  useRedirect();

  const auth = useAuth();
  console.log(auth);

  // useEffect(() => {
  //   fetch(
  //     "https://uhn4fdwufj.execute-api.eu-west-2.amazonaws.com/prod/user/1",
  //     { headers: { Authorization: auth.user?.access_token || "" } }
  //   ).then((res) => console.log("RES:::", res));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <main className="layout">
      <Title color="highlight" className="happy-monkey">
        Foodies
      </Title>
    </main>
  );
};

export default DashboardUI;
