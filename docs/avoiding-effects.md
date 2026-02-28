# Avoid Effects As Much As Possible

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
> — [React Documentation][2]

[1]: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
[2]: https://react.dev/learn/you-might-not-need-an-effect
