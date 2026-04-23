"use client";

import React from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";

interface ResultsInfoProps {
  currentCount: number;
  totalCount: number;
}

export default function ResultsInfo({ currentCount = 0, totalCount = 0 }: ResultsInfoProps) {
  const t = useTranslations("Filter");

  return (
    <StyledInfo>
      {t("results.show")} <strong>{currentCount}</strong>&nbsp;
      {t("results.of")} <strong>{totalCount}</strong>&nbsp;
      {t("results.unit")}
    </StyledInfo>
  );
}

const StyledInfo = styled.p`
  width: 100%;
  text-align: center;
  margin: 0 auto 15px auto;
  font-size: 0.95rem;
  color: #666;

  strong {
    color: ${({ theme }) => theme.colors.primary[600]};
    font-weight: 800;
  }
`;
