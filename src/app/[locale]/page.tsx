"use client";
import styled from "styled-components";

const WelcomeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(10)};
  text-align: center;
`;

const HeroTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const BadgeExample = styled.span`
  background: ${({ theme }) => theme.colors.accent.main};
  color: white;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.9rem;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export default function HomePage() {
  return (
    <WelcomeWrapper>
      <HeroTitle>Willkommen im Zoo 2 Manager</HeroTitle>
      <p>Dein Community-Tool für den perfekten Park.</p>
      <BadgeExample>Beta-Phase 🐾</BadgeExample>
    </WelcomeWrapper>
  );
}
