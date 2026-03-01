# Lesson: Avoid Shallow Modules (useImperativeHandle)

I initially wrote this hook that exposed 5 properties:

```tsx
export default function useDeck() {
  const [deck, setDeck] = React.useState<Card[]>(DECK_INIT_DATA);
  const [status, setStatus] = React.useState<DeckStatus>("idle");
  // methods omitted for brevity

  return { deck, status, shuffle, drawCards, markShuffleComplete } as const;
}
```

It doesn't encapsulate any complexity. The `Game` component called this hook and passed a few of these properties to the `Deck` component and handled a few of them itself.

Why should the `Game` component know about the `status` of the deck? Why should it mark the shuffle as complete? The `Deck` component should be able to handle all of that internally. I got rid of the hook and moved all the logic into the `Deck` component, and exposed only the `shuffle` and `drawCards` methods. This is the improved `Deck` API:

```tsx
<Deck ref={deckRef} onShuffleAnimationComplete={enableControls} />
```

The `deckRef` exposes only the `shuffle` and `drawCards` methods—the two things that the `Game` component really cares about. The `Deck` component uses `useImperativeHandle` to expose only these two methods. You can see the full implementation of the `Deck` component [here][1].

[1]: https://github.com/andrewnessinjim/card-trick/blob/main/src/components/Deck/Deck.tsx
