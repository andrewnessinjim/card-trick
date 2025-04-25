import React from "react";

export default function useCounter(maxCount: number) {
  const counter = React.useRef(0);

  const increment = React.useCallback(() => {
    counter.current += 1;
  }, []);

  const maxCounted = React.useCallback(() => {
    return counter.current === maxCount;
  }, [maxCount]);

  const reset = React.useCallback(() => {
    counter.current = 0;
  }, []);

  return {
    increment,
    reset,
    maxCounted,
  };
}
