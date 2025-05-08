import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";

import BlueBack from "@/generated/cards/back-blue-plain";
import { MEDIA_QUERIES } from "@/constants";
import React from "react";

export default function Button({
  onClick,
  children,
  disabled = false,
  show = true,
  animateEntry = false,
  entryDelay = 0,
  popLayoutOnExit = false,
  animateExit = false,
}: Props) {
  const [stateEntryDelay, setStateEntryDelay] = React.useState(entryDelay);

  function resetStateEntryDelay(latest: string) {
    // We need to delay entry only on first mount. The first time the state becomes enabled is after the first mount.
    if (latest === "enabled" && stateEntryDelay !== 0) {
      setStateEntryDelay(0);
    }
  }

  return (
    <AnimatePresence
      mode={popLayoutOnExit ? "popLayout" : undefined}
      propagate={true}
    >
      {show && (
        <Wrapper
          onAnimationComplete={resetStateEntryDelay}
          onClick={onClick}
          initial={animateEntry ? "exit" : "enabled"}
          animate={disabled ? "disabled" : "enabled"}
          whileHover={disabled ? "disabled" : "hover"}
          whileFocus={disabled ? "disabled" : "hover"}
          whileTap={disabled ? "disabled" : "tap"}
          exit={animateExit ? "exit" : undefined}
          disabled={disabled}
          variants={{
            hover: {
              y: -10,
              transition: {
                type: "spring",
                duration: 0.5, // Make it smooth
                bounce: 0.2,
              },
            },
            tap: { opacity: 1, scale: 0.95, y: 0 },
            disabled: { opacity: 0.5, scale: 1, y: 0 },
            enabled: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { delay: stateEntryDelay },
            },
            exit: {
              opacity: 0,
              scale: 0.95,
              y: +200,
              transition: {
                type: "spring",
                duration: 0.5,
                bounce: 0,
              },
            },
          }}
          transition={{
            type: "spring",
            duration: 0.5,
            bounce: 0.2,
          }}
        >
          <ButtonText>{children}</ButtonText>
          <CardWrapper>
            <BlueBack />
          </CardWrapper>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

const Wrapper = styled(motion.button)`
  display: inline-block;
  height: 136px;
  @media ${MEDIA_QUERIES.phoneAndBelow} {
    height: 96px;
  }
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  padding: 0;
  background: none;
  font-weight: bold;
  color: inherit;
`;

const ButtonText = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  text-transform: uppercase;

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    text-transform: capitalize;
  }
`;

const CardWrapper = styled.div`
  height: 100%;
`;

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  show?: boolean;
  animateEntry?: boolean;
  animateExit?: boolean;
  entryDelay?: number;
  popLayoutOnExit?: boolean;
}
