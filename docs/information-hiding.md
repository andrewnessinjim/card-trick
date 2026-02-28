# Information Hiding

## A Bad Approach

I initially came-up with this hook for counting cards:

```jsx
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
```

This is an example of a shallow module; the interface is as complicated as the implementation.

> "Shallow modules don’t help much in the battle against complexity, because the benefit they provide is negated by the cost of learning and using their interfaces."  
> — A Philosophy of Software Design by John K. Ousterhout

It doesn't hide any information; all its internals are exposed.

> "If you can hide more information, you should also be able to simplify the module’s interface."  
> — A Philosophy of Software Design by John K. Ousterhout

## A Better Approach

I later came-up with this hook for counting cards:

```jsx
import React from "react";

export default function useBatchCountNotifier<T = void>(
  batchCount: number,
  onNotify: (countData: T) => void,
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
```

This hook returns a single function, making the API simpler. It hides the condition used for notifying the consumer, the internal counter, and the reset logic. This is an example of a deep module; the interface is simpler than the implementation. This made the consumer code simpler because it doesn't need to call `reset` or `maxCounted`.