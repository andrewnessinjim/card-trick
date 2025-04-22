import _ from "lodash";
import { motion, MotionProps } from "motion/react";
import React from "react";
import styled from "styled-components";
import useCounter from "./useCounter";

interface Props {
  children: React.ReactNode[];
  onShufflingAnimationComplete: () => void;
  animating: boolean;
  keys: string[];
}

type Status = "spreading" | "stacking" | "idle" | "washing";

const animatingStatuses: Status[] = ["spreading", "stacking", "washing"];

const DELAY_PER_CARD = 0.025; // seconds
const randomDelays = _.shuffle(
  _.range(DELAY_PER_CARD, DELAY_PER_CARD * 53, DELAY_PER_CARD)
);

function animationSettings(index: number, status: Status): MotionProps {
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
          delay: randomDelays[index],
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
      delay: randomDelays[index],
    },
  };
}

function TableWashShuffler({
  children,
  onShufflingAnimationComplete,
  animating,
  keys,
}: Props) {
  const [status, setStatus] = React.useState<Status>("idle");

  React.useEffect(() => {
    if (animating) {
      setStatus("spreading");
      return;
    }
    setStatus("idle");
  }, [animating]);

  const {
    count: countAnimatedCards,
    reset: resetAnimatedCardsCount,
    maxCounted: maxAnimationCardsCountReached,
  } = useCounter(children.length);

  console.log("status", status);
  return children.map((child, index) => {
    return (
      <Wrapper
        {...animationSettings(index, status)}
        key={keys[index]}
        onAnimationComplete={(latest: Status) => {
          const statusFlow: Record<Status, Status> = {
            spreading: "washing",
            washing: "stacking",
            stacking: "idle",
            idle: "idle",
          };

          if (animatingStatuses.includes(latest)) {
            countAnimatedCards();

            if (maxAnimationCardsCountReached()) {
              resetAnimatedCardsCount();

              const nextStatus = statusFlow[latest];
              setStatus(nextStatus);

              if (nextStatus === "idle") {
                onShufflingAnimationComplete();
              }
            }
          }
        }}
      >
        {child}
      </Wrapper>
    );
  });
}

const Wrapper = styled(motion.div)`
  perspective: 1000px;
`;

export default TableWashShuffler;
