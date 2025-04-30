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
import InstructionBanner from "../InstructionBanner";
import { useInstruction } from "../InstructionProvider";
import { CardId } from "../Card";

interface Props {
  onReset: () => void;
  isResetting: boolean;
}

export type GameStatus =
  | "idle"
  | "playing"
  | "resetting"
  | "completed"
  | "shuffling";
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

  const { showInstruction } = useInstruction();
  React.useEffect(() => {
    if (gameStatus === "idle") {
      showInstruction("Click Start to begin!");
    }
  }, [gameStatus, showInstruction]);

  const resetGame = React.useCallback(() => {
    onReset();
  }, [onReset]);

  function handleResetting() {
    if (gameStatus === "playing" || gameStatus === "completed") {
      setGameStatus("resetting");
      showInstruction("Hang on a second...");
    }
  }

  function handleRowPick(row: number) {
    if (gameStatus === "playing") {
      const nextNumRowsPicked = numRowsPicked + 1;
      setNumRowsPicked(nextNumRowsPicked);
      fakeShuffle(row);

      const isLastRow = nextNumRowsPicked === 3;
      if (isLastRow) {
        setGameStatus("completed");
      } else {
        showInstruction("Shuffling...");
      }
    }
  }

  function initiateGame(drawnCards: CardId[]) {
    setGameStatus("playing");
    setFakeShuffleCards(drawnCards);
  }

  return (
    <Wrapper>
      <TopPanelWrapper>
        <Deck
          showControls={gameStatus === "idle"}
          onCardsDrawn={initiateGame}
          isResetting={isResetting}
        />
        <Button onClick={handleResetting} animateEntry={!isResetting}>
          Reset
        </Button>
      </TopPanelWrapper>
      <Spacer size={16} />
      <InstructionBanner />
      <Spacer size={16} />
      <Table
        cardsGrid={tableCardsGrid}
        allFaceDown={gameStatus === "resetting"}
        onAllFaceDown={resetGame}
        onRowPick={handleRowPick}
        numRowsPicked={numRowsPicked}
      />
      {gameStatus === "completed" && trackedCard && (
        <CardRevealer cardId={trackedCard} onReset={handleResetting} />
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
