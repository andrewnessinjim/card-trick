import _ from "lodash";
import { motion, MotionProps } from "motion/react";
import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import useCounter from "./useCounter";

interface RootProps {
  children: ReactElement<typeof Item>[];
  onComplete: () => void;
  animate: boolean;
}

type Status = "spreading" | "stacking" | "idle" | "washing";

const animatingStatuses: Status[] = ["spreading", "stacking", "washing"];

type WashAnimatorContextType = {
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  countAnimatedCard: () => void;
  resetAnimatedCardCount: () => void;
  allCardsAnimated: () => boolean;
  onComplete: () => void;
};

const WashAnimatorContext = React.createContext<WashAnimatorContextType | null>(
  null
);

function Root({ children, onComplete, animate }: RootProps) {
  const [status, setStatus] = React.useState<Status>("idle");

  React.useEffect(() => {
    if (animate) {
      setStatus("spreading");
      return;
    }
    setStatus("idle");
  }, [animate]);

  const {
    increment: countAnimatedCard,
    reset: resetAnimatedCardCount,
    maxCounted: allCardsAnimated,
  } = useCounter(children.length);

  return (
    <WashAnimatorContext.Provider
      value={{
        status,
        setStatus,
        countAnimatedCard,
        resetAnimatedCardCount,
        allCardsAnimated,
        onComplete,
      }}
    >
      {children}
    </WashAnimatorContext.Provider>
  );
}

interface ItemProps {
  children: ReactNode;
}

function useWashAnimatorContext() {
  const context = React.useContext(WashAnimatorContext);
  if (!context) {
    throw new Error(
      "useWashAnimatorContext must be used within a WashAnimatorProvider"
    );
  }
  return context;
}

function Item({ children }: ItemProps) {
  const {
    status,
    setStatus,
    countAnimatedCard,
    resetAnimatedCardCount,
    allCardsAnimated,
    onComplete,
  } = useWashAnimatorContext();
  return (
    <ItemWrapper
      {...animationSettings(status)}
      onAnimationComplete={(latest: Status) => {
        const statusFlow: Record<Status, Status> = {
          spreading: "washing",
          washing: "stacking",
          stacking: "idle",
          idle: "idle",
        };

        if (animatingStatuses.includes(latest)) {
          countAnimatedCard();

          if (allCardsAnimated()) {
            resetAnimatedCardCount();

            const nextStatus = statusFlow[latest];
            setStatus(nextStatus);

            if (nextStatus === "idle") {
              onComplete();
            }
          }
        }
      }}
    >
      {children}
    </ItemWrapper>
  );
}

const ItemWrapper = styled(motion.div)`
  perspective: 1000px;
`;

const DELAY_PER_CARD = 0.025; // seconds
const randomDelays = _.range(
  DELAY_PER_CARD,
  DELAY_PER_CARD * 53,
  DELAY_PER_CARD
);

function animationSettings(status: Status): MotionProps {
  const [spreadX, spreadY, spreadRotate] = [
    _.random(0, 400),
    _.random(250, 520),
    _.random(-60, 60),
  ];
  return {
    animate: status,
    variants: {
      spreading: {
        rotate: spreadRotate,
        y: spreadY,
        x: spreadX,
      },
      washing: {
        rotate: [
          null,
          _.random(-180, 180),
          _.random(-180, 180),
          _.random(-60, 60),
        ],
        y: [null, _.random(200, 620), _.random(200, 620), _.random(300, 400)],
        x: [null, _.random(0, 560), _.random(0, 560), _.random(0, 100)],
        transition: {
          type: "tween",
          duration: _.random(1.5, 2.1),
          ease: "easeInOut",
          restDelta: 0.1,
          delay: randomDelays[_.random(0, randomDelays.length - 1)],
        },
      },
      stacking: {
        rotate: 0,
        y: 0,
        x: 0,
      },
      idle: {
        rotate: 0,
        y: 0,
        x: 0,
      },
    },
    transition: {
      type: "spring",
      duration: 1,
      restDelta: 0.1,
      delay: randomDelays[_.random(0, randomDelays.length - 1)],
    },
  };
}

export { Root, Item };
