import styled from "styled-components";

export const OuterContainer = styled.div`
  padding: 30px 0;
  overflow: visible;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px 60px;
  background: ${({ theme }) => theme.colors.ui.white};
  border: 2px solid ${({ theme }) => theme.colors.system.success};
  border-radius: var(--border-radius);
  margin-top: 40px;
  position: relative;
`;

export const SpeechBubble = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.ui.white};
  border: 3px solid ${({ theme }) => theme.colors.system.success};
  border-radius: var(--border-radius);
  padding: 20px 30px;
  margin-bottom: 40px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  /* Der kleine Zipfel */
  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 15px 15px 0;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.ui.white} transparent;
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: -19px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 16px 16px 0;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.system.success} transparent;
    z-index: 1;
  }

  h3 {
    color: ${({ theme }) => theme.colors.system.success};
    font-weight: 800;
    margin: 0 0 8px 0;
    font-size: 1.6rem;
  }
`;

export const UppyPortraitFrame = styled.div`
  margin-bottom: 35px;
  border-radius: 30px;
  padding: 20px;
  border: 3px solid #b5d99c;
  background: #f8fbf5;

  line-height: 0;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);

  img {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
  }
`;

export const ResetButton = styled.button`
  background-color: ${({ theme }) => theme.colors.system.success};
  color: ${({ theme }) => theme.colors.ui.white};
  border: none;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 800;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 0 ${({ theme }) => theme.colors.system.success};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 ${({ theme }) => theme.colors.primary[900]};
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 0 ${({ theme }) => theme.colors.primary[900]};
  }
`;
