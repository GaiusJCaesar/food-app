export default async function Page({
  params,
}: {
  params: Promise<{ account: string }>;
}) {
  const { account } = await params;
  return <>HELLO WORLD: {account}</>;
}
