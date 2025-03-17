import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/tailwind";
import { Slot } from "@radix-ui/react-slot";
import { PropsWithChildren } from "react";

const paraVariants = cva("", {
  variants: {
    variant: {
      default: "leading-7 [&:not(:first-child)]:mt-6",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      lead: "text-xl text-muted-foreground",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Paragraph({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof paraVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      data-slot="p"
      className={cn(paraVariants({ variant, className }))}
      {...props}
    />
  );
}

const titleVariants = cva("scroll-m-20 font-semibold tracking-tight", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "border-b pb-2 text-3xl first:mt-0",
      h3: "text-2xl",
      h4: "text-xl ",
    },
    color: {
      default: "",
      highlight: "text-highlight",
    },
  },
  defaultVariants: {
    variant: "h1",
    color: "default",
  },
});

function Title({
  className,
  variant,
  color,
  asChild = false,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof titleVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "h1";
  return (
    <Comp
      data-slot={variant ? variant : "h1"}
      className={cn(titleVariants({ variant, color, className }))}
      {...props}
    />
  );
}

interface ListType {
  data?: PropsWithChildren["children"][];
}

const List = ({ data }: ListType) => {
  return data && data?.length > 0 ? (
    <ul className="my-4 ml-6 list-disc [&>li]:mt-1">
      {data.map((val, key) => (
        <li key={key}>{val}</li>
      ))}
    </ul>
  ) : null;
};

type InlineCodeProps = PropsWithChildren;

const InlineCode = ({ children }: InlineCodeProps) => {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
};

type BlockQuoteProps = PropsWithChildren;

const BlockQuote = ({ children }: BlockQuoteProps) => {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
};
const TextTypes = {
  List,
  InlineCode,
  BlockQuote,
};

export { Paragraph, Title, TextTypes };
