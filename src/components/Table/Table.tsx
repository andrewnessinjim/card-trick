import * as React from "react";
import styled from "styled-components";
import Card, { CardId, FLIP_DURATION_SECS } from "../Card";
import { motion } from "motion/react";
import DeckTableCardMover from "../DeckToTableCardMover";
import useCardStatuses from "./useCardStatuses";
import _ from "lodash";

function Table({
  cards,
  allFaceDown,
  onAllFaceDown,
  onRowPick,
}: {
  cards?: CardId[];
  allFaceDown?: boolean;
  onAllFaceDown?: () => void;
  onRowPick: (row: number) => void;
}) {
  const { cardStatuses, setCardStatus, setAllFaceDown } = useCardStatuses(
    _.flatten(cards)
  );

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
        <ClickDetector
          key={cardId}
          onClick={() => {
            if (index >= 0 && index < 7) {
              onRowPick(0);
            } else if (index >= 7 && index < 14) {
              onRowPick(1);
            } else if (index >= 14 && index < 21) {
              onRowPick(2);
            }
          }}
        >
          <DeckTableCardMover
            cardId={cardId}
            order={index}
            spot="table"
            onMoveComplete={() => {
              setCardStatus(cardId, "faceUp");
            }}
          >
            <Card key={cardId} id={cardId} status={cardStatuses[cardId]} />
          </DeckTableCardMover>
        </ClickDetector>
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

const ClickDetector = styled.div``;

export default Table;
