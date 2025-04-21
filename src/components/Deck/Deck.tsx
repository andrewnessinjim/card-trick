import * as React from "react";
import styled from "styled-components";

import Card, { CardId } from "../Card";
import { motion } from "motion/react";
import TableWashShuffler from "./TableWashShuffler";

interface Card {
  id: CardId;
}

type Status = "idle" | "animating-shuffle";
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

  const shuffleDeck = () => {
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
    setStatus("animating-shuffle");
  };

  const animatingShuffle = status === "animating-shuffle";

  return (
    <Wrapper>
      <button onClick={() => shuffleDeck()}>Shuffle</button>
      <DeckWrapper>
        <TableWashShuffler
          animating={animatingShuffle}
          onShufflingAnimationComplete={() => setStatus("idle")}
          keys={deck.map((card) => card.id)}
        >
          {deck.map((card) => (
            <CardSlot key={card.id}>
              <Card id={card.id} />
            </CardSlot>
          ))}
        </TableWashShuffler>
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

const CardSlot = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
`;
export default Deck;
