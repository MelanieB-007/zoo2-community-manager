"use client";

import React from "react";
import styled from "styled-components";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import GameBadge from "@/components/ui/badges/GameBadge";
import { habitatColors } from "@/constants/habitatConstants";

interface ItemThumbnailProps {
  image: string;
  name?: string;
  habitat?: { name: string };
  size?: number;
  category: any;
  tooltip?: boolean;
}

export default function ThumbnailBadge({
  image,
  name,
  habitat,
  size = 55,
  category,
  tooltip = true,
}: ItemThumbnailProps) {
  const habitatKey = (habitat?.name || "standard").toLowerCase();

  const thumbnail = (
    <StyledThumbnail $habitat={habitatKey} $size={size}>
      <GameBadge type={category} fileName={image} size={size - 10} borderColor="transparent" />
    </StyledThumbnail>
  );

  if (tooltip && name) {
    return <Tooltip text={name}>{thumbnail}</Tooltip>;
  }

  return thumbnail;
}

const StyledThumbnail = styled.div<{ $habitat: string; $size: number }>`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  flex-shrink: 0;

  /* Dynamischer Rahmen basierend auf dem Habitat */
  border: 3px solid
    ${({ $habitat }) => habitatColors[$habitat]?.main || habitatColors.standard.main};

  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s,
    border-color 0.2s;
  cursor: pointer;
  z-index: 1;

  &:hover {
    transform: scale(1.6);
    z-index: 100;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: color-mix(
      in srgb,
      ${({ $habitat }) => habitatColors[$habitat]?.main || habitatColors.default.main},
      white 20%
    );
  }
`;
