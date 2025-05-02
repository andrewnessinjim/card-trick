import * as React from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import _ from "lodash";

import Card, { CardId } from "../Card";
import * as WashAnimator from "./WashAnimator";
import DeckTableCardMover from "../DeckTableCardMover";
import Button from "../Button";
import DECK_INIT_DATA from "./deckInitData";
import BlueBack from "@/generated/cards/back-blue-plain";
import { DEFAULT_CARD_HEIGHT } from "@/constants";
import { useInstruction } from "../InstructionProvider";

function Deck({ onCardsDrawn, showControls, isResetting }: Props) {
  const [deck, setDeck] = React.useState<Card[]>(DECK_INIT_DATA);
  const [status, setStatus] = React.useState<Status>("idle");
  const { showInstruction } = useInstruction();

  const shuffleDeck = () => {
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
    setStatus("animating-shuffle");
  };

  function handleShuffle() {
    shuffleDeck();
    showInstruction("Shuffling...");
  }

  function handleShuffleComplete() {
    setStatus("idle");
    showInstruction("Click Start to begin!");
  }

  const animatingShuffle = status === "animating-shuffle";

  return (
    <Wrapper>
      <DeckWrapper>
        <InvisibleCard>
          <BlueBackWrapper>
            <BlueBack />
          </BlueBackWrapper>
        </InvisibleCard>
        <WashAnimator.Root
          animate={animatingShuffle}
          onComplete={handleShuffleComplete}
        >
          {deck.map((card) => (
            <CardSlot key={card.id}>
              <WashAnimator.Item>
                <DeckTableCardMover cardId={card.id} spot="deck">
                  <Card id={card.id} />
                </DeckTableCardMover>
              </WashAnimator.Item>
            </CardSlot>
          ))}
        </WashAnimator.Root>
      </DeckWrapper>

      <ControlsWrapper>
        <Button
          disabled={status === "animating-shuffle"}
          onClick={handleShuffle}
          show={showControls}
          animateEntry={true}
          entryDelay={isResetting ? 1 : 0}
        >
          Shuffle
        </Button>
        <Button
          disabled={status === "animating-shuffle"}
          onClick={() => {
            setDeck(_.dropRight(deck, 21));
            onCardsDrawn(_.takeRight(deck, 21).map((card) => card.id));
            showInstruction("Drawing...");
          }}
          show={showControls}
          animateEntry={true}
          entryDelay={isResetting ? 1 : 0}
        >
          Start
        </Button>
      </ControlsWrapper>
    </Wrapper>
  );
}

export interface Card {
  id: CardId;
}

type Status = "idle" | "animating-shuffle";

interface Props {
  onCardsDrawn: (cards: CardId[]) => void;
  showControls: boolean;
  isResetting: boolean;
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
`;

const CardSlot = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
`;

const InvisibleCard = styled(motion.div)`
  opacity: 0;
`;

const BlueBackWrapper = styled.div`
  height: ${DEFAULT_CARD_HEIGHT}px;
`;

export default Deck;
