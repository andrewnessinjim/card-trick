import React from "react";
import { Card } from "./Deck";
import DECK_INIT_DATA from "./deckInitData";
import _ from "lodash";
import { useInstruction } from "../InstructionProvider";

export default function useDeck() {
  const [deck, setDeck] = React.useState<Card[]>(DECK_INIT_DATA);
  const [status, setStatus] = React.useState<DeckStatus>("idle");
  const { showInstruction } = useInstruction();

  const shuffle = () => {
    showInstruction("Shuffling...");
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
    setStatus("animating-shuffle");
  };

  function drawCards() {
    showInstruction("Drawing Cards...");
    setDeck(_.dropRight(deck, 21));
    return _.takeRight(deck, 21).map((card) => card.id);
  }

  function markShuffleComplete() {
    setStatus("idle");
  }

  return { deck, status, shuffle, drawCards, markShuffleComplete } as const;
}

type DeckStatus = "idle" | "animating-shuffle";
