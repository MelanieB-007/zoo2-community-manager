import React from "react";
import styled from "styled-components";
import FormattedNumber from "../FormattedNumber/FormattedNumber";

interface XPBadgeProps {
  label?: number | null;
  size?: number;
}

export default function XPBadge({ label: value, size = 20 }: XPBadgeProps) {
  return (
    <XPWrapper>
      {value !== undefined && value !== null && (
        <XPValue>
          <FormattedNumber value={value} />
        </XPValue>
      )}
      <StarImage src="/images/icons/star.png" alt="XP-Stars" width={size} height={size} />
    </XPWrapper>
  );
}

const XPWrapper = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  vertical-align: middle;
`;

const StarImage = styled.img<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  object-fit: contain;
  filter: drop-shadow(1px 1px 1px ${({ theme }) => theme.colors.ui.overlayDark});
`;

const XPValue = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.system.info};
`;
