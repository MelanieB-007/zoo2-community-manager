import styled from "styled-components";

interface SortIconProps {
  columnKey: string;
  currentSortBy: string | null;
  direction: "asc" | "desc";
}
export default function SortIcon({ columnKey, currentSortBy, direction }: SortIconProps) {
  if (currentSortBy !== columnKey) {
    return <StyledIcon>↕</StyledIcon>;
  }
  return <StyledDirection>{direction === "asc" ? "▲" : "▼"}</StyledDirection>;
}

const StyledIcon = styled.span`
  color: #ccc;
  margin-left: 8px;
  font-size: 0.8rem;
`;

const StyledDirection = styled.span`
  color: ${({ theme }) => theme.colors.system.success};
  margin-left: 8px;
  font-weight: bold;
`;
