import React from "react";

export default function useBatchCountNotifier<T = void>(
  batchCount: number,
  onNotify: (countData: T) => void
) {
  const counterRef = React.useRef(0);

  function notifiableCount(countData: T) {
    counterRef.current += 1;

    if (counterRef.current === batchCount) {
      onNotify(countData);
      counterRef.current = 0;
    }
  }

  return {
    notifiableCount,
  };
}
