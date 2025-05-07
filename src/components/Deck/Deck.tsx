import * as React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import _ from "lodash";

import Card, { CardId } from "../Card";
import * as WashAnimator from "./WashAnimator";
import DeckTableCardMover from "../DeckTableCardMover";
import Button from "../Button";
import DECK_INIT_DATA from "./deckInitData";
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

  function drawCards() {
    setDeck(_.dropRight(deck, 21));
    onCardsDrawn(_.takeRight(deck, 21).map((card) => card.id));
    showInstruction("Drawing cards...");
  }

  function handleShuffleComplete() {
    setStatus("idle");
    showInstruction("Click Start to begin!");
  }

  const animatingShuffle = status === "animating-shuffle";

  return (
    <Wrapper>
      <DeckWrapper>
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

      <AnimatePresence mode="popLayout">
        {showControls && (
          <ControlsWrapper>
            <DeckButton
              isResetting={isResetting}
              disabled={status === "animating-shuffle"}
              onClick={handleShuffle}
            >
              Shuffle
            </DeckButton>
            <DeckButton
              isResetting={isResetting}
              disabled={status === "animating-shuffle"}
              onClick={drawCards}
            >
              Start
            </DeckButton>
          </ControlsWrapper>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

function DeckButton({ show, isResetting, ...delegated }: DeckButtonProps) {
  return (
    <Button
      show={show}
      animateEntry={true}
      entryDelay={isResetting ? 1 : 0}
      popLayoutOnExit={true}
      {...delegated}
    />
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
`;

const CardSlot = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;

  &:first-child {
    position: revert;
    top: revert;
    left: revert;
  }
`;

export interface Card {
  id: CardId;
}

type Status = "idle" | "animating-shuffle";

interface Props {
  onCardsDrawn: (cards: CardId[]) => void;
  showControls: boolean;
  isResetting: boolean;
}

interface DeckButtonProps extends React.ComponentProps<typeof Button> {
  show?: boolean;
  isResetting?: boolean;
}

export default Deck;
