import Feed from "@pages/feed";
import { Route } from "wouter-preact";

export function App() {
  return (
    <>
      <Route path="/">
        <Feed />
      </Route>
    </>
  );
}
