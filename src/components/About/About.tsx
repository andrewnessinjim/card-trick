import { MEDIA_QUERIES } from "@/constants";
import Link from "next/link";
import * as React from "react";
import styled from "styled-components";

function About() {
  const year = new Date().getFullYear();
  return (
    <Wrapper>
      <Section>
        <Heading>♠️ The One That Started It All</Heading>
        <Text>
          This is a remake of the first-ever solo app I built {year - 2013}{" "}
          years ago with the Java Swing API. This remake is built using Next.js,
          React, Motion, RadixUI and TypeScript.
        </Text>
      </Section>

      <Section>
        <Heading>🎓 Course Inspiration</Heading>
        <Text>
          <strong>Josh W Comeau&apos;s</strong> courses helped me build a strong
          foundation for the techniques used in this app. I recommend checking
          them out{" "}
          <SecureLink href="https://www.joshwcomeau.com/courses/">
            here
          </SecureLink>{" "}
          if you&apos;re interested in learning web development.
        </Text>
      </Section>

      <Section>
        <Heading>🤝 Learn With Me</Heading>
        <Text>
          If you&apos;d like to improve your web development skills with
          personalized help, I also tutor on Preply. Use{" "}
          <SecureLink href="https://preply.com/en/tutor/6274742?pref=MTk4NjM5NTk=&id=1746711792.284879&ep=">
            my referral link
          </SecureLink>{" "}
          to book a session with me or other tutors 🙌.
        </Text>
      </Section>
      <Section>
        <Heading>🎴 Credits</Heading>
        <Text>
          The beautiful card illustrations are from{" "}
          <SecureLink href="https://creazilla.com/media/clipart/74791/king-of-hearts">
            Creazilla
          </SecureLink>
          . Thanks to{" "}
          <SecureLink href="https://www.linkedin.com/in/praveen-prabhu-215392180/">
            Praveen
          </SecureLink>{" "}
          for surprising me with this trick years ago. 🫨
        </Text>
      </Section>
    </Wrapper>
  );
}

function SecureLink({ href, children }: { href: string; children: string }) {
  return (
    <StyledLink href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </StyledLink>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  /* width: 480px; */
  width: 90vw;
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  /* margin-bottom: 2rem; */
  &:last-child {
    margin-bottom: 0;
  }
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  /* font-size: 1rem; */
  line-height: 1.6;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #0070f3;
  text-decoration: underline;

  &:hover {
    color: #0051a3;
  }
`;

export default About;
