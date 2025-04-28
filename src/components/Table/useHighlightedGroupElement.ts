import React from "react";

export default function useHighlightedGroupElement(): [
  number | null,
  (index: number) => (element: HTMLElement | null) => void
] {
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(
    null
  );

  function register(index: number) {
    return (element: HTMLElement | null) => {
      if (!element) {
        return;
      }

      const enableHighlight = () => setHighlightedIndex(index);

      const disableHighlight = () =>
        setHighlightedIndex((current) => (current === index ? null : current));

      element.addEventListener("mouseenter", enableHighlight);
      element.addEventListener("focus", enableHighlight);
      element.addEventListener("mouseleave", disableHighlight);
      element.addEventListener("blur", disableHighlight);

      return () => {
        element.removeEventListener("mouseenter", enableHighlight);
        element.removeEventListener("focus", enableHighlight);
        element.removeEventListener("mouseleave", disableHighlight);
        element.removeEventListener("blur", disableHighlight);
      };
    };
  }

  return [highlightedIndex, register];
}
