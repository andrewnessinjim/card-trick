"use client";

import * as React from "react";
import Deck from "../Deck";
import Table from "../Table";
import styled from "styled-components";
import Button from "../Button";
import Spacer from "../Spacer";
import useFakeShuffleTracker from "./useFakeShuffleTracker";
import useTableCards from "./useTableCards";
import CardRevealer from "../CardRevealer";

interface Props {
  onReset: () => void;
  isResetting: boolean;
}

export type GameStatus = "idle" | "playing" | "resetting" | "completed";
function Game({ onReset, isResetting }: Props) {
  const {
    cardsGrid: fakeShuffleCardsGrid,
    setCards: setFakeShuffleCards,
    fakeShuffle,
    trackedCard,
  } = useFakeShuffleTracker();
  const [gameStatus, setGameStatus] = React.useState<GameStatus>("idle");
  const [numRowsPicked, setNumRowsPicked] = React.useState(0);

  const tableCardsGrid = useTableCards(gameStatus, fakeShuffleCardsGrid);

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
            setFakeShuffleCards(drawnCards);
          }}
          isResetting={isResetting}
        />
        <Button
          onClick={() => {
            if (gameStatus === "playing" || gameStatus === "completed") {
              setGameStatus("resetting");
            }
          }}
          animateEntry={!isResetting}
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
      {gameStatus === "completed" && trackedCard && (
        <CardRevealer
          cardId={trackedCard}
          onReset={() => setGameStatus("resetting")}
        />
      )}
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
