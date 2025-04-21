"use client";

import * as React from "react";
import Deck from "../Deck";
import Table from "../Table";
import styled from "styled-components";
import { CardId } from "../Card";

function Game() {
  const [playCards, setPlayCards] = React.useState<CardId[]>([]);
  const [started, setStarted] = React.useState(false);
  return (
    <Wrapper>
      <Deck
        onCardsDrawn={(drawnCards) => {
          setPlayCards(drawnCards);
          setStarted(true);
        }}
      />
      <Table cards={playCards} started={started} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Game;
