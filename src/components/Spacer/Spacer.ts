// Spacer.js
import styled from "styled-components";

function getHeight({ axis, size }: SpacerProps) {
  return axis === "horizontal" ? 1 : size;
}
function getWidth({ axis, size }: SpacerProps) {
  return axis === "vertical" ? 1 : size;
}

const Spacer = styled.span<{ size: number; axis?: Axis }>`
  display: block;
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
`;

type Axis = "horizontal" | "vertical";

type SpacerProps = {
  axis?: Axis;
  size: number;
};

export default Spacer;
