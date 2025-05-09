import * as React from "react";
import styled from "styled-components";
import { motion, MotionProps } from "motion/react";

import Card, { CardId } from "../Card/Card";
import Button from "../Button";
import StyledDialog from "../StyledDialog";

function CardRevealer({ cardId, onReset }: Props) {
  return (
    <StyledDialog
      visuallyHiddenHeading="The card you picked was"
      visuallyHiddenDescription="See the card you picked in the center of the screen. Click the Reset card to play again."
      initialOpen={true}
      onClose={onReset}
    >
      <Wrapper>
        <Heading>The card you picked was</Heading>
        <CardAnimationWrapper {...scaleBlurRevealAnimation}>
          <Card id={cardId} status="faceUp" />
        </CardAnimationWrapper>

        <Button onClick={onReset} entryDelay={3} animateEntry={true}>
          Reset
        </Button>
      </Wrapper>
    </StyledDialog>
  );
}

const scaleBlurRevealAnimation: MotionProps = {
  initial: { scale: 0, filter: "blur(25px)" },
  animate: { scale: 1, filter: "blur(0px)" },
  transition: {
    scale: {
      type: "spring",
      bounce: 0.25,
      delay: 1,
      duration: 3,
    },
    filter: {
      type: "tween",
      duration: 3,
      ease: "easeIn",
    },
  },
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: min(400px, 90vw);
  padding: 32px;
`;

const CardAnimationWrapper = styled(motion.div)`
  --card-height: 380px;
`;

const Heading = styled(motion.h1)`
  text-align: center;
`;

interface Props {
  cardId: CardId;
  onReset: () => void;
}

export default CardRevealer;
