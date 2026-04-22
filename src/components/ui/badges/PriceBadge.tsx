"use client";

import React from "react";
import styled from "styled-components";
import CurrencyBadge from "@/components/ui/badges/CurrencyBadge";

interface PriceBadgeProps {
  value: number;
  type: "Zoodollar" | "Diamond";
}

export default function PriceBadge({ value = 0, type = "Zoodollar" }: PriceBadgeProps) {
  return (
    <PriceWrapper>
      <CurrencyBadge value={value ?? 0} type={type} />
    </PriceWrapper>
  );
}

const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding-right: 5px;
`;
