import "./App.css";

import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

import viteLogo from "/vite.svg";

// import { graphql } from "../gql-types";
import reactLogo from "./assets/react.svg";

const getUserQuery = gql/* GraphQL */ `
  query GetUser($userId: Float!) {
    getUser(userId: $userId) {
      id
      email
      fullName
      pronouns
    }
  }
`;

function App() {
  const [count, setCount] = useState(0);

  const { loading, error, data } = useQuery(getUserQuery, {
    variables: { userId: 1 },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
