import styled from "styled-components";
import BlueBack from "@/generated/cards/back-blue-plain";
import { motion } from "motion/react";

export default function Button({ onClick, children, disabled = false }: Props) {
  return (
    <Wrapper
      onClick={onClick}
      animate={disabled ? "disabled" : "enabled"}
      whileHover={disabled ? "disabled" : "hover"}
      whileFocus={disabled ? "disabled" : "hover"}
      whileTap={disabled ? "disabled" : "tap"}
      disabled={disabled}
      variants={{
        hover: {
          rotateZ: [2, 0, -2, 0],
          transition: {
            repeat: Infinity, // Keep repeating
            repeatType: "reverse", // Repeat normally (can also use "reverse" for back-and-forth)
            duration: 1, // Make it smooth
            ease: "easeInOut",
          },
        },
        tap: { scale: 0.95 },
        disabled: { opacity: 0.5, scale: 1 },
        enabled: { opacity: 1 },
      }}
    >
      <ButtonText>{children}</ButtonText>
      <CardWrapper>
        <BlueBack />
      </CardWrapper>
    </Wrapper>
  );
}

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
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
  color: white;
  font-weight: bold;
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
