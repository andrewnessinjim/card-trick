import * as React from "react";
import styled from "styled-components";
import Card, { CardId, FLIP_DURATION_SECS } from "../Card";
import { motion } from "motion/react";
import DeckToTableCardMover from "../DeckToTableCardMover";
import useCardStatuses from "./useCardStatuses";

function Table({
  cards,
  allFaceDown,
  onAllFaceDown,
}: {
  cards?: CardId[];
  allFaceDown?: boolean;
  onAllFaceDown?: () => void;
}) {
  const { cardStatuses, setCardStatus, setAllFaceDown } =
    useCardStatuses(cards);

  React.useEffect(() => {
    if (allFaceDown) {
      setAllFaceDown();
      setTimeout(() => {
        onAllFaceDown?.();
      }, FLIP_DURATION_SECS * 1000);
    }
  }, [allFaceDown, setAllFaceDown, onAllFaceDown]);

  return (
    <Wrapper>
      {cards?.map((cardId, index) => (
        <DeckToTableCardMover
          key={cardId}
          cardId={cardId}
          order={index}
          spot="table"
          onMoveComplete={() => {
            setCardStatus(cardId, "faceUp");
          }}
        >
          <Card key={cardId} id={cardId} status={cardStatuses[cardId]} />
        </DeckToTableCardMover>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  width: fit-content;
  margin: 0 auto;
`;

export default Table;
