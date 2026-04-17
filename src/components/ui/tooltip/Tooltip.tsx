"use client";

import React from "react";
import * as Styles from "@/components/ui/tooltip/Tooltip.styles";

interface TooltipProps {
  text?: string;
  children: React.ReactNode;
  align?: Styles.TooltipAlign;
  position?: Styles.TooltipPosition;
}

export default function Tooltip({
  text,
  children,
  align = "center",
  position = "top",
}: TooltipProps) {
  if (!text) return <>{children}</>;

  return (
    <Styles.TooltipContainer $text={text} $align={align} $position={position}>
      {children}
    </Styles.TooltipContainer>
  );
}
