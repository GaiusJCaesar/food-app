import { ProvidersWithAuth } from "@/components/providers";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProvidersWithAuth>{children}</ProvidersWithAuth>;
}
