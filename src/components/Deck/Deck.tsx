import * as React from "react";
import styled from "styled-components";

import Card, { CardId } from "../Card";
import { motion } from "motion/react";
import TableWashShuffler from "./TableWashShuffler";
import _ from "lodash";
import DeckToTableCardMover from "../DeckToTableCardMover";
import Button from "../Button";

interface Card {
  id: CardId;
}

type Status = "idle" | "animating-shuffle";

interface Props {
  onCardsDrawn: (cards: CardId[]) => void;
  showControls: boolean;
}

function Deck({ onCardsDrawn, showControls }: Props) {
  const [deck, setDeck] = React.useState<Card[]>([
    { id: "C2" },
    { id: "C3" },
    { id: "C4" },
    { id: "C5" },
    { id: "C6" },
    { id: "C7" },
    { id: "C8" },
    { id: "C9" },
    { id: "C10" },
    { id: "CJ" },
    { id: "CQ" },
    { id: "CK" },
    { id: "CA" },
    { id: "D2" },
    { id: "D3" },
    { id: "D4" },
    { id: "D5" },
    { id: "D6" },
    { id: "D7" },
    { id: "D8" },
    { id: "D9" },
    { id: "D10" },
    { id: "DJ" },
    { id: "DQ" },
    { id: "DK" },
    { id: "DA" },
    { id: "H2" },
    { id: "H3" },
    { id: "H4" },
    { id: "H5" },
    { id: "H6" },
    { id: "H7" },
    { id: "H8" },
    { id: "H9" },
    { id: "H10" },
    { id: "HJ" },
    { id: "HQ" },
    { id: "HK" },
    { id: "HA" },
    { id: "S2" },
    { id: "S3" },
    { id: "S4" },
    { id: "S5" },
    { id: "S6" },
    { id: "S7" },
    { id: "S8" },
    { id: "S9" },
    { id: "S10" },
    { id: "SJ" },
    { id: "SQ" },
    { id: "SK" },
    { id: "SA" },
  ]);
  const [status, setStatus] = React.useState<Status>("idle");

  const shuffleDeck = () => {
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
    setStatus("animating-shuffle");
  };

  const animatingShuffle = status === "animating-shuffle";

  return (
    <Wrapper>
      <DeckWrapper>
        <TableWashShuffler
          animating={animatingShuffle}
          onShufflingAnimationComplete={() => setStatus("idle")}
          keys={deck.map((card) => card.id)}
        >
          {deck.map((card) => (
            <CardSlot key={card.id}>
              <DeckToTableCardMover cardId={card.id} spot="deck">
                <Card id={card.id} />
              </DeckToTableCardMover>
            </CardSlot>
          ))}
        </TableWashShuffler>
      </DeckWrapper>
      {showControls && (
        <ControlsWrapper>
          <Button
            disabled={status === "animating-shuffle"}
            onClick={() => shuffleDeck()}
          >
            Shuffle
          </Button>
          <Button
            onClick={() => {
              React.startTransition(() => {
                setDeck(_.dropRight(deck, 21));
              });
              onCardsDrawn(_.takeRight(deck, 21).map((card) => card.id));
            }}
          >
            Start
          </Button>
        </ControlsWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DeckWrapper = styled.div`
  position: relative;
  width: 127.42px;
  height: 180px;
`;

const CardSlot = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
`;
export default Deck;
