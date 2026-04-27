"use client";

import styled from "styled-components";
import React from "react";

interface NameProps {
  children: React.ReactNode;
  className?: string;
}

export function Name({ children, className }: NameProps) {
  return <StyledName className={className}>{children}</StyledName>;
}

const StyledName = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
  display: inline-block;

  /* Worttrennung */
  hyphens: auto;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;

  overflow-wrap: break-word;
  word-wrap: break-word;

  max-width: 100%;
`;
