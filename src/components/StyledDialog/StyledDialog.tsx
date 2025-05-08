import * as React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const DialogContext = React.createContext<DialogContextType | null>(null);

export function useDialogClose(): () => void {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogClose must be used within a StyledDialog");
  }
  return context.close;
}

function StyledDialog({
  visibleHeading,
  visuallyHiddenDescription,
  children,
  onClose,
}: Props) {
  const [isClosing, setIsClosing] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [safeToClose, setSafeToClose] = React.useState(false);

  React.useEffect(() => {
    // Wait so user doesn't close it accidentally before it fully animates in
    setTimeout(() => setSafeToClose(true), 4000);
  }, []);

  function close() {
    if (safeToClose) {
      setIsClosing(true);
    } else {
      console.log("Ignoring close")
    }
  }

  return (
    <DialogContext.Provider value={{ close }}>
      <Dialog.Root
        open={open}
        modal={true}
        onOpenChange={(open) => {
          console.log("onOpenChange", open);
          if (!open) {
            close();
            return;
          }

          setOpen(open);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay forceMount>
            <AnimatePresence>
              {!isClosing && <Overlay {...opacityAnimation} />}
            </AnimatePresence>
          </Dialog.Overlay>

          <Dialog.Content forceMount>
            <AnimatePresence
              onExitComplete={() => {
                setOpen(false);
                onClose?.();
              }}
            >
              {!isClosing && (
                <Content {...opacityAnimation}>
                  <Dialog.Title asChild>
                    <Heading>{visibleHeading}</Heading>
                  </Dialog.Title>
                  <VisuallyHidden>
                    <Dialog.Description>
                      {visuallyHiddenDescription}
                    </Dialog.Description>
                  </VisuallyHidden>
                  {children}
                </Content>
              )}
            </AnimatePresence>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </DialogContext.Provider>
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
    duration: 1,
    ease: "easeInOut",
  },
};

const Overlay = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
`;

const Content = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
`;

const Heading = styled(motion.h1)``;

interface Props {
  visibleHeading: string;
  visuallyHiddenDescription: string;
  children: React.ReactNode;
  onClose?: () => void;
}

type DialogContextType = {
  close: () => void;
};

export default StyledDialog;
