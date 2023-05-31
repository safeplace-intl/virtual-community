import Testing from "@features/testing";
import {} from "preact/hooks";
import { Route } from "wouter-preact";

export function App() {
  return (
    <>
      <Route path="/">
        <div className="bg-red-500 h-screen w-screen m-auto flex">
          <div className="w-fit h-fit text-white text-2xl m-auto pb-32">
            Clean App
          </div>
        </div>
      </Route>
      <Route path="/testing">
        <Testing />
      </Route>
    </>
  );
}
