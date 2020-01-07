import React from "react";
import { createGlobalStyle } from "styled-components";
import RapalExerciseComponent from "./RapalExerciseComponent";

const GlobalStyles = createGlobalStyle`
  html {
    font-family: monospace;
    font-size: 16px;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <RapalExerciseComponent />
    </>
  );
}

export default App;
