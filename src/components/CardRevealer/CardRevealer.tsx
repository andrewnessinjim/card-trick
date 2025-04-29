import * as React from "react";
import styled from "styled-components";
import { AnimatePresence, motion, MotionProps } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";

import Card, { CardId } from "../Card/Card";
import Button from "../Button";

function CardRevealer({ cardId, onReset }: Props) {
  const [showResetButton, setShowResetButton] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  return (
    <Wrapper>
      <Dialog.Root open={true}>
        <Dialog.Portal>
          <Dialog.Overlay asChild forceMount>
            <AnimatePresence>
              {!isExiting && <Overlay {...opacityAnimation} />}
            </AnimatePresence>
          </Dialog.Overlay>

          <Dialog.Content asChild forceMount>
            <AnimatePresence onExitComplete={onReset}>
              {!isExiting && (
                <Content {...opacityAnimation}>
                  <Dialog.Title asChild>
                    <Heading>The card you picked was</Heading>
                  </Dialog.Title>
                  <CardAnimationWrapper
                    {...scaleBlurRevealAnimation}
                    onAnimationComplete={() => setShowResetButton(true)}
                  >
                    <Card id={cardId} status="faceUp" height={380} />
                  </CardAnimationWrapper>
                  <ButtonVisibilityWrapper
                    animate={{ opacity: showResetButton ? 1 : 0 }}
                  >
                    <InvisibleButton initial={{ opacity: 0 }}>
                      <Button onClick={() => {}}>Reset</Button>
                    </InvisibleButton>
                    <VisibleButton>
                      <Button
                        onClick={() => setIsExiting(true)}
                        show={showResetButton}
                      >
                        Reset
                      </Button>
                    </VisibleButton>
                  </ButtonVisibilityWrapper>
                </Content>
              )}
            </AnimatePresence>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Wrapper>
  );
}

interface Props {
  cardId: CardId;
  onReset: () => void;
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
  background: rgba(0, 0, 0, 0.95);
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

const Heading = styled(motion.h1)`
  color: white;
`;

const CardAnimationWrapper = styled(motion.div)``;

const ButtonVisibilityWrapper = styled(motion.div)`
  position: relative;
`;
const InvisibleButton = styled(motion.div)`
  opacity: 0;
`;
const VisibleButton = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
`;

export default CardRevealer;
