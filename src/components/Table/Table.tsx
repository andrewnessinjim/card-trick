import * as React from "react";
import styled from "styled-components";
import Card, { CardId, FLIP_DURATION_SECS } from "../Card";
import { motion } from "motion/react";
import DeckTableCardMover from "../DeckToTableCardMover";
import useCardStatuses from "./useCardStatuses";
import _ from "lodash";
import Jumper from "./Jumper";

interface Props {
  cardsGrid?: CardId[][];
  allFaceDown?: boolean;
  onAllFaceDown?: () => void;
  onRowPick: (row: number) => void;
}

type TableStatus = "idle" | "animating-shuffle" | "playing";
function Table({ cardsGrid, allFaceDown, onAllFaceDown, onRowPick }: Props) {
  const { cardStatuses, setCardStatus, setAllFaceDown } = useCardStatuses(
    _.flatten(cardsGrid)
  );
  const [focusedRow, setFocusedRow] = React.useState<number | null>(null);
  const [tableStatus, setTableStatus] = React.useState<TableStatus>("idle");

  React.useEffect(() => {
    if (allFaceDown) {
      setAllFaceDown();
      setTimeout(() => {
        onAllFaceDown?.();
      }, FLIP_DURATION_SECS * 1000);
    }
  }, [allFaceDown, setAllFaceDown, onAllFaceDown]);

  function getRowOpacity(rowIndex: number) {
    if (focusedRow === null || tableStatus !== "playing") return 1;
    if (focusedRow === rowIndex) return 1;
    return 0.75;
  }

  return (
    <Wrapper>
      {cardsGrid?.map((cardsRow, rowIndex) => (
        <RowWrapper
          animate={{
            opacity: getRowOpacity(rowIndex),
          }}
          key={rowIndex}
          onClick={() => onRowPick(rowIndex)}
          onMouseEnter={() => setFocusedRow(rowIndex)}
          onMouseLeave={() => setFocusedRow(null)}
          onFocus={() => setFocusedRow(rowIndex)}
          onBlur={() => setFocusedRow(null)}
        >
          {cardsRow.map((cardId, cardIndex) => {
            const isLastCard =
              cardIndex === cardsRow.length - 1 &&
              rowIndex === cardsGrid.length - 1;

            return (
              <Jumper
                key={cardId}
                order={cardIndex}
                jump={tableStatus === "playing" && focusedRow === rowIndex}
              >
                <DeckTableCardMover
                  cardId={cardId}
                  order={rowIndex * cardsRow.length + cardIndex}
                  spot="table"
                  onMoveComplete={() => {
                    if (tableStatus === "idle") {
                      setCardStatus(cardId, "faceUp");
                    }
                  }}
                >
                  <Card
                    id={cardId}
                    status={cardStatuses[cardId]}
                    afterFlip={
                      isLastCard ? () => setTableStatus("playing") : undefined
                    }
                  />
                </DeckTableCardMover>
              </Jumper>
            );
          })}
        </RowWrapper>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: fit-content;
  margin: 0 auto;
`;

const RowWrapper = styled(motion.button)`
  display: flex;
  gap: 16px;
  background-color: transparent;
  border: none;
`;

export default Table;
