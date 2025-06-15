import { Paragraph, Title } from "./text";

interface LoadingPageProps {
  pageName: string;
}

const LoadingPage = ({ pageName }: LoadingPageProps) => {
  return (
    <main className="layout gap-y-4">
      <Title color="highlight" className="happy-monkey">
        {pageName}
      </Title>
      <div className="mt-4 bg-primary/50 text-primary-foreground shadow-xs hover:bg-primary/90 p-4 rounded-xl">
        <Title variant="h3">Hold on!</Title>
        <Paragraph variant="medium">
          We&apos;re just getting your data.
        </Paragraph>
      </div>
    </main>
  );
};

export default LoadingPage;
