import React from "react";

export default function useCounter(maxCount: number) {
  const counter = React.useRef(0);

  function count() {
    counter.current += 1;
  }

  function maxCounted() {
    return counter.current === maxCount;
  }

  function reset() {
    counter.current = 0;
  }

  return {
    count,
    reset,
    maxCounted,
  };
}
