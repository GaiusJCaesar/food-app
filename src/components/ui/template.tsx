import { PropsWithChildren } from "react";
import { Title } from "./text";

interface TemplateProps extends PropsWithChildren {
  title: string;
}

const Template = ({ children, title }: TemplateProps) => {
  return (
    <main className="layout gap-y-4">
      <Title color="highlight" className="happy-monkey">
        {title}
      </Title>
      <section className="mt-4 flex flex-col gap-4">{children}</section>
    </main>
  );
};

export default Template;
