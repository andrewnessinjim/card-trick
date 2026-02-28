"use client";

import * as React from "react";
import styled from "styled-components";

import Deck, { DeckHandle } from "../Deck";
import Table from "../Table";
import Button from "../Button";
import Spacer from "../Spacer";
import useFakeShuffleTracker from "./useFakeShuffleTracker";
import useTableCards from "./useTableCards";
import CardRevealer from "../CardRevealer";
import InstructionBanner from "../InstructionBanner";
import { useInstruction } from "../InstructionProvider";
import { Info } from "lucide-react";
import ControlPanel from "./ControlPanel";

function Game({ onReset, isResetting }: Props) {
  const {
    cardsGrid: fakeShuffledCardsGrid,
    setCards: setFakeShuffleCards,
    fakeShuffle,
    trackedCard,
  } = useFakeShuffleTracker();

  const [gameStatus, setGameStatus] = React.useState<GameStatus>("idle");
  const [numRowsPicked, setNumRowsPicked] = React.useState(0);
  const [disableControls, setDisableControls] = React.useState(false);

  const tableCardsGrid = useTableCards(gameStatus, fakeShuffledCardsGrid);
  const deckRef = React.useRef<DeckHandle>(null);

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

  function initiateGame() {
    setGameStatus("playing");
    setFakeShuffleCards(deckRef.current?.drawCards() ?? []);
  }

  function enableControls() {
    showInstruction("Click Start to begin!");
    setDisableControls(false);
  }

  function shuffleDeck() {
    setDisableControls(true);
    deckRef.current?.shuffle();
  }

  const isIdle = gameStatus === "idle";

  const instructionBanner = (
    <InstructionWrapper>
      <InstructionBanner />
    </InstructionWrapper>
  );

  return (
    <Wrapper>
      <TopPanelWrapper>
        <Deck
          ref={deckRef}
          onShuffleAnimationComplete={enableControls}
        />
        {instructionBanner}
        <Button
          onClick={handleResetting}
          animateEntry={!isResetting}
          entryDelay={0.5}
        >
          Reset
        </Button>
      </TopPanelWrapper>
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
      <ControlPanel
        showControls={isIdle}
        disabled={disableControls}
        onShuffle={shuffleDeck}
        onStart={initiateGame}
        onAbout={() => {}}
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
  gap: 16px;
`;

const InstructionWrapper = styled.div`
  flex-shrink: 9999;
`;

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

interface Props {
  onReset: () => void;
  isResetting?: boolean;
}

export type GameStatus =
  | "idle"
  | "playing"
  | "resetting"
  | "completed"
  | "shuffling";

export default Game;
