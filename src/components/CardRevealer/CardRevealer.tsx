import * as React from "react";
import styled from "styled-components";
import { motion, MotionProps } from "motion/react";

import Card, { CardId } from "../Card/Card";
import Button from "../Button";
import StyledDialog, { useDialogClose } from "../StyledDialog";

function CardRevealer({ cardId, onReset }: Props) {
  return (
    <StyledDialog
      onClose={onReset}
      visibleHeading="The card you picked was"
      visuallyHiddenDescription="See the card you picked in the center of the screen. Click the Reset card to play again."
    >
      <CardAnimationWrapper {...scaleBlurRevealAnimation}>
        <Card id={cardId} status="faceUp" />
      </CardAnimationWrapper>

      <ResetButton />
    </StyledDialog>
  );
}

function ResetButton() {
  const close = useDialogClose();

  return (
    <Button onClick={close} entryDelay={3} animateEntry={true}>
      Reset
    </Button>
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

const CardAnimationWrapper = styled(motion.div)`
  --card-height: 380px;
`;

interface Props {
  cardId: CardId;
  onReset: () => void;
}

export default CardRevealer;
