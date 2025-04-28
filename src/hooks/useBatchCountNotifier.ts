import React from "react";

export default function useBatchCountNotifier<T = void>(
  batchCount: number,
  onNotify: (incrementData: T) => void
) {
  const counterRef = React.useRef(0);

  function notifiableCount(incrementData: T) {
    counterRef.current += 1;

    if (counterRef.current === batchCount) {
      onNotify(incrementData);
      counterRef.current = 0;
    }
  }

  return {
    notifiableCount,
  };
}
