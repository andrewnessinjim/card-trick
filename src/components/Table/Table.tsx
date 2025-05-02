import * as React from "react";
import styled from "styled-components";
import Card, { CardId } from "../Card";
import { LayoutGroup, motion } from "motion/react";
import DeckTableCardMover from "../DeckTableCardMover";
import useCardStatuses from "./useCardStatuses";
import _ from "lodash";
import useBatchCountNotifier from "@/hooks/useBatchCountNotifier";
import * as HighlightableCardRows from "./HighlightableCardRows";
import { useInstruction } from "../InstructionProvider";

function Table({
  cardsGrid,
  allFaceDown,
  onAllFaceDown,
  onRowPick,
  numRowsPicked,
}: Props) {
  const { cardStatuses, setCardStatus, setAllFaceDown } = useCardStatuses(
    _.flatten(cardsGrid)
  );
  const [tableStatus, setTableStatus] = React.useState<TableStatus>("idle");
  const { showInstruction } = useInstruction();

  if (allFaceDown && tableStatus !== "faceDown") {
    setAllFaceDown();
    setTableStatus("faceDown");
  }

  const startPickingIfIdle = React.useCallback(() => {
    if (tableStatus === "idle") {
      setTableStatus("picking");
      showInstruction("Think of a card and select the row it is in.");
    }
  }, [tableStatus, showInstruction]);

  const { notifiableCount: countFaceDownNotifiable } = useBatchCountNotifier(
    _.flatten(cardsGrid).length,
    () => onAllFaceDown?.()
  );

  function trackFaceDownAndNotifyCompletion(cardId: CardId) {
    setCardStatus(cardId, "faceDown");
    countFaceDownNotifiable();
  }

  function handleRowClick(rowIndex: number) {
    if (tableStatus !== "picking") return;
    onRowPick(rowIndex);

    //Because this is the last row being picked, no further animation is needed
    if (numRowsPicked === 2) {
      setTableStatus("idle");
      return;
    }

    setTableStatus("shuffle-animating");
    setTimeout(() => {
      setTableStatus("picking");
      showInstruction("Select the row that contains your card now.");
    }, _.flatten(cardsGrid).length * CARD_SHUFFLE_STAGGER_DELAY * 1000 + 1000);
  }

  return (
    <Wrapper>
      <LayoutGroup>
        <HighlightableCardRows.Root>
          {cardsGrid?.map((cardsRow, rowIndex) => (
            <HighlightableCardRows.Row
              key={rowIndex}
              onClick={() => handleRowClick(rowIndex)}
              canHighlight={tableStatus === "picking"}
            >
              {cardsRow.map((cardId, colIndex) => {
                const isLastCard =
                  rowIndex === cardsGrid.length - 1 &&
                  colIndex === cardsRow.length - 1;
                return (
                  <HighlightableCardRows.Item key={cardId}>
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
                  </HighlightableCardRows.Item>
                );
              })}
            </HighlightableCardRows.Row>
          ))}
        </HighlightableCardRows.Root>
      </LayoutGroup>
    </Wrapper>
  );
}

interface Props {
  cardsGrid?: CardId[][];
  allFaceDown?: boolean;
  onAllFaceDown?: () => void;
  onRowPick: (row: number) => void;
  numRowsPicked: number;
}

const CARD_SHUFFLE_STAGGER_DELAY = 0.05; // seconds
type TableStatus = "idle" | "picking" | "shuffle-animating" | "faceDown";

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: fit-content;
  margin: 0 auto;
`;

export default Table;
