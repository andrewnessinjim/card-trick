"use client";

import * as React from "react";
import styled from "styled-components";
import Game from "../Game";
import { AnimatePresence, motion } from "motion/react";

function Resetter() {
  const [resetKey, setResetKey] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();

  const resetGame = React.useCallback(() => {
    startTransition(() => {
      setResetKey((prev) => prev + 1);
    });
  }, []);

  return (
    <Wrapper>
      <Game key={resetKey} onReset={resetGame} />
      <AnimatePresence>
        {isPending && (
          <LoadingIndicator
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading...
          </LoadingIndicator>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const LoadingIndicator = styled(motion.div)`
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
