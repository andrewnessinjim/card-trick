"use client";

import * as React from "react";
import Card from "../Card";
import styled from "styled-components";

function Game() {
  return (
    <Wrapper>
      <Card id="D2" />
      <Card id="C2" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

export default Game;
