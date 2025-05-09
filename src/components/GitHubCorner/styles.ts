"use client";

import { MEDIA_QUERIES } from "@/constants";
import styled, { keyframes } from "styled-components";

const octocatWave = keyframes`
  0%, 100% { transform: rotate(0); }
  20%, 60% { transform: rotate(-25deg); }
  40%, 80% { transform: rotate(10deg); }
`;

export const OctoArm = styled.path`
  transform-origin: 130px 106px;
`;

export const Wrapper = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  border: 0;

  &:hover ${OctoArm} {
    animation: ${octocatWave} 560ms ease-in-out;
  }

  @media ${MEDIA_QUERIES.tabletAndBelow} {
    display: none;
  }
`;

export const Svg = styled.svg`
  fill: var(--color-card-back-light);
  color: var(--color-decorative-200);
`;
