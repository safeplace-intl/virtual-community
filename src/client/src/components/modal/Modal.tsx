import { ComponentChildren } from "preact";

type ModalPropsType = {
  children: ComponentChildren;
};

export default function Modal({ children }: ModalPropsType) {
  return <div> This is Modal {children}</div>;
}
