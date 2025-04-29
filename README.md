# A Card Trick Web App

You can find the app running [here][6].

This is a remake of my first-ever solo app which I built in 2013 in Java using the Java Swing API. This remake is built using Next.js, React, Motion and TypeScript and it's a work in progress. Along the way, I applied some of the best practices I learned from the [React documentation][2] and the book [A Philosophy of Software Design][3]. I have noted some of the lessons below.

## Lesson: Choosing Names

| First Instinct                      | Improved Name                                               | Suggestion Applied                       |
| ----------------------------------- | ----------------------------------------------------------- | ---------------------------------------- |
| `spreadTrackedCardsInDifferentRows` | `distributeTrackedCards`                                    | Variable name must create a picture      |
| `spreadUntrackedCardsRandomly`      | `scatterUntrackedCards`                                     | Variable name must create a picture      |
| `tableCards` used for two purposes  | Used two variable names: `tableCards` & `fakeShuffledCards` | Each variable must have a unique purpose |

## Lesson: Reducing Obscurity & Simpler API

This is my first version of `TableWashShuffler`:

```jsx
<TableWashShuffler
  animating={animatingShuffle}
  onShufflingAnimationComplete={() => setStatus("idle")}
  keys={deck.map((card) => card.id)}
>
  {deck.map((card) => (
     {/* {...itemToAnimate} */}
  ))}
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

[1]: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
[2]: https://react.dev/learn
[3]: https://www.amazon.in/Philosophy-Software-Design-2nd-ebook/dp/B09B8LFKQL/
[4]: https://react.dev/reference/react/Children#alternatives
[5]: https://react.dev/learn/you-might-not-need-an-effect
[6]: https://card-trick.andrewnessin.com/
