import styled from "styled-components";
import BlueBack from "@/generated/cards/back-blue-plain";
import { AnimatePresence, motion } from "motion/react";

export default function Button({
  onClick,
  children,
  disabled = false,
  show = true,
  animateEntry = true,
  entryDelay = 0,
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <Wrapper
          onClick={onClick}
          initial={animateEntry ? "exit" : "enabled"}
          animate={disabled ? "disabled" : "enabled"}
          whileHover={disabled ? "disabled" : "hover"}
          whileFocus={disabled ? "disabled" : "hover"}
          whileTap={disabled ? "disabled" : "tap"}
          exit={"exit"}
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
              transition: { delay: entryDelay },
            },
            exit: {
              opacity: 0,
              scale: 1,
              y: -200,
              transition: {
                type: "spring",
                duration: 0.5,
                bounce: 0.2,
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

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  show?: boolean;
  animateEntry?: boolean;
  entryDelay?: number;
}

const Wrapper = styled(motion.button)`
  display: inline-block;
  height: 136px;
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
`;

const CardWrapper = styled.div`
  height: 100%;
`;
