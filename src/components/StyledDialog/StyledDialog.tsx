import * as React from "react";
import styled, { CSSProperties } from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "motion/react";
import { X } from "lucide-react";

function StyledDialog({
  visuallyHiddenHeading,
  visuallyHiddenDescription,
  children,
  onClose,
  trigger,
  initialOpen = false,
  overflowY = "hidden",
}: Props) {
  const [open, setOpen] = React.useState(initialOpen);
  const [safeToClose, setSafeToClose] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      // Wait so user doesn't close it accidentally before it fully animates in
      const timerId = setTimeout(() => setSafeToClose(true), 1000);
      return () => clearTimeout(timerId);
    } else {
      setSafeToClose(false);
    }
  }, [open]);

  return (
    <Dialog.Root
      open={open}
      modal={true}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setOpen(nextOpen);
          return;
        }

        if (safeToClose) {
          setOpen(nextOpen);

          if (!nextOpen) {
            onClose?.();
          }
        } else {
          console.log("Ignoring close");
        }
      }}
    >
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay forceMount>
          <Overlay {...opacityAnimation} />
        </Dialog.Overlay>

        <Dialog.Content forceMount>
          <Content
            {...opacityAnimation}
            style={{ "--overflowY": overflowY } as CSSProperties}
          >
            <VisuallyHidden>
              <Dialog.Title asChild>
                <Heading>{visuallyHiddenHeading}</Heading>
              </Dialog.Title>
              <Dialog.Description>
                {visuallyHiddenDescription}
              </Dialog.Description>
            </VisuallyHidden>

            {children}
          </Content>
          <DialogClose asChild>
            <CloseButton {...opacityAnimation}>
              <VisuallyHidden>Close</VisuallyHidden>
              <X size={32} color="black" />
            </CloseButton>
          </DialogClose>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const opacityAnimation = {
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: 0.2,
    ease: "easeInOut",
  },
};

const Overlay = styled(motion.div)`
  background: rgba(38, 38, 38, 0.95);
  backdrop-filter: blur(3px);
  position: fixed;
  inset: 0;
`;

const DialogClose = styled(Dialog.Close)`
  position: fixed;
  top: 2%;
  right: 2%;
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
`;

const Content = styled(motion.div)`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
  overflow-y: var(--overflowY);
  max-height: 80vh;
  background: var(--color-decorative-100);
  border-radius: 8px;
`;

const Heading = styled(motion.h1)`
  text-align: center;
`;

interface Props {
  visuallyHiddenHeading: string;
  visuallyHiddenDescription: string;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  initialOpen?: boolean;
  onClose?: () => void;
  overflowY?: CSSProperties["overflowY"];
}

export default StyledDialog;
