import * as React from "react";
import styled, { css } from "styled-components";
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

import {
  DEFAULT_CARD_HEIGHT_DESKTOP,
  DEFAULT_CARD_HEIGHT_MOBILE,
  MEDIA_QUERIES,
} from "@/constants";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const RawCard = React.memo(function RawCard({ id }: { id: CardId }) {
  const cardElement = cardIdMap[id].Component;
  return cardElement;
});

function Card({
  id,
  status = "faceDown",
  animateEntry = false,
  entryDelay = 0,
}: Props) {
  function getInitialStatus() {
    if (animateEntry || entryDelay) {
      return status === "faceUp" ? "faceDown" : "faceUp";
    }
    return status;
  }
  return (
    <Wrapper
      initial={getInitialStatus()}
      animate={status}
      transition={flipTransitionSettings}
      variants={{
        faceUp: {
          rotateY: 0,
          transition: {
            delay: entryDelay,
            ...flipTransitionSettings,
          },
        },
        faceDown: { rotateY: 180 },
      }}
    >
      <VisuallyHidden>{cardIdMap[id].label}</VisuallyHidden>
      <FrontFace>
        <RawCard id={id} />
      </FrontFace>
      <BackFace>
        <CardBack />
      </BackFace>
    </Wrapper>
  );
}

export const FLIP_DURATION_SECS = 1.2; // seconds

const flipTransitionSettings = {
  type: "spring",
  duration: FLIP_DURATION_SECS,
  bounce: 0,
};

const cardIdMap = {
  C2: { Component: <Clubs2 />, label: "2 of Clubs" },
  C3: { Component: <Clubs3 />, label: "3 of Clubs" },
  C4: { Component: <Clubs4 />, label: "4 of Clubs" },
  C5: { Component: <Clubs5 />, label: "5 of Clubs" },
  C6: { Component: <Clubs6 />, label: "6 of Clubs" },
  C7: { Component: <Clubs7 />, label: "7 of Clubs" },
  C8: { Component: <Clubs8 />, label: "8 of Clubs" },
  C9: { Component: <Clubs9 />, label: "9 of Clubs" },
  C10: { Component: <Clubs10 />, label: "10 of Clubs" },
  CJ: { Component: <ClubsJack />, label: "Jack of Clubs" },
  CQ: { Component: <ClubsQueen />, label: "Queen of Clubs" },
  CK: { Component: <ClubsKing />, label: "King of Clubs" },
  CA: { Component: <ClubsAce />, label: "Ace of Clubs" },
  D2: { Component: <Diamonds2 />, label: "2 of Diamonds" },
  D3: { Component: <Diamonds3 />, label: "3 of Diamonds" },
  D4: { Component: <Diamonds4 />, label: "4 of Diamonds" },
  D5: { Component: <Diamonds5 />, label: "5 of Diamonds" },
  D6: { Component: <Diamonds6 />, label: "6 of Diamonds" },
  D7: { Component: <Diamonds7 />, label: "7 of Diamonds" },
  D8: { Component: <Diamonds8 />, label: "8 of Diamonds" },
  D9: { Component: <Diamonds9 />, label: "9 of Diamonds" },
  D10: { Component: <Diamonds10 />, label: "10 of Diamonds" },
  DJ: { Component: <DiamondsJack />, label: "Jack of Diamonds" },
  DQ: { Component: <DiamondsQueen />, label: "Queen of Diamonds" },
  DK: { Component: <DiamondsKing />, label: "King of Diamonds" },
  DA: { Component: <DiamondsAce />, label: "Ace of Diamonds" },
  H2: { Component: <Hearts2 />, label: "2 of Hearts" },
  H3: { Component: <Hearts3 />, label: "3 of Hearts" },
  H4: { Component: <Hearts4 />, label: "4 of Hearts" },
  H5: { Component: <Hearts5 />, label: "5 of Hearts" },
  H6: { Component: <Hearts6 />, label: "6 of Hearts" },
  H7: { Component: <Hearts7 />, label: "7 of Hearts" },
  H8: { Component: <Hearts8 />, label: "8 of Hearts" },
  H9: { Component: <Hearts9 />, label: "9 of Hearts" },
  H10: { Component: <Hearts10 />, label: "10 of Hearts" },
  HJ: { Component: <HeartsJack />, label: "Jack of Hearts" },
  HQ: { Component: <HeartsQueen />, label: "Queen of Hearts" },
  HK: { Component: <HeartsKing />, label: "King of Hearts" },
  HA: { Component: <HeartsAce />, label: "Ace of Hearts" },
  S2: { Component: <Spades2 />, label: "2 of Spades" },
  S3: { Component: <Spades3 />, label: "3 of Spades" },
  S4: { Component: <Spades4 />, label: "4 of Spades" },
  S5: { Component: <Spades5 />, label: "5 of Spades" },
  S6: { Component: <Spades6 />, label: "6 of Spades" },
  S7: { Component: <Spades7 />, label: "7 of Spades" },
  S8: { Component: <Spades8 />, label: "8 of Spades" },
  S9: { Component: <Spades9 />, label: "9 of Spades" },
  S10: { Component: <Spades10 />, label: "10 of Spades" },
  SJ: { Component: <SpadesJack />, label: "Jack of Spades" },
  SQ: { Component: <SpadesQueen />, label: "Queen of Spades" },
  SK: { Component: <SpadesKing />, label: "King of Spades" },
  SA: { Component: <SpadesAce />, label: "Ace of Spades" },
};

const Wrapper = styled(motion.div)`
  width: fit-content;
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
`;

const Face = css`
  backface-visibility: hidden;
  height: var(--card-height, ${DEFAULT_CARD_HEIGHT_DESKTOP}px);

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    height: var(--card-height, ${DEFAULT_CARD_HEIGHT_MOBILE}px);
  }
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

type Status = "faceUp" | "faceDown";
export type CardId = keyof typeof cardIdMap;

interface Props {
  id: CardId;
  status?: Status;
  animateEntry?: boolean;
  entryDelay?: number;
}

export default React.memo(Card);
