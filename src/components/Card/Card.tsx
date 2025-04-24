import { motion } from "motion/react";

import CardBack from "@/generated/cards/back-blue";

import Clubs2 from "@/generated/cards/c2";
import Clubs3 from "@/generated/cards/c3";
import Clubs4 from "@/generated/cards/c4";
import Clubs5 from "@/generated/cards/c5";
import Clubs6 from "@/generated/cards/c6";
import Clubs7 from "@/generated/cards/c7";
import Clubs8 from "@/generated/cards/c8";
import Clubs9 from "@/generated/cards/c9";
import Clubs10 from "@/generated/cards/c10";
import ClubsJack from "@/generated/cards/cj";
import ClubsQueen from "@/generated/cards/cq";
import ClubsKing from "@/generated/cards/ck";
import ClubsAce from "@/generated/cards/ca";

import Diamonds2 from "@/generated/cards/d2";
import Diamonds3 from "@/generated/cards/d3";
import Diamonds4 from "@/generated/cards/d4";
import Diamonds5 from "@/generated/cards/d5";
import Diamonds6 from "@/generated/cards/d6";
import Diamonds7 from "@/generated/cards/d7";
import Diamonds8 from "@/generated/cards/d8";
import Diamonds9 from "@/generated/cards/d9";
import Diamonds10 from "@/generated/cards/d10";
import DiamondsJack from "@/generated/cards/dj";
import DiamondsQueen from "@/generated/cards/dq";
import DiamondsKing from "@/generated/cards/dk";
import DiamondsAce from "@/generated/cards/da";

import Hearts2 from "@/generated/cards/h2";
import Hearts3 from "@/generated/cards/h3";
import Hearts4 from "@/generated/cards/h4";
import Hearts5 from "@/generated/cards/h5";
import Hearts6 from "@/generated/cards/h6";
import Hearts7 from "@/generated/cards/h7";
import Hearts8 from "@/generated/cards/h8";
import Hearts9 from "@/generated/cards/h9";
import Hearts10 from "@/generated/cards/h10";
import HeartsJack from "@/generated/cards/hj";
import HeartsQueen from "@/generated/cards/hq";
import HeartsKing from "@/generated/cards/hk";
import HeartsAce from "@/generated/cards/ha";

import Spades2 from "@/generated/cards/s2";
import Spades3 from "@/generated/cards/s3";
import Spades4 from "@/generated/cards/s4";
import Spades5 from "@/generated/cards/s5";
import Spades6 from "@/generated/cards/s6";
import Spades7 from "@/generated/cards/s7";
import Spades8 from "@/generated/cards/s8";
import Spades9 from "@/generated/cards/s9";
import Spades10 from "@/generated/cards/s10";
import SpadesJack from "@/generated/cards/sj";
import SpadesQueen from "@/generated/cards/sq";
import SpadesKing from "@/generated/cards/sk";
import SpadesAce from "@/generated/cards/sa";

import * as React from "react";
import styled, { css } from "styled-components";

export const FLIP_DURATION_SECS = 1.2; // seconds
const cardIdMap = {
  C2: Clubs2,
  C3: Clubs3,
  C4: Clubs4,
  C5: Clubs5,
  C6: Clubs6,
  C7: Clubs7,
  C8: Clubs8,
  C9: Clubs9,
  C10: Clubs10,
  CJ: ClubsJack,
  CQ: ClubsQueen,
  CK: ClubsKing,
  CA: ClubsAce,
  D2: Diamonds2,
  D3: Diamonds3,
  D4: Diamonds4,
  D5: Diamonds5,
  D6: Diamonds6,
  D7: Diamonds7,
  D8: Diamonds8,
  D9: Diamonds9,
  D10: Diamonds10,
  DJ: DiamondsJack,
  DQ: DiamondsQueen,
  DK: DiamondsKing,
  DA: DiamondsAce,
  H2: Hearts2,
  H3: Hearts3,
  H4: Hearts4,
  H5: Hearts5,
  H6: Hearts6,
  H7: Hearts7,
  H8: Hearts8,
  H9: Hearts9,
  H10: Hearts10,
  HJ: HeartsJack,
  HQ: HeartsQueen,
  HK: HeartsKing,
  HA: HeartsAce,
  S2: Spades2,
  S3: Spades3,
  S4: Spades4,
  S5: Spades5,
  S6: Spades6,
  S7: Spades7,
  S8: Spades8,
  S9: Spades9,
  S10: Spades10,
  SJ: SpadesJack,
  SQ: SpadesQueen,
  SK: SpadesKing,
  SA: SpadesAce,
};

type Status = "faceUp" | "faceDown";
export type CardId = keyof typeof cardIdMap;

interface Props {
  id: CardId;
  status?: Status;
  afterFlip?: () => void;
  height?: number;
}

const RawCard = React.memo(function RawCard({
  id,
  height,
}: {
  id: CardId;
  height: number;
}) {
  const CardElement = cardIdMap[id];
  return <CardElement height={height} />;
});

function Card({ id, status = "faceDown", afterFlip, height = 180 }: Props) {
  return (
    <Wrapper
      style={
        {
          "--height": `${height}px`,
          "--width": height === 180 ? "127.42px" : undefined,
        } as React.CSSProperties
      }
      initial={status}
      animate={status}
      transition={{ type: "spring", duration: FLIP_DURATION_SECS, bounce: 0 }}
      variants={{
        faceUp: { rotateY: 0 },
        faceDown: { rotateY: 180 },
      }}
      onAnimationComplete={() => {
        afterFlip?.();
      }}
    >
      <FrontFace>
        <RawCard id={id} height={height} />
      </FrontFace>
      <BackFace>
        <CardBack height={height} />
      </BackFace>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  width: fit-content;
  position: relative;
  transform-style: preserve-3d;
  height: var(--height, 180px);
  width: var(--width, "auto");
`;

const Face = css`
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
`;

const FrontFace = styled.div`
  ${Face}
`;

const BackFace = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  ${Face}
  transform: rotateY(180deg);
`;

export default React.memo(Card);
