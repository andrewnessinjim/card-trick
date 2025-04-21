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
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <Game key={resetKey} onReset={resetGame} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Resetter;
