import * as React from "react";
import styled, { css } from "styled-components";
import Card, { CardId } from "../Card";
import { LayoutGroup, motion } from "motion/react";
import DeckTableCardMover from "../DeckTableCardMover";
import useCardStatuses from "./useCardStatuses";
import _ from "lodash";
import Jumper from "./Jumper";
import useBatchCountNotifier from "@/hooks/useBatchCountNotifier";

interface Props {
  cardsGrid?: CardId[][];
  allFaceDown?: boolean;
  onAllFaceDown?: () => void;
  onRowPick: (row: number) => void;
}

const CARD_SHUFFLE_STAGGER_DELAY = 0.05; // seconds
type TableStatus = "idle" | "picking" | "shuffle-animating" | "faceDown";
function Table({ cardsGrid, allFaceDown, onAllFaceDown, onRowPick }: Props) {
  const { cardStatuses, setCardStatus, setAllFaceDown } = useCardStatuses(
    _.flatten(cardsGrid)
  );
  const [focusedRow, setFocusedRow] = React.useState<number | null>(null);
  const [tableStatus, setTableStatus] = React.useState<TableStatus>("idle");

  if (allFaceDown && tableStatus !== "faceDown") {
    setAllFaceDown();
    setTableStatus("faceDown");
  }

  function getRowOpacity(rowIndex: number) {
    if (focusedRow === null || tableStatus !== "picking") return 1;
    if (focusedRow === rowIndex) return 1;
    return 0.75;
  }

  const startPickingIfIdle = React.useCallback(() => {
    if (tableStatus === "idle") {
      setTableStatus("picking");
    }
  }, [tableStatus]);

  const { notifiableCount: countFaceDownCard } = useBatchCountNotifier(
    _.flatten(cardsGrid).length,
    () => onAllFaceDown?.()
  );

  function trackFaceDownAndNotifyCompletion(cardId: CardId) {
    setCardStatus(cardId, "faceDown");
    countFaceDownCard();
  }

  console.log({ focusedRow });

  return (
    <Wrapper>
      <LayoutGroup>
        {cardsGrid?.map((cardsRow, rowIndex) => (
          <RowWrapper
            animate={{
              opacity: getRowOpacity(rowIndex),
            }}
            $focused={focusedRow === rowIndex && tableStatus === "picking"}
            key={rowIndex}
            onClick={() => {
              if (tableStatus !== "picking") return;

              setTableStatus("shuffle-animating");
              setTimeout(() => {
                setTableStatus("picking");
              }, _.flatten(cardsGrid).length * CARD_SHUFFLE_STAGGER_DELAY * 1000 + 1000);
              onRowPick(rowIndex);
            }}
            onMouseEnter={() => setFocusedRow(rowIndex)}
            onMouseLeave={() => setFocusedRow(null)}
            onFocus={() => setFocusedRow(rowIndex)}
            onBlur={() => setFocusedRow(null)}
          >
            {cardsRow.map((cardId, colIndex) => {
              const isLastCard =
                rowIndex === cardsGrid.length - 1 &&
                colIndex === cardsRow.length - 1;
              return (
                <Jumper
                  key={cardId}
                  order={colIndex}
                  jump={tableStatus === "picking" && focusedRow === rowIndex}
                >
                  <DeckTableCardMover
                    cardId={cardId}
                    order={rowIndex * cardsRow.length + colIndex}
                    staggerDelay={
                      tableStatus === "picking"
                        ? CARD_SHUFFLE_STAGGER_DELAY
                        : undefined
                    }
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
                      onFaceUp={isLastCard ? startPickingIfIdle : undefined}
                      onFaceDown={
                        tableStatus === "faceDown"
                          ? () => trackFaceDownAndNotifyCompletion(cardId)
                          : undefined
                      }
                    />
                  </DeckTableCardMover>
                </Jumper>
              );
            })}
          </RowWrapper>
        ))}
      </LayoutGroup>
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

const RowWrapper = styled(motion.button)<{ $focused: boolean }>`
  display: flex;
  gap: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline-offset: 2px;

  ${({ $focused }) =>
    $focused &&
    css`
      outline: 3px dotted rgba(255, 255, 255, 0.75);
      background: rgba(255, 255, 255, 0.25);
    `}
`;

export default Table;
