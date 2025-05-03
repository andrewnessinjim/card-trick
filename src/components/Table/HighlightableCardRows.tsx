import React, { ReactElement } from "react";
import styled from "styled-components";
import { motion } from "motion/react";

import { MEDIA_QUERIES } from "@/constants";
import { useMediaQuery } from "react-responsive";

const Context = React.createContext<ContextType | null>(null);

export function Root({ children }: RootProps) {
  const [tappedRow, setTappedRow] = React.useState<number | null>(null);

  return (
    <Context.Provider value={{ tappedRow, setTappedRow }}>
      <RootWrapper>{children}</RootWrapper>
    </Context.Provider>
  );
}

export function useContext() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(
      "useContext must be used within a Context.Provider (HighlightableCardRows)"
    );
  }
  return context;
}

export function Row({ children, onClick, canHighlight, id }: RowProps) {
  const isTouchDevice = useMediaQuery({ query: "(pointer: coarse)" });

  const { tappedRow, setTappedRow } = useContext();
  const isTapping = tappedRow === id;

  return (
    <RowWrapper
      onTap={() => {
        if (!isTouchDevice) {
          onClick();
          return;
        }

        if (tappedRow !== null) return;

        setTappedRow(id);
        setTimeout(() => {
          setTappedRow(null);
          onClick();
        }, 450);
      }}
      animate={isTapping ? "highlight" : "normal"}
      whileFocus={canHighlight ? "highlight" : "normal"}
      whileHover={canHighlight ? "highlight" : "normal"}
      transition={{
        staggerChildren: 0.015,
      }}
      variants={{
        highlight: {
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          outlineColor: "rgba(255, 255, 255, 1)",
          outlineStyle: "dotted",
          outlineWidth: "3px",
        },
        normal: {
          backgroundColor: "rgba(255, 255, 255, 0)",
          outlineColor: "rgba(255, 255, 255, 0)",
          outlineStyle: "none",
          outlineWidth: "0px",
        },
      }}
    >
      {children}
    </RowWrapper>
  );
}

export function Item({ children }: ItemProps) {
  return (
    <JumperWrapper
      transition={{
        duration: 0.4,
      }}
      variants={{
        highlight: {
          y: [null, -10, 0],
        },
        normal: {
          y: 0,
        },
      }}
    >
      {children}
    </JumperWrapper>
  );
}

const RootWrapper = styled(motion.div)`
  --card-rows-gap: 16px;

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    --card-rows-gap: 8px;
  }

  display: flex;
  flex-direction: column;
  gap: var(--card-rows-gap);

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    flex-direction: row;
  }
`;

const RowWrapper = styled(motion.button)`
  display: flex;
  gap: var(--card-rows-gap);
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    flex-direction: column;
  }
`;

type ContextType = {
  tappedRow: number | null;
  setTappedRow: React.Dispatch<React.SetStateAction<number | null>>;
};

interface RootProps {
  children?: ReactElement<typeof Row> | ReactElement<typeof Row>[];
}

interface RowProps {
  children: React.ReactNode;
  onClick: () => void;
  canHighlight: boolean;
  id: number;
}

interface ItemProps {
  children: React.ReactNode;
}

const JumperWrapper = styled(motion.div)``;
