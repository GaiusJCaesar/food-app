"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Title, Paragraph, TextTypes } from "@/components/ui/text";
import { pageHrefs } from "@/constants/pageConfigs";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Home() {
  return (
    <main className="layout">
      <div>
        <Title>Welcome to</Title>
        <Title color="highlight" className="happy-monkey">
          Foodies
        </Title>
        <Link href={pageHrefs["signup"].href}>
          <Button variant="outline" className="w-full mt-4">
            {pageHrefs["signup"].text}
            <MdOutlineKeyboardArrowRight />
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <div>
        <Title variant="h3">Our goals </Title>
        <Paragraph>
          We are trying to build a reliable food planning website.
        </Paragraph>
        <Title variant="h4" className="mt-4">
          You will be able to:
        </Title>
        <TextTypes.List
          data={[
            "Create a menu of the meals you love!",
            "Organise your week by selecting meals.",
            "Make shopping lists so you never go unprepared...",
          ]}
        />
      </div>
    </main>
  );
}
