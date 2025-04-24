import { motion } from "motion/react";
import * as React from "react";
import styled from "styled-components";
import Card, { CardId } from "../Card";
import _ from "lodash";

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
  onMoveComplete?: () => void;
}

type Props = DeckProps | TableProps;

function DeckTableCardMover(props: Props) {
  const { cardId, children, spot } = props;

  let delay = 0;
  let onMoveComplete;
  if (spot === "table") {
    delay = props.order * 0.1;
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

export default DeckTableCardMover;
