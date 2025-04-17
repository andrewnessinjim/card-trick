"use client";

import { motion } from "motion/react";

import CardBack from "@/generated/cards/back-blue";

import Clubs2 from "@/generated/cards/c2";
import Diamonds2 from "@/generated/cards/d2";
import * as React from "react";
import styled, { css } from "styled-components";


const cardIdMap = {
  "C2": Clubs2,
  "D2": Diamonds2
  // "2D": Diamonds2,
};

type Status = "faceUp" | "faceDown";
export type CardId = keyof typeof cardIdMap;

interface Props {
  id: CardId;
  initStatus?: Status;
}

function Card({ id, initStatus = "faceDown" }: Props) {
  const [status, setStatus] = React.useState<Status>(initStatus);
  const CardElement = cardIdMap[id];

  console.log({ status });
  return (
    <Wrapper
      initial={{ rotateY: status === "faceUp" ? 0 : 180 }}
      animate={{ rotateY: status === "faceUp" ? 0 : 180 }}
      transition={{ type: "spring", duration: 1, bounce: 0.4 }}
      onClick={() => {
        console.log("click");
        setStatus((prev) => (prev === "faceUp" ? "faceDown" : "faceUp"));
      }}
    >
      <FrontFace>
        <CardElement height={250}/>
      </FrontFace>
      <BackFace>
        <CardBack height={250} />
      </BackFace>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  width: fit-content;
  position: relative;
  transform-style: preserve-3d;
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

export default Card;
