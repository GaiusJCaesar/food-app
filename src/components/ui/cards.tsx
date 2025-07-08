import { DefaultButton } from "./button";

function Default({
  title,
  description,
  onClick,
  buttonTitle,
}: {
  title: string;
  onClick?(): void;
  buttonTitle?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-card shadow-xl">
      <div className="flex flex-col p-6">
        <div className="text-2xl font-bold   text-card-foreground pb-4">
          {title}
        </div>
        <div className=" text-lg   text-card-foreground">{description}</div>
        {onClick && buttonTitle && (
          <div className="flex justify-end pt-4">
            <DefaultButton onClick={onClick}>{buttonTitle}</DefaultButton>
          </div>
        )}
      </div>
    </div>
  );
}

export { Default as DefaultCard };
