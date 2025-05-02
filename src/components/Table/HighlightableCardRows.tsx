import React, { ReactElement } from "react";
import styled from "styled-components";
import { motion } from "motion/react";

import { MEDIA_QUERIES } from "@/constants";

export function Root({ children }: RootProps) {
  return <RootWrapper>{children}</RootWrapper>;
}

export function Row({ children, onClick, canHighlight }: RowProps) {
  return (
    <RowWrapper
      onClick={onClick}
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

interface RootProps {
  children?: ReactElement<typeof Row> | ReactElement<typeof Row>[];
}

interface RowProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  canHighlight: boolean;
}

interface ItemProps {
  children: React.ReactNode;
}

const JumperWrapper = styled(motion.div)``;
