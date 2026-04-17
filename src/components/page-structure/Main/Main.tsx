"use client";

import styled from "styled-components";
import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return <StyledMain>{children}</StyledMain>;
}

const StyledMain = styled.main`
  position: relative;
  flex: 1 1 auto;
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.widthPage};
  padding: 2rem;
  min-height: calc(100vh - 300px);

  z-index: 1;
  overflow: visible;

  background-color: ${({ theme }) => theme.colors.accent.light};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  border: ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.main};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  /* Abstände zwischen den Sektionen innerhalb von Main */
  & > * {
    margin-bottom: 3rem;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1.5rem 1rem 1rem 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem 1rem 1rem 1rem;
    margin: 8px auto;
    min-height: auto;
  }
`;
