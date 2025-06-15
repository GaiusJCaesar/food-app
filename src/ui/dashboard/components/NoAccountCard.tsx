"use client";
import { Link, Paragraph, Title } from "@/components/ui/text";
import { otherHrefs } from "@/constants/pageConfigs";
import { useRouter } from "next/navigation";

const NoAccountCard = () => {
  const router = useRouter();

  const handler = () => {
    router.push(otherHrefs.createAccount.href);
  };
  return (
    <div className="bg-primary/50 text-primary-foreground shadow-xs hover:bg-primary/90 p-4 rounded-xl">
      <Title variant="h3">That's a good start!</Title>
      <Paragraph variant="medium">Now time to create your account.</Paragraph>
      <Link onClick={handler}>Let's create</Link>
    </div>
  );
};

export default NoAccountCard;
