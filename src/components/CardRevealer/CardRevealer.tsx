import * as React from "react";
import Card, { CardId } from "../Card/Card";
import styled from "styled-components";
import { motion } from "motion/react";
import Button from "../Button";

interface Props {
  cardId: CardId;
  onReset: () => void;
}

function CardRevealer({ cardId, onReset }: Props) {
  return (
    <Wrapper
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <Heading>The Card you picked was</Heading>
      <CardWrapper
        initial={{ scale: 0, filter: "blur(25px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{
          type: "spring",
          bounce: 0.25,
          delay: 1,
          duration: 3,
        }}
      >
        <Card id={cardId} status="faceUp" height={380} />
      </CardWrapper>
      <Button onClick={onReset}>Reset</Button>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const Heading = styled.h1`
  color: white;
`;

const CardWrapper = styled(motion.div)``;

export default CardRevealer;
