import React from "react";

export default function useOneTimeCountNotifier(notifier: () => void) {
  const counterRef = React.useRef(0);
  const targetCountRef = React.useRef<null | number>(null);

  function setNotifyAtCount(targetCount: number) {
    targetCountRef.current = targetCount;
  }

  function notifiableCount() {
    if (targetCountRef.current === null) {
      throw new Error(
        "Target count is not set. Please set it before incrementing."
      );
    }

    counterRef.current += 1;
    if (counterRef.current === targetCountRef.current) {
      notifier();
      counterRef.current = 0;
      targetCountRef.current = null;
    }

    return;
  }

  return {
    setNotifyAtCount,
    notifiableCount,
  };
}
