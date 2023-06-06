import { ComponentChildren } from "preact";

type TextboxPropsType = {
  children: ComponentChildren;
};

export default function TextBox({ children }: TextboxPropsType) {
  return <div>This is textbox {children}</div>;
}
