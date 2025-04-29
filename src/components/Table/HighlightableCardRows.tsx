import { motion } from "motion/react";
import styled from "styled-components";
import React from "react";
import useHighlightedGroupElement from "./useHighlightedGroupElement";

export function Root({ canHighlight, children }: RootProps) {
  const [highlightedRowIndex, registerHighlightRow] =
    useHighlightedGroupElement();

  return (
    <HighlightableRowContext.Provider
      value={{ canHighlight, highlightedRowIndex, registerHighlightRow }}
    >
      <RootWrapper>{children}</RootWrapper>
    </HighlightableRowContext.Provider>
  );
}

export function Row({ children, order, onClick }: RowProps) {
  const { highlightedRowIndex, registerHighlightRow, canHighlight } =
    useHighlightableContext();

  const shouldHighlightRow = highlightedRowIndex === order && canHighlight;

  return (
    <HighlightableItemContext.Provider value={shouldHighlightRow}>
      <RowWrapper
        ref={registerHighlightRow(order)}
        onClick={onClick}
        animate={{ ...rowAnimation(shouldHighlightRow) }}
      >
        {children}
      </RowWrapper>
    </HighlightableItemContext.Provider>
  );
}

export function Item({ order, children }: ItemProps) {
  const shouldHighlightRow = React.useContext(HighlightableItemContext);

  return (
    <Jumper order={order} jump={shouldHighlightRow}>
      {children}
    </Jumper>
  );
}

function Jumper({ children, jump, order }: JumperProps) {
  return (
    <JumperWrapper
      animate={{
        y: jump ? [null, -10, 0] : 0,
      }}
      transition={{
        duration: 0.4,
        delay: order * 0.015,
      }}
    >
      {children}
    </JumperWrapper>
  );
}

interface RootProps {
  canHighlight: boolean;
  children: React.ReactNode;
}

interface RowProps {
  children: React.ReactNode;
  order: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ItemProps {
  order: number;
  children: React.ReactNode;
}

interface JumperProps {
  children: React.ReactNode;
  jump: boolean;
  order: number;
}

interface ContextProps {
  canHighlight: boolean;
  highlightedRowIndex: number | null;
  registerHighlightRow: (
    index: number
  ) => (element: HTMLElement | null) => void;
}

const HighlightableRowContext = React.createContext<ContextProps | null>(null);
const HighlightableItemContext = React.createContext<boolean>(false);

function useHighlightableContext() {
  const context = React.useContext(HighlightableRowContext);
  if (context === null) {
    throw new Error(
      "useHighlightableContext must be used within a HighlightableProvider"
    );
  }
  return context;
}

function rowAnimation(shouldHighlightRow: boolean) {
  return shouldHighlightRow
    ? {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        outlineColor: "rgba(255, 255, 255, 1)",
        outlineStyle: "dotted",
        outlineWidth: "3px",
      }
    : {
        backgroundColor: "rgba(255, 255, 255, 0)",
        outlineColor: "rgba(255, 255, 255, 0)",
        outlineStyle: "none",
        outlineWidth: "0px",
      };
}

const RootWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RowWrapper = styled(motion.button)`
  display: flex;
  gap: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const JumperWrapper = styled(motion.div)``;
