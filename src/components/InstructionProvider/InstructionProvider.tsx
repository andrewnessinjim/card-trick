"use client";

import React, { ReactNode } from "react";

const InstructionContext = React.createContext<NullableContextType>(null);

export function useInstruction() {
  const context = React.useContext(InstructionContext);
  if (!context) {
    throw new Error(
      "useInstruction must be used within an InstructionProvider"
    );
  }
  return context;
}

function InstructionProvider({ children }: Props) {
  const [instruction, setInstruction] =
    React.useState<NullableInstruction>(null);

  const showInstruction = React.useCallback((instruction: ReactNode) => {
    setInstruction({ value: instruction, id: crypto.randomUUID() });
  }, []);

  return (
    <InstructionContext.Provider value={{ instruction, showInstruction }}>
      {children}
    </InstructionContext.Provider>
  );
}

interface Props {
  children: React.ReactNode;
}

interface ContextType {
  instruction: NullableInstruction;
  showInstruction: (message: ReactNode) => void;
}

interface Instruction {
  value: React.ReactNode;
  id: string;
}

type NullableContextType = ContextType | null;
type NullableInstruction = Instruction | null;

export default InstructionProvider;
