import { motion } from "motion/react";
import styled from "styled-components";

function Jumper({
  children,
  jump,
  order,
}: {
  children: React.ReactNode;
  jump: boolean;
  order: number;
}) {
  return (
    <Wrapper
      animate={{
        y: jump ? [null, -10, 0] : 0,
      }}
      transition={{
        duration: 0.4,
        delay: order * 0.015,
      }}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)``;
export default Jumper;
