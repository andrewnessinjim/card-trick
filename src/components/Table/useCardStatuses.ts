import React from "react";
import { CardId } from "../Card";

export default function useCardStatuses(cards?: CardId[]) {
  const [cardStatuses, setCardStatuses] = React.useState<
    Partial<Record<CardId, "faceDown" | "faceUp">>
  >(Object.fromEntries(cards?.map((cardId) => [cardId, "faceDown"]) ?? []));

  function setCardStatus(cardId: CardId, status: "faceDown" | "faceUp") {
    setCardStatuses((prev) => ({
      ...prev,
      [cardId]: status,
    }));
  }

  const setAllFaceDown = React.useCallback(() => {
    setCardStatuses((prevCards) => ({
      ...Object.fromEntries(
        Object.keys(prevCards).map((cardId) => [cardId, "faceDown"])
      ),
    }));
  }, []);

  return {
    cardStatuses,
    setCardStatus,
    setAllFaceDown,
  };
}
