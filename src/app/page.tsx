import InstructionProvider from "@/components/InstructionProvider";
import { Wrapper } from "./page.styled";
import Resetter from "@/components/Resetter";
import GitHubCorner from "@/components/GitHubCorner";

export default function Home() {
  return (
    <InstructionProvider>
      <Wrapper>
        <Resetter />
      </Wrapper>
      <GitHubCorner href="https://github.com/andrewnessinjim/card-trick"/>
    </InstructionProvider>
  );
}
