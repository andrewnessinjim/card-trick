import * as React from "react";
import styled from "styled-components";
import { GameStatus } from "../Game";
import { AnimatePresence, motion } from "motion/react";

const INSTRUCTION_MESSAGES: Record<GameStatus, string> = {
  idle: "Click Start to begin!",
  shuffling: "Shuffling... Please wait.",
  playing: "",
  resetting: "Hang on a second...",
  completed: "",
};

const PLAYING_MESSAGES: Record<0 | 1 | 2, string> = {
  0: "Think of a card and select the row it is in.",
  1: "Select the row that contains your card now.",
  2: "Select the row that contains your card now. (Again)",
};

function InstructionBanner({ gameStatus, numRowsPicked }: Props) {
  let message = INSTRUCTION_MESSAGES[gameStatus];
  if (gameStatus === "playing") {
    message = PLAYING_MESSAGES[numRowsPicked as 0 | 1 | 2];
  }

  return (
    <Wrapper>
      <AnimatePresence mode="wait">
        <RollingMessage
          key={message}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{
            type: "tween",
          }}
        >
          {message}
        </RollingMessage>
      </AnimatePresence>
    </Wrapper>
  );
}

interface Props {
  gameStatus: GameStatus;
  numRowsPicked: number;
}

const Wrapper = styled.div`
  background-color: var(--color-decorative-100);
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 4px;
  border: 1px solid var(--color-decorative-300);
  text-align: center;
  overflow: hidden;
  height: 42px;
`;

const RollingMessage = styled(motion.div)``;
export default InstructionBanner;
