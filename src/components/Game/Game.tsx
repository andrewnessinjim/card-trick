"use client";

import * as React from "react";
import Deck from "../Deck";
import Table from "../Table";
import styled from "styled-components";
import Button from "../Button";
import Spacer from "../Spacer";
import useFakeShuffler from "./useFakeShuffler";

interface Props {
  onReset: () => void;
}

type GameStatus = "idle" | "playing" | "resetting" | "completed";
function Game({ onReset }: Props) {
  const {
    cards: tableCards,
    setCards: setTableCards,
    fakeShuffle,
  } = useFakeShuffler();
  const [gameStatus, setGameStatus] = React.useState<GameStatus>("idle");

  const resetGame = React.useCallback(() => {
    onReset();
  }, [onReset]);

  return (
    <Wrapper>
      <TopPanelWrapper>
        <Deck
          showControls={gameStatus === "idle"}
          onCardsDrawn={(drawnCards) => {
            setGameStatus("playing");
            setTableCards(drawnCards);
          }}
        />
        <Button
          onClick={() => {
            if (gameStatus === "playing") {
              setGameStatus("resetting");
            }
          }}
        >
          Reset
        </Button>
      </TopPanelWrapper>
      <Spacer size={32} />
      <Table
        cards={tableCards}
        allFaceDown={gameStatus === "resetting"}
        onAllFaceDown={resetGame}
        fakeShuffle={fakeShuffle}
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
