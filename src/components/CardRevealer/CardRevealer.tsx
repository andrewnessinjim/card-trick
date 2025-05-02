import * as React from "react";
import styled from "styled-components";
import { AnimatePresence, motion, MotionProps } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import Card, { CardId } from "../Card/Card";
import Button from "../Button";

function CardRevealer({ cardId, onReset }: Props) {
  const [isExiting, setIsExiting] = React.useState(false);

  return (
    <Wrapper>
      <Dialog.Root open={true} modal={true}>
        <Dialog.Portal>
          <Dialog.Overlay forceMount>
            <AnimatePresence>
              {!isExiting && <Overlay {...opacityAnimation} />}
            </AnimatePresence>
          </Dialog.Overlay>

          <Dialog.Content forceMount>
            <AnimatePresence onExitComplete={onReset}>
              {!isExiting && (
                <Content {...opacityAnimation}>
                  <Dialog.Title asChild>
                    <Heading>The card you picked was</Heading>
                  </Dialog.Title>
                  <VisuallyHidden>
                    <Dialog.Description>
                      See the card you picked in the center of the screen. Click
                      the Reset card to play again.
                    </Dialog.Description>
                  </VisuallyHidden>
                  <CardAnimationWrapper {...scaleBlurRevealAnimation}>
                    <Card id={cardId} status="faceUp" />
                  </CardAnimationWrapper>

                  <Button
                    onClick={() => setIsExiting(true)}
                    entryDelay={3}
                    animateEntry={true}
                  >
                    Reset
                  </Button>
                </Content>
              )}
            </AnimatePresence>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Wrapper>
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

const Wrapper = styled(motion.div)``;

const Overlay = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
`;

const Content = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  position: fixed;
  inset: 0;
`;

const Heading = styled(motion.h1)``;

const CardAnimationWrapper = styled(motion.div)`
  --card-height: 380px;
`;

interface Props {
  cardId: CardId;
  onReset: () => void;
}

export default CardRevealer;
