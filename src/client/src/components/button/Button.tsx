import { ComponentChildren } from "preact";

type buttonProps = {
  children: ComponentChildren;
  variant: "primary" | "secondary" | "tertiary" | "chipset";
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
    "py-2 px-4 w-fit content-center rounded-lg flex justify-center";

  const variantClasses = (isDisabled = false) => {
    switch (variant) {
      case "chipset":
        if (isDisabled) {
          return "text-spi-black-300 font-bold";
        }
        return "text-spi-black-100 font-bold hover:bg-spi-black-300";
      case "tertiary":
        if (isDisabled) {
          return "text-spi-black-300 underline underline-offset-4 font-bold";
        }
        return "text-spi-violet-100 underline underline-offset-4 font-bold hover:text-spi-violet-50";
      case "secondary":
        if (isDisabled) {
          return "bg-spi-white-100 text-black-300 outline-black-300 outline-2 ";
        }
        return "bg-spi-white-100 text-spi-violet-100 outline-spi-violet-100 outline outline-2 hover:outline-spi-violet-50 hover:text-spi-violet-50";
      // default is primary
      default:
        if (isDisabled) {
          return "bg-spi-violet-200 text-spi-white-100 outline-2 outline-bg-spi-violet-200";
        }
        return "bg-spi-violet-100 text-spi-white-100 hover:bg-spi-violet-50";
    }
  };
  return (
    <div className={`${baseClasses} ${variantClasses(isDisabled)}`}>
      {children}
    </div>
  );
}
