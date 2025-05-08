import * as React from "react";
import styled from "styled-components";
import { motion } from "motion/react";

import Card, { CardId } from "../Card";
import * as WashAnimator from "./WashAnimator";
import DeckTableCardMover from "../DeckTableCardMover";

function Deck({ deck, status, onShuffleAnimationComplete }: Props) {
  const animatingShuffle = status === "animating-shuffle";

  return (
    <Wrapper>
      <WashAnimator.Root
        animate={animatingShuffle}
        onComplete={onShuffleAnimationComplete}
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

type DeckStatus = "idle" | "animating-shuffle";

interface Props {
  deck: Card[];
  status: DeckStatus;
  onShuffleAnimationComplete: () => void;
}

export default Deck;
