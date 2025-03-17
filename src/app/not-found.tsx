"use client";
import { Separator } from "@/components/ui/separator";
import { Paragraph, Title } from "@/components/ui/text";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <main className="layout">
      <Title variant="h2">Page not found</Title>
      <Paragraph variant="default">
        The page you are looking for does not exist:
      </Paragraph>
      <Paragraph variant="large">
        <Link href="">{pathname}</Link>
      </Paragraph>
      <Separator className="my-4" />
      <Title variant="h3">Try these</Title>
      <Paragraph variant="default">To be implemented...</Paragraph>
    </main>
  );
}
