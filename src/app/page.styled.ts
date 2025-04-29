"use client";

import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  margin-top:  clamp(
    16px,
    6.2vw - 4px,
    32px
  );
  padding-left: 16px;
  padding-right: 16px;
`;
