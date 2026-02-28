import * as React from "react";
import styled from "styled-components";
import { motion } from "motion/react";

import Card, { CardId } from "../Card";
import * as WashAnimator from "./WashAnimator";
import DeckTableCardMover from "../DeckTableCardMover";
import DECK_INIT_DATA from "./deckInitData";
import { useInstruction } from "../InstructionProvider";
import _ from "lodash";

function Deck({ onShuffleAnimationComplete, ref }: Props) {
  const { showInstruction } = useInstruction();
  const [deck, setDeck] = React.useState<Card[]>(DECK_INIT_DATA);
  const [isAnimatingShuffle, setIsAnimatingShuffle] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    shuffle() {
      showInstruction("Shuffling...");
      const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffledDeck);
      setIsAnimatingShuffle(true);
    },
    drawCards() {
      showInstruction("Drawing Cards...");
      setDeck(_.dropRight(deck, 21));
      return _.takeRight(deck, 21).map((card) => card.id);
    },
  }));

  return (
    <Wrapper>
      <WashAnimator.Root
        animate={isAnimatingShuffle}
        onComplete={() => {
          setIsAnimatingShuffle(false);
          onShuffleAnimationComplete();
        }}
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

export interface DeckHandle {
  shuffle: () => void;
  drawCards: () => CardId[];
}
interface Props {
  onShuffleAnimationComplete: () => void;
  ref: React.Ref<DeckHandle>;
}

export default Deck;
