import CleanApp from "@pages/clean-app-page";
import Testing from "@pages/testing";
import { Route } from "wouter-preact";

export function App() {
  return (
    <>
      <Route path="/">
        <CleanApp />
      </Route>
      <Route path="/testing">
        <Testing />
      </Route>
    </>
  );
}
