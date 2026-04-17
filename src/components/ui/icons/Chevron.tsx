"use client";

import React from "react";
import styled from "styled-components";
import { IoChevronDown } from "react-icons/io5";

interface ChevronProps {
  isOpen: boolean;
  className?: string;
  size?: number;
}

export default function Chevron({
  isOpen,
  className,
  size = 14,
}: ChevronProps) {
  return (
    <StyledChevron $isOpen={isOpen} className={className} $size={size}>
      <IoChevronDown />
    </StyledChevron>
  );
}

const StyledChevron = styled.span<{ $isOpen: boolean; $size: number }>`
  display: inline-flex; 
  align-items: center;
  justify-content: center;

  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;

  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};

  color: ${({ theme }) => theme.colors.ui.icon}; 

  svg {
    width: 100%;
    height: 100%;
  }
`;