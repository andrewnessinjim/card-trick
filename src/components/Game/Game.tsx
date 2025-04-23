"use client";

import * as React from "react";
import Deck from "../Deck";
import Table from "../Table";
import styled from "styled-components";
import Button from "../Button";
import Spacer from "../Spacer";
import useFakeShuffleTracker from "./useFakeShuffleTracker";
import useTableCards from "./useTableCards";

interface Props {
  onReset: () => void;
}

export type GameStatus = "idle" | "playing" | "resetting" | "completed";
function Game({ onReset }: Props) {
  const {
    cardsGrid: fakeShuffleCardsGrid,
    setCards: setFakeShuffleCards,
    fakeShuffle,
    trackedCard,
  } = useFakeShuffleTracker();
  const [gameStatus, setGameStatus] = React.useState<GameStatus>("idle");
  const [numRowsPicked, setNumRowsPicked] = React.useState(0);

  const tableCardsGrid = useTableCards(gameStatus, fakeShuffleCardsGrid);

  console.log("tableCardsGrid", tableCardsGrid);

  const resetGame = React.useCallback(() => {
    onReset();
  }, [onReset]);

  if (gameStatus === "completed") {
    console.log("The card you picked is", trackedCard);
  }

  return (
    <Wrapper>
      <TopPanelWrapper>
        <Deck
          showControls={gameStatus === "idle"}
          onCardsDrawn={(drawnCards) => {
            setGameStatus("playing");
            setFakeShuffleCards(drawnCards);
          }}
        />
        <Button
          onClick={() => {
            if (gameStatus === "playing" || gameStatus === "completed") {
              setGameStatus("resetting");
            }
          }}
        >
          Reset
        </Button>
      </TopPanelWrapper>
      <Spacer size={32} />
      <Table
        cardsGrid={tableCardsGrid}
        allFaceDown={gameStatus === "resetting"}
        onAllFaceDown={resetGame}
        onRowPick={(row) => {
          console.log("row", row);
          if (gameStatus === "playing") {
            const nextNumRowsPicked = numRowsPicked + 1;
            setNumRowsPicked(nextNumRowsPicked);
            fakeShuffle(row);

            if (nextNumRowsPicked === 3) {
              setGameStatus("completed");
            }
          }
        }}
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
