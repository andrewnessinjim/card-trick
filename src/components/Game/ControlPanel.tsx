import { AnimatePresence } from "motion/react";
import Button from "../Button";
import styled from "styled-components";

export default function ControlPanel({
  showControls,
  onShuffle,
  onStart,
  disabled = false,
}: Props) {
  return (
    <AnimatePresence mode="popLayout">
      {showControls && (
        <Wrapper>
          <DeckButton disabled={disabled} onClick={onShuffle}>
            Shuffle
          </DeckButton>
          <DeckButton disabled={disabled} onClick={onStart}>
            Start
          </DeckButton>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

function DeckButton({ show, ...delegated }: DeckButtonProps) {
  return (
    <Button
      show={show}
      animateExit={true}
      popLayoutOnExit={true}
      animateEntry={true}
      entryDelay={1}
      {...delegated}
    />
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  padding-top: 32px;
`;

interface DeckButtonProps extends React.ComponentProps<typeof Button> {
  show?: boolean;
  isResetting?: boolean;
}

interface Props {
  showControls: boolean;
  onShuffle: () => void;
  onStart: () => void;
  disabled?: boolean;
}
