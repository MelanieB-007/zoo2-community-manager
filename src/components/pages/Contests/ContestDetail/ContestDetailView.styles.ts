import styled from "styled-components";

export const AdminActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: -20px;
  padding: 0 10px;

  @media (max-width: 600px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`;
export const Container = styled.div`
  padding: 10px;
`;

export const MetaInfo = styled.p`
  text-align: center;
  color: #666;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const TierGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const AccordionWrapper = styled.div<{ $isColorVariant?: boolean }>`
  ${(props) =>
    props.$isColorVariant &&
    `
    [class*="AccordionHeader"] {
      border-left: 4px solid ${props.theme.colors.accent.main};
    }
  `}
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 10px;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AnimalName = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

export const ColorLabel = styled.small`
  color: ${({ theme }) => theme.colors.accent.main};
  text-transform: uppercase;
  font-size: 0.65rem;
  font-weight: 900;
`;

export const PointsTotal = styled.span`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary[900]};
  font-size: 1.1rem;
`;

export const RankingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th {
    font-size: 0.7rem;
    color: #999;
    text-transform: uppercase;
    padding-bottom: 5px;
    font-weight: normal;
  }

  td {
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.9rem;
  }

  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
`;

export const Badge = styled.span`
  background: #eee;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
`;

export const PointsCell = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  small {
    font-size: 0.7rem;
    color: #aaa;
  }
`;

export const EmptyState = styled.p`
  padding: 15px;
  text-align: center;
  color: #ccc;
  font-style: italic;
  font-size: 0.85rem;
`;

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 12px 24px;
  background-color: #5d7a2a;
  color: ${({ theme }) => theme.colors.ui.white};

  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #4a6221;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 25px auto;
  padding: 0 10px;
  box-sizing: border-box;
`;
