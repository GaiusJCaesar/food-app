import { cn } from "@/lib/tailwind";
import { cva, VariantProps } from "class-variance-authority";
import { Paragraph } from "./text";

const inputVariants = cva("bg-primary/60  border-2 p-3 rounded-md ", {
  variants: {
    variant: {
      default: "",
      error: "border-destructive",
    },
    isFullWidth: {
      true: "block w-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    isFullWidth: false,
  },
});

function Input({
  variant,
  isFullWidth,
  id,
  label,
  description,
  error,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    label: string;
    description?: string;
    error?: string;
  }) {
  const isError = error && error !== "" && error.length > 0;

  const variantFromError = !!isError ? "error" : "default";
  return (
    <div className="block w-full">
      <label htmlFor={id} className="block mb-1 text-2xl">
        {label}
      </label>
      {description && <Paragraph variant="muted">{description}</Paragraph>}
      <input
        id={id}
        {...props}
        className={cn(
          inputVariants({ variant: variant || variantFromError, isFullWidth })
        )}
      />
      {!!isError && error && <Paragraph variant={"error"}>error</Paragraph>}
    </div>
  );
}

export { Input };
