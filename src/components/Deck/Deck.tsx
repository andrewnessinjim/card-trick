import * as React from "react";
import styled from "styled-components";

import Card, { CardId } from "../Card";
import { motion } from "motion/react";
import * as WashAnimator from "./WashAnimator";
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
  isResetting: boolean;
}

function Deck({ onCardsDrawn, showControls, isResetting }: Props) {
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
        <WashAnimator.Root
          animate={animatingShuffle}
          onComplete={() => setStatus("idle")}
        >
          {deck.map((card) => (
            <WashAnimator.Item key={card.id}>
              <CardSlot>
                <DeckTableCardMover cardId={card.id} spot="deck">
                  <Card id={card.id} />
                </DeckTableCardMover>
              </CardSlot>
            </WashAnimator.Item>
          ))}
        </WashAnimator.Root>
      </DeckWrapper>

      <ControlsWrapper>
        <Button
          disabled={status === "animating-shuffle"}
          onClick={() => shuffleDeck()}
          show={showControls}
          entryDelay={isResetting ? 1 : 0}
        >
          Shuffle
        </Button>
        <Button
          disabled={status === "animating-shuffle"}
          onClick={() => {
            setDeck(_.dropRight(deck, 21));
            onCardsDrawn(_.takeRight(deck, 21).map((card) => card.id));
          }}
          show={showControls}
          entryDelay={isResetting ? 1 : 0}
        >
          Start
        </Button>
      </ControlsWrapper>
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
