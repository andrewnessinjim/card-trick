import * as React from "react";
import styled from "styled-components";

import Card, { CardId } from "../Card";
import { motion } from "motion/react";
import TableWashShuffler from "./TableWashShuffler";
import _ from "lodash";
import DeckTableCardMover from "../DeckTableCardMover";
import Button from "../Button";
import DECK_INIT_DATA from "./deckInitData";

export interface Card {
  id: CardId;
}

type Status = "idle" | "animating-shuffle";

interface Props {
  onCardsDrawn: (cards: CardId[]) => void;
  showControls: boolean;
}

function Deck({ onCardsDrawn, showControls }: Props) {
  const [deck, setDeck] = React.useState<Card[]>(DECK_INIT_DATA);
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
              setDeck(_.dropRight(deck, 21));
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
