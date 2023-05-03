declare module "preact-router" {
  import { ComponentType } from "preact";

  interface RouteProps {
    path: string;
    component: ComponentType<unknown>;
    [key: string]: unknown;
  }

  interface RouterProps {
    [key: string]: unknown;
  }

  export const Router: ComponentType<RouterProps>;
  export const Route: ComponentType<RouteProps>;
}
