"use client";

import * as React from "react";
import styled from "styled-components";

import Deck from "../Deck";
import Table from "../Table";
import Button from "../Button";
import Spacer from "../Spacer";
import useFakeShuffleTracker from "./useFakeShuffleTracker";
import useTableCards from "./useTableCards";
import CardRevealer from "../CardRevealer";
import InstructionBanner from "../InstructionBanner";
import { useInstruction } from "../InstructionProvider";
import { CardId } from "../Card";
import { Info } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { MEDIA_QUERIES } from "@/constants";

export function StartMessage() {
  return (
    <StartMessageWrapper>
      <Info size={24} />
      Click Start to begin!
    </StartMessageWrapper>
  );
}

const StartMessageWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

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
  const isMobile = useMediaQuery({ query: MEDIA_QUERIES.phoneAndBelow });

  const { showInstruction } = useInstruction();
  React.useEffect(() => {
    if (gameStatus === "idle") {
      showInstruction(<StartMessage />);
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

  const isIdle = gameStatus === "idle";
  const isCompactBanner = !isIdle && isMobile;

  const compactInstructionBanner = isCompactBanner && (
    <CompactInstructionWrapper>
      <InstructionBanner />
    </CompactInstructionWrapper>
  );

  const fullInstructionBanner = !isCompactBanner && (
    <>
      <InstructionBanner />
      <Spacer size={16} />
    </>
  );

  return (
    <Wrapper>
      <TopPanelWrapper>
        <Deck
          showControls={isIdle}
          onCardsDrawn={initiateGame}
          isResetting={isResetting}
        />
        {compactInstructionBanner}
        <Button onClick={handleResetting} animateEntry={!isResetting}>
          Reset
        </Button>
      </TopPanelWrapper>
      <Spacer size={16} />
      {fullInstructionBanner}
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

const CompactInstructionWrapper = styled.div`
  max-width: 190px;
`;
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

export default Game;
