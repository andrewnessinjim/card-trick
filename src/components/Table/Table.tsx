import * as React from "react";
import styled from "styled-components";
import Card, { CardId } from "../Card";
import { motion } from "motion/react";
import DeckToTableCardMover from "../DeckToTableCardMover";

function Table({ cards }: { cards?: CardId[] }) {
  const [cardStatuses, setCardStatuses] = React.useState<
    Partial<Record<CardId, "faceDown" | "faceUp">>
  >(Object.fromEntries(cards?.map((cardId) => [cardId, "faceDown"]) ?? []));

  return (
    <Wrapper>
      {cards?.map((cardId, index) => (
        <DeckToTableCardMover
          key={cardId}
          cardId={cardId}
          order={index}
          spot="table"
          onMoveComplete={() => {
            setCardStatuses((prev) => ({
              ...prev,
              [cardId]: "faceUp",
            }));
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
