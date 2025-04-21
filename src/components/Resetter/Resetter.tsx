"use client";

import * as React from "react";
import styled from "styled-components";
import Game from "../Game";

function Resetter() {
  const [resetKey, setResetKey] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();

  function resetGame() {
    startTransition(() => {
      setResetKey((prev) => prev + 1);
    });
  }
  return (
    <Wrapper>
      <Game key={resetKey} onReset={resetGame} />
      {isPending && <LoadingIndicator>Loading...</LoadingIndicator>}
    </Wrapper>
  );
}

const LoadingIndicator = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  display: grid;
  place-content: center;
  font-size: 3rem;
`;

const Wrapper = styled.div``;

export default Resetter;
