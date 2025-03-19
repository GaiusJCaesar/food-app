import ProtectedRouteProvider from "@/components/providers/protected-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRouteProvider>{children}</ProtectedRouteProvider>;
}
