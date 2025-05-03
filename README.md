# A Card Trick Web App: Applying Lessons from the React Docs and the Book "A Philosophy of Software Design"

You can find the app running [here][6].

This is a remake of my first-ever solo app which I built in 2013 in Java using the Java Swing API. This remake is built using Next.js, React, Motion and TypeScript and it's a work in progress. Along the way, I applied some of the best practices I learned from the [React documentation][2] and the book [A Philosophy of Software Design][3]. I have noted some of the lessons below.

- [Lesson: Choosing Names](#lesson-choosing-names)
- [Lesson: Reducing Obscurity & Simpler API](#lesson-reducing-obscurity--simpler-api)
- [Lesson: Avoid Effects As Much As Possible](#lesson-avoid-effects-as-much-as-possible)
- [Lesson: Information Hiding](#lesson-information-hiding)
- [Lesson: Avoiding Unnecessary Re-renders](#lesson-avoiding-unnecessary-re-renders)
- [Usability: Wrong Affordance](#usability-wrong-affordance)

## Lesson: Choosing Names

| First Instinct                      | Improved Name                                               | Suggestion Applied                       |
| ----------------------------------- | ----------------------------------------------------------- | ---------------------------------------- |
| `spreadTrackedCardsInDifferentRows` | `distributeTrackedCards`                                    | Variable name must create a picture      |
| `spreadUntrackedCardsRandomly`      | `scatterUntrackedCards`                                     | Variable name must create a picture      |
| `tableCards` used for two purposes  | Used two variable names: `tableCards` & `fakeShuffledCards` | Each variable must have a unique purpose |

## Lesson: Reducing Obscurity & Simpler API

### The Bad Way

This is my first version of `TableWashShuffler`:

```jsx
<TableWashShuffler
  animating={animatingShuffle}
  onShufflingAnimationComplete={() => setStatus("idle")}
  keys={deck.map((card) => card.id)}
>
  {deck.map((card) => ({
    /* {...itemToAnimate} */
  }))}
</TableWashShuffler>
```

It had 3 problems:

1. It had 3 props and the names had extra words.

   > "Every word in a name should provide useful information; words that don’t help to clarify the variable’s meaning just add clutter."  
   > — A Philosophy of Software Design by John K. Ousterhout

2. It wrapped its `children` in a custom wrapper, which is a bit obscure. It's discouraged in the React documentation and the book.

   > "Manipulating children with the Children methods often leads to fragile code. When you pass children to a component in JSX, you don’t usually expect the component to manipulate or transform the individual children."  
   > — [React Documentation][4]

3. Passing the `keys` as an array is a bit obscure. Keys are usually used in iterations.

   > "Obscurity creates unknown unknowns, and also contributes to cognitive load."  
   > — A Philosophy of Software Design by John K. Ousterhout

### The Better Way

Here is my improved version is:

```jsx
<WashAnimator.Root
  animate={animatingShuffle}
  onComplete={() => setStatus("idle")}
>
  {deck.map((card, index) => (
    <WashAnimator.Item key={card.id}>//{...itemToAnimate}</WashAnimator.Item>
  ))}
</WashAnimator.Root>
```

This versions solves all 3 problems:

1. It has 2 props and the names are shorter, taking advantage of the context. For example, `onComplete` suffices instead of `onShufflingAnimationComplete` because the context is already clear from the component name.

2. It doesn't wrap its children in a custom wrapper, which is less obscure. It instead uses multiple components to represent the animation behavior: `WashAnimator.Root` and `WashAnimator.Item`. I copied this idea from the Radix UI library. This also makes the API simpler with just 2 props, but the implementation a bit more complex by the use of React Context. This is recommended in the book.

   > "The best modules are those whose interfaces are much simpler than their implementations."  
   > — A Philosophy of Software Design by John K. Ousterhout

## Lesson: Avoid Effects As Much As Possible

Instead of using the following `useEffect` in `WashAnimator.Root`:

```jsx
React.useEffect(() => {
  if (animate) {
    setStatus("spreading");
    return;
  }
}, [animate]);
```

We can directly set the status while rendering the component (as suggested in [the official React documentation][1]):

```jsx
const shouldStartAnimation = animate && status === "idle";
if (shouldStartAnimation) {
  setStatus("spreading");
}
```

This avoids unnecessary re-renders and makes the code more readable.

> "Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone."  
> — [React Documentation][5]

## Lesson: Information Hiding

### The Bad Way

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

### The Better Way

I later came-up with this hook for counting cards:

```jsx
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
```

This hook returns a single function, making the API simpler. It hides the condition used for notifying the consumer, the internal counter, and the reset logic. This is an example of a deep module; the interface is simpler than the implementation. This made the consumer code simpler because it doesn't need to call `reset` or `maxCounted` to do its job, it can pass in its job as a callback and have the hook do the rest.

## Usability: Wrong Affordance

This is was my first version of the initial screen:

![Screenshot showing an information rendered like a button](/docs/usability-wrong-affordance.png "Incorrect Affordance")

I noticed that one of my friends clicked on the text "Click Start to begin!" because it looked like a button. However, my intention was to make it standout so the user notices it first. I used an info icon next to the text and removed the button-like appearance after this observation:

![Screenshot showing information rendered as text next to an icon](/docs/usability-right-affordance.png "Correct Affordance")

[1]: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
[2]: https://react.dev/learn
[3]: https://www.amazon.in/Philosophy-Software-Design-2nd-ebook/dp/B09B8LFKQL/
[4]: https://react.dev/reference/react/Children#alternatives
[5]: https://react.dev/learn/you-might-not-need-an-effect
[6]: https://card-trick.andrewnessin.com/
