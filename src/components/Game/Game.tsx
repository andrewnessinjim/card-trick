"use client";

import * as React from "react";
import Deck from "../Deck";
import Table from "../Table";
import styled from "styled-components";
import { CardId } from "../Card";
import Button from "../Button";

interface Props {
  onReset: () => void;
}

type Status = "idle" | "playing";
function Game({ onReset }: Props) {
  const [playCards, setPlayCards] = React.useState<CardId[]>([]);
  const [status, setStatus] = React.useState<Status>("idle");

  return (
    <Wrapper>
      <TopPanelWrapper>
        <Deck
          showControls={status === "idle"}
          onCardsDrawn={(drawnCards) => {
            setStatus("playing");
            React.startTransition(() => {
              setPlayCards(drawnCards);
            });
          }}
        />
        <Button onClick={onReset}>Reset</Button>
      </TopPanelWrapper>
      <Table cards={playCards} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopPanelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Game;
