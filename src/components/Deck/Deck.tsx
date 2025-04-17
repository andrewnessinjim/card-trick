import * as React from "react";
import styled from "styled-components";

import _ from "lodash";

import Card, { CardId } from "../Card";
import { motion, MotionProps } from "motion/react";

interface Card {
  id: CardId;
}

const pileIndexMap: Record<number, number> = {
  0: -450,
  1: -150,
  2: 150,
  3: 450,
};

const randomDelays = _.shuffle(_.range(0.05, 0.05 * 52, 0.05));

function cardMovementAnimation(
  id: CardId,
  index: number,
  status: Status
): MotionProps {
  return {
    layoutId: id,
    animate:
      status === "fanning-out"
        ? {
            rotate: (index - 32) * -2,
            y: 120,
            x: pileIndexMap[index % 4],
          }
        : {
            rotate: 0,
            y: 0,
            x: 0,
          },

    transition: {
      type: "spring",
      duration: 1,
      restDelta: 0.1,
      delay: status === "fanning-out" ? index * 0.05 : randomDelays[index],
    },
  };
}

type Status = "idle" | "stacking" | "fanning-out" | "fanning-in" | "shuffling";
function Deck() {
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
  const cardMovedCount = React.useRef(0);

  const shuffleDeck = () => {
    const t0 = performance.now();
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    const t1 = performance.now();
    console.log("Shuffle time: ", t1 - t0);
    setDeck(shuffledDeck);
    setStatus("fanning-out");
  };

  console.log({ status, deck });
  return (
    <Wrapper>
      <button onClick={() => shuffleDeck()}>Shuffle</button>
      <DeckWrapper>
        {deck.map((card, index) => (
          <CardSlot key={card.id}>
            <CardMovementAnimator
              {...cardMovementAnimation(card.id, index, status)}
              onAnimationComplete={() => {
                if (status === "fanning-out") {
                  cardMovedCount.current += 1;
                  if (cardMovedCount.current === deck.length) {
                    cardMovedCount.current = 0;
                    setStatus("idle");
                    // setDeck((prev) => {
                    //   const shuffledDeck = [...prev];
                    //   for (let i = shuffledDeck.length - 1; i > 0; i--) {
                    //     const j = Math.floor(Math.random() * (i + 1));
                    //     [shuffledDeck[i], shuffledDeck[j]] = [
                    //       shuffledDeck[j],
                    //       shuffledDeck[i],
                    //     ];
                    //   }
                    //   return shuffledDeck;
                    // });
                  }
                }
              }}
            >
              <Card id={card.id} />
            </CardMovementAnimator>
          </CardSlot>
        ))}
      </DeckWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DeckWrapper = styled.div`
  position: relative;
  width: 127.42px;
`;

const CardMovementAnimator = styled(motion.div)`
  transform-origin: top left;
`;

const CardSlot = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
`;
export default Deck;
