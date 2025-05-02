import * as React from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import _ from "lodash";

import Card, { CardId } from "../Card";

function DeckTableCardMover(props: Props) {
  const { cardId, children, spot } = props;

  let delay = 0;
  let onMoveComplete;
  if (spot === "table") {
    const { order, staggerDelay = 0.1 } = props;
    delay = order * staggerDelay;
    onMoveComplete = props.onMoveComplete;
  } else {
    delay = _.random(0, 0.5);
  }

  return (
    <Wrapper
      layoutId={cardId}
      transition={{
        delay,
        duration: spot === "deck" ? 0.5 : undefined,
      }}
      onLayoutAnimationComplete={onMoveComplete}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  will-change: transform;
`;

type CommonProps = {
  cardId: CardId;
  children: React.ReactElement<typeof Card>;
};

interface DeckProps extends CommonProps {
  spot: "deck";
}
interface TableProps extends CommonProps {
  spot: "table";
  order: number;
  staggerDelay?: number;
  onMoveComplete?: () => void;
}

type Props = DeckProps | TableProps;

export default DeckTableCardMover;
