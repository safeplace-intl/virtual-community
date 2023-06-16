import { ComponentChildren } from "preact";
import { Router, useLocation, useRouter } from "wouter-preact";

type NestedRouterProps = {
  base: string;
  children: ComponentChildren;
};

export default function NestedRouter({ children, base }: NestedRouterProps) {
  const router = useRouter();
  const [parentLocation] = useLocation();

  const nestedBasePath = `${router.base}${base}`;

  if (!parentLocation.includes(nestedBasePath)) {
    return null;
  }

  return (
    <Router base={nestedBasePath} key={nestedBasePath}>
      {children}
    </Router>
  );
}
