import * as React from "react";
import styled from "styled-components";
import { LayoutGroup, motion } from "motion/react";
import _ from "lodash";
import { useMediaQuery } from "react-responsive";

import Card, { CardId, FLIP_DURATION_SECS } from "../Card";
import DeckTableCardMover from "../DeckTableCardMover";
import * as HighlightableCardRows from "./HighlightableCardRows";
import { useInstruction } from "../InstructionProvider";
import { MEDIA_QUERIES } from "@/constants";

function Table({
  cardsGrid,
  allFaceDown,
  onAllFaceDown,
  onRowPick,
  numRowsPicked,
}: Props) {
  const [tableStatus, setTableStatus] = React.useState<TableStatus>("idle");
  const { showInstruction } = useInstruction();
  const isMobile = useMediaQuery({ query: MEDIA_QUERIES.phoneAndBelow });
  const rowOrCol = isMobile ? "column" : "row";

  if (allFaceDown && tableStatus !== "faceDown") {
    setTableStatus("faceDown");
    setTimeout(() => {
      onAllFaceDown?.();
    }, FLIP_DURATION_SECS * 1000);
  }

  const startPickingWhenIdle = React.useCallback(() => {
    if (tableStatus === "idle") {
      setTableStatus("picking");

      showInstruction(`Think of a card and select the ${rowOrCol} it is in.`);
    }
  }, [tableStatus, showInstruction, rowOrCol]);

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
      showInstruction(`Select the ${rowOrCol} that contains your card now.`);
    }, _.flatten(cardsGrid).length * CARD_SHUFFLE_STAGGER_DELAY * 1000);
  }
  console.log({ tableStatus });
  return (
    <Wrapper>
      <LayoutGroup>
        <HighlightableCardRows.Root>
          {cardsGrid?.map((cardsRow, rowIndex) => (
            <HighlightableCardRows.Row
              key={rowIndex}
              onClick={() => handleRowClick(rowIndex)}
              canHighlight={tableStatus === "picking"}
              id={rowIndex}
            >
              {cardsRow.map((cardId, colIndex) => {
                const isLastCard =
                  rowIndex === cardsGrid.length - 1 &&
                  colIndex === cardsRow.length - 1;

                const cardOrder = rowIndex * cardsRow.length + colIndex;
                const cardEntryStaggerDelay =
                  cardOrder * STATUS_ENTRY_STAGGER_MAP[tableStatus];
                return (
                  <HighlightableCardRows.Item key={cardId}>
                    <DeckTableCardMover
                      cardId={cardId}
                      entryDelay={cardEntryStaggerDelay}
                      spot="table"
                      onMoveComplete={
                        isLastCard ? startPickingWhenIdle : undefined
                      }
                    >
                      <Card
                        id={cardId}
                        entryDelay={
                          tableStatus === "idle"
                            ? cardEntryStaggerDelay + CARD_ENTRY_FLIP_OFFSET
                            : 0
                        }
                        status={allFaceDown ? "faceDown" : "faceUp"}
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

const CARD_SHUFFLE_STAGGER_DELAY = 0.05; // seconds
const CARD_ENTRY_FLIP_OFFSET = 0.25; // seconds

const STATUS_ENTRY_STAGGER_MAP: Record<TableStatus, number> = {
  idle: 0.1,
  picking: 0,
  "shuffle-animating": CARD_SHUFFLE_STAGGER_DELAY,
  faceDown: 0,
};

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: fit-content;
  margin: 0 auto;
`;

interface Props {
  cardsGrid?: CardId[][];
  allFaceDown?: boolean;
  onAllFaceDown?: () => void;
  onRowPick: (row: number) => void;
  numRowsPicked: number;
}

type TableStatus = "idle" | "picking" | "shuffle-animating" | "faceDown";

export default Table;
