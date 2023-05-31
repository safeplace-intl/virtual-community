import { ComponentChildren } from "preact";

type buttonProps = {
  children: ComponentChildren;
  variant: "primary" | "secondary" | "tertiary" | "chip";
  isDisabled?: boolean;
  onClick?: () => void;
};

/**
 * Atomic component button
 * Variants: Primary, Secondary, Tertiary, ChipStyle
 * Each variant also has a disabled and non disabled state
 */
export default function Button({ variant, children, isDisabled }: buttonProps) {
  // base classes shared across variants
  const baseClasses =
    "py-2 px-4 w-64 text-spi-white-100 content-center rounded-2 width-fit";

  const variantClasses = (isDisabled = false) => {
    switch (variant) {
      case "chip":
        if (isDisabled) {
          return "";
        }
        return "";
      case "tertiary":
        return "";
      case "secondary":
        return "";
      // default is primary
      default:
        return "bg-spi-violet-100";
    }
  };
  return (
    <div className={`${baseClasses} ${variantClasses(isDisabled)}`}>
      {children}
    </div>
  );
}
