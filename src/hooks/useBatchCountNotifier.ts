import React from "react";

export default function useBatchCountNotifier<T = void>(
  notifyAtCount: number,
  notifyCallback: (incrementData: T) => void
) {
  const counterRef = React.useRef(0);

  function increment(incrementData: T) {
    counterRef.current += 1;

    if (counterRef.current === notifyAtCount) {
      notifyCallback(incrementData);
      counterRef.current = 0;
    }
  }

  return {
    increment,
  };
}
