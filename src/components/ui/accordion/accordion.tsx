"use client";

import React, { useState } from "react";
import styled from "styled-components";

import { Image } from "@/types/image";
import ThumbnailBadge from "@/components/ui/badges/ThumbnailBadge";
import { Biome } from "@/types/biome";
import Chevron from "@/components/ui/icons/Chevron";

interface AccordionProps {
  title: React.ReactNode; // ReactNode erlaubt Strings ODER JSX (für die Punkte-Anzeige)
  icon?: Image;
  biome?: Biome | null;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({
  title,
  icon,
  biome = null,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <AccordionContainer>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        {icon && <ThumbnailBadge image={icon} name={icon.name} biome={biome} size={50} />}
        <TitleWrapper>{title}</TitleWrapper>
        <Chevron isOpen={isOpen} />
      </AccordionHeader>

      <ContentWrapper $isOpen={isOpen}>
        <InnerContent>{children}</InnerContent>
      </ContentWrapper>
    </AccordionContainer>
  );
}

const AccordionContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.ui.white};
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
`;

const AccordionHeader = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  background: ${(props) => (props.$isOpen ? "#f8fcf0" : ({ theme }) => theme.colors.ui.white)};
  transition: background 0.2s ease;

  &:hover {
    background: #f9f9f9;
  }
`;

const TitleWrapper = styled.div`
  margin-left: 12px;
  flex: 1;
  font-weight: 600;
  color: #333;
`;

const ContentWrapper = styled.div<{ $isOpen: boolean }>`
  max-height: ${(props) => (props.$isOpen ? "2000px" : "0")};
  overflow: hidden;
  transition:
    max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s ease;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  background: ${({ theme }) => theme.colors.ui.white};
`;

const InnerContent = styled.div`
  padding: 15px;
  border-top: 1px solid #f0f0f0;
`;
