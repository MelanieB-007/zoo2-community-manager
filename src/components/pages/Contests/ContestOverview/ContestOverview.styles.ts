import styled from "styled-components";
import { Name } from "@/components/elements/Name/Name";

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  line-height: 1.1;
  color: #333;
  padding: 4px 0;
`;

export const Divider = styled.span`
  height: 14px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary[600]};
  font-size: 1.2rem;
  user-select: none;
`;

export const StatueGroup = styled.div`
  display: grid;
  /* Fest auf 4 Spalten für die 4 Statuen */
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
  padding: 8px 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr); /* Tablet-Ansicht */
  }
`;

export const AnimalCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-height: 70px; /* Garantiert eine einheitliche Höhe */
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Stapelt Name und Label untereinander */
  justify-content: center;
  flex: 1;
  min-width: 0;

  span {
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1.2;
    color: #333;
    /* Line-Clamping entfernen oder auf 3 erhöhen, damit Label Platz hat */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    overflow-wrap: anywhere;

    /* 3. Hyphens mit Präfixen */
    hyphens: auto;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;

    /* 4. Verhindert, dass 'word-break' die 'hyphens' Regel überschreibt */
    word-break: normal;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.colors.ui.border || "#eee"};
  box-shadow: ${({ theme }) => theme.shadows.soft || "0 2px 4px rgba(0,0,0,0.02)"};
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 8px;
`;

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #333;
  svg {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

export const AnimalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 5px 0;
  align-items: stretch;
`;

export const AnimalItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fdfdfd;
  padding: 10px 6px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  height: 100%;
`;

export const animalNameMobile = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.2;
  color: #333;
  margin-bottom: 2px;
  display: block;
  padding-top: 10px;
`;

export const ColorLabel = styled.small`
  color: ${({ theme }) => theme.colors.accent.main};
  text-transform: uppercase;
  font-size: 0.65rem;
  font-weight: 900;
`;
