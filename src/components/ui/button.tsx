import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/tailwind";
import { isMobile } from "react-device-detect";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      isSelected: {
        true: "text-primary-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isSelected: false,
    },
  }
);

function Button({
  className,
  variant,
  size,
  isSelected,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className, isSelected }))}
      {...props}
    />
  );
}

function DefaultButton(props: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={cn(
        "bg-card-button text-card-foreground w-full font-bold text-base  p-3 rounded-lg hover:bg-primary active:scale-95 transition-transform transform",
        props.className
      )}
    />
  );
}

type ButtonProps = React.ComponentProps<typeof Button>;

const PinnedButton = ({ children }: React.PropsWithChildren) => {
  return (
    isMobile && (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg shadow-2xl rounded-t-2xl p-4 shadow-lg">
        {children}
      </div>
    )
  );
};

export { Button, buttonVariants, DefaultButton, PinnedButton };
export type { ButtonProps };
