"use client";

import styled from "styled-components";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return <StyledPageWrapper>{children}</StyledPageWrapper>;
}

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: auto;
  margin-bottom: 10px;

  padding: 20px 20px;
  background-color: ${({ theme }) => theme.colors.ui.pageBg};
  border: 2px solid ${({ theme }) => theme.colors.primary["600"]};
  border-radius: ${({ theme }) => theme.borderRadius.main};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 40px;
  }
`;
