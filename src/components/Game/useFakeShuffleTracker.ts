import React from "react";
import { CardId } from "../Card";
import _ from "lodash";

interface TrackingCard {
  id: CardId;
  trackCount: number;
}

export default function useFakeShuffleTracker() {
  const [trackingCardsGrid, setTrackingCardsGrid] = React.useState<
    TrackingCard[][]
  >([]);

  const cardsGrid: CardId[][] = trackingCardsGrid.map((row) =>
    row.map((card) => card.id)
  );

  function setCards(cards: CardId[]) {
    if (cards.length === 0 || cards.length !== 21) {
      throw new Error("Invalid number of cards. Expected 21 cards.");
    }

    const playCards: TrackingCard[] = cards.map((cardId) => ({
      id: cardId,
      trackCount: 0,
    }));

    React.startTransition(() => {
      setTrackingCardsGrid(_.chunk(playCards, 7));
    });
  }

  function fakeShuffle(trackRowIndex: number) {
    console.log("fakeShuffle row", trackRowIndex);
    const nextTrackingCardsGrid = createEmptyGrid(3, 7);
    const trackedRow = trackingCardsGrid[trackRowIndex];

    distributeTrackedCards();
    scatterUntrackedCards();
    scatterUntrackedOfTrackedRow();

    setTrackingCardsGrid(nextTrackingCardsGrid);

    // console.log(nextTrackingCardsGrid);

    function distributeTrackedCards() {
      const trackedCards = findTracked();
      let currentRow = 0;
      for (let col = 0; col < trackedCards.length; col++) {
        const trackedCard = trackedCards[col];
        const nextTrackedCard = {
          ...trackedCard,
          trackCount: trackedCard.trackCount + 1,
        };
        placeInEmptySlotInRow(
          nextTrackingCardsGrid,
          nextTrackedCard,
          currentRow
        );

        currentRow = (currentRow + 1) % 3;
      }

      function findTracked() {
        const maxTrackCount = _.maxBy(trackedRow, "trackCount")?.trackCount;
        return _.filter(
          trackedRow,
          (card) => card.trackCount === maxTrackCount
        );
      }
    }

    function scatterUntrackedCards() {
      _.without([0, 1, 2], trackRowIndex).forEach((row) => {
        for (let col = 0; col < 7; col++) {
          placeInEmptySlot(nextTrackingCardsGrid, {
            ...trackingCardsGrid[row][col],
          });
        }
      });
    }

    function scatterUntrackedOfTrackedRow() {
      function findUntrackedInTrackedRow() {
        const maxTrackCount = _.maxBy(trackedRow, "trackCount")?.trackCount;
        return _.filter(
          trackedRow,
          (card) => card.trackCount !== maxTrackCount
        );
      }

      const untrackedCardsInTrackedRow = findUntrackedInTrackedRow();
      untrackedCardsInTrackedRow.forEach((card) => {
        placeInEmptySlot(nextTrackingCardsGrid, {
          ...card,
        });
      });
    }
  }

  const trackedCard = _.maxBy(_.flatten(trackingCardsGrid), "trackCount")?.id;
  // console.log("trackedCard", trackedCard);

  return {
    cardsGrid,
    setCards,
    fakeShuffle,
    trackedCard,
  };
}

function pickEmptySlot(
  matrix: (TrackingCard | null)[][]
): [number, number] | null {
  const nullPositions: [number, number][] = [];

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === null) {
        nullPositions.push([rowIndex, colIndex]);
      }
    });
  });

  return _.sample(nullPositions) ?? null;
}

function pickEmptySlotInRow(
  matrix: (TrackingCard | null)[][],
  rowIndex: number
): [number, number] | null {
  const nullPositions: [number, number][] = [];

  matrix[rowIndex].forEach((cell, colIndex) => {
    if (cell === null) {
      nullPositions.push([rowIndex, colIndex]);
    }
  });

  return _.sample(nullPositions) ?? null;
}

function createEmptyGrid(rows: number, cols: number) {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

function placeInEmptySlot(grid: (TrackingCard | null)[][], card: TrackingCard) {
  const emptySlot = pickEmptySlot(grid);
  if (emptySlot == null) {
    throw new Error("No empty slot found in the matrix.");
  }
  grid[emptySlot[0]][emptySlot[1]] = card;
}

function placeInEmptySlotInRow(
  grid: (TrackingCard | null)[][],
  card: TrackingCard,
  rowIndex: number
) {
  const emptySlot = pickEmptySlotInRow(grid, rowIndex);
  if (emptySlot == null) {
    throw new Error("No empty slot found in the row.");
  }
  grid[emptySlot[0]][emptySlot[1]] = card;
}
