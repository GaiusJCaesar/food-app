import { cn } from "@/lib/tailwind";
import { cva, VariantProps } from "class-variance-authority";
import { Paragraph } from "./text";
import Select, { ActionMeta, GroupBase, OptionsOrGroups } from "react-select";

const inputVariants = cva(
  "px-3 py-2 text-md rounded-lg border focus:outline focus:outline-2 focus:outline-offset-2 bg-[#ffffff] text-[#444444] focus:outline-[#aaaaaa] border-[#cccccc]",
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive",
      },
      isFullWidth: {
        true: "block w-full",
        false: "",
      },
      isToggle: {
        false: "",
        true: "h-8 w-8 ",
      },
    },
    defaultVariants: {
      variant: "default",
      isFullWidth: false,
      isToggle: false,
    },
  }
);

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
    <div className="block w-full mt-2">
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

function Toggle({
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
    <div className="block w-full mt-2">
      <label htmlFor={id} className="block mb-1 text-2xl">
        {label}
      </label>
      {description && <Paragraph variant="muted">{description}</Paragraph>}
      <input
        type="checkbox"
        id={id}
        {...props}
        className={cn(
          inputVariants({
            variant: variant || variantFromError,
            isFullWidth,
            isToggle: true,
          })
        )}
      />
      {!!isError && error && <Paragraph variant={"error"}>error</Paragraph>}
    </div>
  );
}

interface SelectorProps {
  label: string;
  options: OptionsOrGroups<unknown, GroupBase<unknown>>;
  onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
  value?: string;
}

const Selector = ({ label, options, ...others }: SelectorProps) => {
  return (
    <div className="block w-full mt-2">
      <h3 className="block mb-1 text-2xl">{label}</h3>
      <Select
        {...others}
        styles={{
          control: (styles) => ({
            ...styles,
            background: "white",
            borderRadius: 8,
            paddingTop: 4,
            paddingBottom: 4,
            fontSize: "var(--text-base)",
            lineHeight: "var(--text-base)",
          }),
          groupHeading: (base) => ({
            ...base,
            fontSize: "var(--text-sm)",
            fontWeight: "bold",
            color: "var(--card-foreground)",
            paddingTop: 8,
            paddingBottom: 4,
          }),
          option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            background: isFocused
              ? "var(--muted)"
              : isSelected
              ? "var(--secondary)"
              : undefined,
          }),
        }}
        options={options}
      />
    </div>
  );
};

function TextInput({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-[#ffffff] selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-[#ffffff] px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input, Toggle, Selector, TextInput };
