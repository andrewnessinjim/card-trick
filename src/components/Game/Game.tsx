"use client";

import * as React from "react";
import Deck from "../Deck";
import Table from "../Table";
import styled from "styled-components";
import { CardId } from "../Card";
import Button from "../Button";
import Spacer from "../Spacer";

interface Props {
  onReset: () => void;
}

type Status = "idle" | "playing" | "resetting";
function Game({ onReset }: Props) {
  const [playCards, setPlayCards] = React.useState<CardId[]>([]);
  const [status, setStatus] = React.useState<Status>("idle");

  const resetGame = React.useCallback(() => {
    onReset();
  }, [onReset]);

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
        <Button
          onClick={() => {
            if (status === "playing") {
              setStatus("resetting");
            }
          }}
        >
          Reset
        </Button>
      </TopPanelWrapper>
      <Spacer size={32} />
      <Table
        cards={playCards}
        allFaceDown={status === "resetting"}
        onAllFaceDown={resetGame}
      />
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
