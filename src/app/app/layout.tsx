import ProvidersWithAuth from "@/components/providers/cognito-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProvidersWithAuth>{children}</ProvidersWithAuth>;
}
