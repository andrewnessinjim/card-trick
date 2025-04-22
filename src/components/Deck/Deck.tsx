import * as React from "react";
import styled from "styled-components";

import Card, { CardId } from "../Card";
import { motion } from "motion/react";
import TableWashShuffler from "./TableWashShuffler";
import _ from "lodash";
import DeckTableCardMover from "../DeckToTableCardMover";
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
    { id: "D2" },
    { id: "H2" },
    { id: "C2" },
    { id: "S2" },
    
    { id: "D3" },
    { id: "H3" },
    { id: "C3" },
    { id: "S3" },
    
    { id: "D4" },
    { id: "H4" },
    { id: "C4" },
    { id: "S4" },
    
    { id: "D5" },
    { id: "H5" },
    { id: "C5" },
    { id: "S5" },
    
    { id: "D6" },
    { id: "H6" },
    { id: "C6" },
    { id: "S6" },
    
    { id: "D7" },
    { id: "H7" },
    { id: "C7" },
    { id: "S7" },
    
    { id: "D8" },
    { id: "H8" },
    { id: "C8" },
    { id: "S8" },
    
    { id: "D9" },
    { id: "H9" },
    { id: "C9" },
    { id: "S9" },

    { id: "D10" },
    { id: "H10" },
    { id: "C10" },
    { id: "S10" },
    
    { id: "DJ" },
    { id: "HJ" },
    { id: "CJ" },
    { id: "SJ" },
    
    { id: "DQ" },
    { id: "HQ" },
    { id: "CQ" },
    { id: "SQ" },
    
    { id: "DK" },
    { id: "HK" },
    { id: "CK" },
    { id: "SK" },
    
    { id: "DA" },
    { id: "HA" },
    { id: "CA" },
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
              <DeckTableCardMover cardId={card.id} spot="deck">
                <Card id={card.id} />
              </DeckTableCardMover>
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
            disabled={status === "animating-shuffle"}
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
