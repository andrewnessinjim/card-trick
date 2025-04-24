import * as React from "react";
import Card, { CardId } from "../Card/Card";
import styled from "styled-components";
import { motion } from "motion/react";
import Button from "../Button";

interface Props {
  cardId: CardId;
  onReset: () => void;
}
const scaleBlurAnimation = {
  initial: { scale: 0, filter: "blur(25px)" },
  animate: { scale: 1, filter: "blur(0px)" },
  transition: {
    type: "spring",
    bounce: 0.25,
    delay: 1,
    duration: 3,
  },
};

const opacityAnimation = {
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: 1,
    ease: "easeInOut",
  },
};

function CardRevealer({ cardId, onReset }: Props) {
  const [showResetButton, setShowResetButton] = React.useState(false);
  return (
    <Wrapper {...opacityAnimation}>
      <Heading initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        The Card you picked was
      </Heading>

      <CardAnimationWrapper
        {...scaleBlurAnimation}
        onAnimationComplete={() => setShowResetButton(true)}
      >
        <Card id={cardId} status="faceUp" height={380} />
      </CardAnimationWrapper>
      <ButtonVisibilityWrapper animate={{ opacity: showResetButton ? 1 : 0 }}>
        <Button onClick={onReset}>Reset</Button>
      </ButtonVisibilityWrapper>
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

const Heading = styled(motion.h1)`
  color: white;
`;

const CardAnimationWrapper = styled(motion.div)``;

const ButtonVisibilityWrapper = styled(motion.div)``;

export default CardRevealer;
