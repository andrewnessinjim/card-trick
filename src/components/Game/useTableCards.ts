import React from "react";
import { GameStatus } from "./Game";
import { CardId } from "../Card";

export default function useTableCards(
  gameStatus: GameStatus,
  fakeShuffleCards: CardId[]
) {
  const previousTableCards = React.useRef<CardId[]>([]);

  if (gameStatus === "playing") {
    previousTableCards.current = fakeShuffleCards;
  }
  const tableCards =
    gameStatus !== "playing" ? previousTableCards.current : fakeShuffleCards;

  return tableCards;
}
