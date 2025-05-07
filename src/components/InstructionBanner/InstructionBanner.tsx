import * as React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";

import { useInstruction } from "../InstructionProvider";

function InstructionBanner() {
  const { instruction } = useInstruction();

  const displayInstruction = instruction?.value ?? "";
  const instructionKey = instruction?.id ?? "";

  return (
    <Wrapper>
      <AnimatePresence mode="wait">
        <RollingMessage
          key={instructionKey}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{
            type: "tween",
          }}
        >
          {displayInstruction}
        </RollingMessage>
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 4px;
  overflow: hidden;
  
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const RollingMessage = styled(motion.div)``;

export default InstructionBanner;
