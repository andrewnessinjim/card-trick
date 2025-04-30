import InstructionProvider from "@/components/InstructionProvider";
import { Wrapper } from "./page.styled";
import Resetter from "@/components/Resetter";

export default function Home() {
  return (
    <InstructionProvider>
      <Wrapper>
        <Resetter />
      </Wrapper>
    </InstructionProvider>
  );
}
