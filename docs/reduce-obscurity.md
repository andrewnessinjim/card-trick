# Lesson: Reducing Obscurity

## A Bad Approach

This is my first version of `TableWashShuffler`:

```jsx
<TableWashShuffler
  animating={animatingShuffle}
  onShufflingAnimationComplete={() => setStatus("idle")}
  keys={deck.map((card) => card.id)}
>
  {deck.map((card) => (
    <ItemWrapper>{/** Item to animate */}</ItemWrapper>
  ))}
</TableWashShuffler>
```

It had 3 problems:

1. It had 3 props and the names had extra words.

   > "Every word in a name should provide useful information; words that don’t help to clarify the variable’s meaning just add clutter."  
   > — A Philosophy of Software Design by John K. Ousterhout

2. It wrapped its `children` in a custom wrapper, which is obscure. It's discouraged in the React documentation and the book.

   > "Manipulating children with the Children methods often leads to fragile code. When you pass children to a component in JSX, you don’t usually expect the component to manipulate or transform the individual children."  
   > — [React Documentation][1]

3. Passing the `keys` as an array is obscure. Keys are meant to be used in iterations.

   > "Obscurity creates unknown unknowns, and also contributes to cognitive load."  
   > — A Philosophy of Software Design by John K. Ousterhout

## The Better Approach

Here is my improved version:

```jsx
<WashAnimator.Root
  animate={animatingShuffle}
  onComplete={() => setStatus("idle")}
>
  {deck.map((card, index) => (
    <WashAnimator.Item key={card.id}>{/** Item to animate */}</WashAnimator.Item>
  ))}
</WashAnimator.Root>
```

This versions solves all 3 problems:

1. It has 2 props and the names are shorter, taking advantage of the context. For example, `onComplete` suffices instead of `onShufflingAnimationComplete` because the context is already clear from the component name.

2. It doesn't wrap its children in a custom wrapper, which is less obscure. It instead uses multiple components to represent the animation behavior: `WashAnimator.Root` and `WashAnimator.Item`. I copied this idea from the Radix UI library. This also makes the API simpler with just 2 props, but the implementation a bit more complex by the use of React Context. This is recommended in the book.

   > "The best modules are those whose interfaces are much simpler than their implementations."  
   > — A Philosophy of Software Design by John K. Ousterhout

3. As a bonus, the API for the animation became simpler.

[1]: https://react.dev/reference/react/Children#alternatives