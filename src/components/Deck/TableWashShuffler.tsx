import _ from "lodash";
import { motion, MotionProps } from "motion/react";
import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode[];
  onShufflingAnimationComplete: () => void;
  animating: boolean;
  keys: string[];
}

type Status = "spreading" | "stacking" | "idle";

const DELAY_PER_CARD = 0.025; // seconds
const randomDelays = _.shuffle(
  _.range(DELAY_PER_CARD, DELAY_PER_CARD * 53, DELAY_PER_CARD)
);
const randomYs = _.times(52, () => _.random(200, 380));
const randomXs = _.times(52, () => _.random(-225, 225));
const randomRotation = _.sampleSize(_.without(_.range(-60, 60), 0), 52);

function animationSettings(index: number, status: Status): MotionProps {
  return {
    animate:
      status === "spreading"
        ? {
            rotate: randomRotation[index],
            y: randomYs[index],
            x: randomXs[index],
          }
        : {
            rotate: 0,
            y: 0,
            x: 0,
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

  const animationCounter = React.useRef(0);

  return children.map((child, index) => {
    return (
      <Wrapper
        {...animationSettings(index, status)}
        key={keys[index]}
        onAnimationComplete={(latest: { rotate: number }) => {
          if (status === "spreading") {
            if (latest.rotate !== 0) {
              animationCounter.current += 1;
            }

            if (animationCounter.current === children.length) {
              setStatus("stacking");
              animationCounter.current = 0;
            }
          }

          if (status === "stacking") {
            if (latest.rotate === 0) {
              animationCounter.current += 1;
            }

            if (animationCounter.current === children.length) {
              setStatus("idle");
              animationCounter.current = 0;
              onShufflingAnimationComplete();
            }
          }
        }}
      >
        {child}
      </Wrapper>
    );
  });
}

const Wrapper = styled(motion.div)``;

export default TableWashShuffler;
