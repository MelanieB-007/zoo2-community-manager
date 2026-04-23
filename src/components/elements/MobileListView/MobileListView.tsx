"use client";

import React from "react";
import styled from "styled-components";

interface CardActions {
  onItemClick: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

interface MobileListViewProps<T> {
  currentItems: T[];
  renderCardAction: (item: T, actions: CardActions) => React.ReactNode;
  onItemClick?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function MobileListView<T extends { id: number }>({
  currentItems,
  renderCardAction,
  onItemClick,
  onEdit,
  onDelete,
}: MobileListViewProps<T>) {
  return (
    <StyledMobileView>
      {currentItems.map((item) => (
        <React.Fragment key={item.id}>
          {renderCardAction(item, {
            onItemClick: () => onItemClick?.(item.id),
            onEdit: () => onEdit?.(item.id),
            onDelete: () => onDelete?.(item.id),
          })}
        </React.Fragment>
      ))}
    </StyledMobileView>
  );
}

const StyledMobileView = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || "768px"}) {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 0 10px;
  }
`;
