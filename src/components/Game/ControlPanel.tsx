import { AnimatePresence } from "motion/react";
import Button from "../Button";
import styled from "styled-components";
import StyledDialog from "../StyledDialog";
import About from "../About";

export default function ControlPanel({
  showControls,
  onShuffle,
  onStart,
  onAbout,
  disabled = false,
}: Props) {
  return (
    <AnimatePresence mode="popLayout">
      {showControls && (
        <Wrapper>
          <AnimatingButton disabled={disabled} onClick={onShuffle}>
            Shuffle
          </AnimatingButton>
          <AnimatingButton disabled={disabled} onClick={onStart}>
            Start
          </AnimatingButton>
          <StyledDialog
            trigger={
              <AnimatingButton disabled={disabled} onClick={onAbout}>
                About
              </AnimatingButton>
            }
            visuallyHiddenDescription=""
            visuallyHiddenHeading="About Section"
            overflowY="auto"
          >
            <About />
          </StyledDialog>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

function AnimatingButton({ show, ...delegated }: DeckButtonProps) {
  return (
    <Button
      show={show}
      animateExit={true}
      popLayoutOnExit={true}
      animateEntry={true}
      entryDelay={0.5}
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
  width: 100%;
  justify-content: center;

  /* Room for animation when cards slide in*/
  padding-top: 32px;
`;

interface DeckButtonProps extends React.ComponentProps<typeof Button> {
  show?: boolean;
  isResetting?: boolean;
}

interface Props {
  showControls: boolean;
  disabled?: boolean;
  onShuffle: () => void;
  onStart: () => void;
  onAbout: () => void;
}
