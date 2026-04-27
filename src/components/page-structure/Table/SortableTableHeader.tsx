import styled, { css } from "styled-components";

import Tooltip from "@/components/ui/tooltip/Tooltip";
import SortIcon from "@/components/ui/icons/SortIcon";

interface SortableTableHeaderProps {
  label: string;
  columnKey: string;
  onSort: () => void;
  currentSortBy: string | null;
  sortDirection: "asc" | "desc";
  align?: "left" | "center" | "right";
  tooltipText?: string;
  desktopOnly?: boolean;
}

export default function SortableTableHeader({
  label,
  columnKey,
  onSort,
  currentSortBy,
  sortDirection,
  align = "left",
  tooltipText,
  desktopOnly = false,
}: SortableTableHeaderProps) {
  const headerText = tooltipText ? <Tooltip text={tooltipText}>{label}</Tooltip> : label;

  return (
    <SortableTh
      onClick={onSort}
      $align={align}
      $desktopOnly={desktopOnly}
      $isActive={currentSortBy === columnKey}
    >
      <HeaderWrapper $align={align}>
        {headerText}

        <SortIcon columnKey={columnKey} currentSortBy={currentSortBy} direction={sortDirection} />
      </HeaderWrapper>
    </SortableTh>
  );
}

interface StyledThProps {
  $align: "left" | "center" | "right";
  $isActive: boolean;
  $desktopOnly: boolean;
}

export const SortableTh = styled.th<StyledThProps>`
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  white-space: nowrap;
  text-align: ${({ $align }) => $align};

  background-color: ${({ $isActive }) =>
    $isActive ? "var(--color-khaki-green-darker)" : "transparent"};
  color: ${({ $isActive }) => ($isActive ? "var(--color-khaki-green)" : "inherit")};

  ${({ $desktopOnly }) =>
    $desktopOnly &&
    css`
      display: none;
      @media (min-width: 1200px) {
        display: table-cell;
      }
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary["700"]} !important;
    color: ${({ theme }) => theme.colors.primary["900"]};
  }
`;

const HeaderWrapper = styled.div<{ $align: "left" | "center" | "right" }>`
  display: flex;
  align-items: center;
  gap: 8px;

  justify-content: ${({ $align }) => ($align === "right" ? "flex-end" : "flex-start")};
`;
