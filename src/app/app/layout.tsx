import Providers from "@/components/Providers";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <h1>Hello</h1>
      {children}
    </Providers>
  );
}
