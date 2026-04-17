import styled from "styled-components";

export const LangSwitcherContainer = styled.div`
  position: relative;
`;

export const CurrentLanguage = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.5rem 0.8rem;

  background: ${({ theme }) => theme.colors.ui.glassWhite};
  border: ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.main};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.ui.glassWhiteRich};
    transform: translateY(-1px);
  }

  .fi {
    border-radius: 2px;
  }
`;

export const LangDropdown = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 120%;
  right: 0;
  background: ${({ theme }) => theme.colors.header.bg};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  border: ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.main};
  padding: 5px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  min-width: 80px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 3000;
  overflow: hidden;

  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  transform: ${({ $show }) => ($show ? "translateY(0)" : "translateY(10px)")};
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

export const LangOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 8px;
  color: ${({ theme }) => theme.colors.primary["500"]};
  font-size: 0.8rem;
  font-weight: 800;
  border-radius: 5px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.header.dropdownLink};
    color: ${({ theme }) => theme.colors.main.title};
  }

  .fi {
    font-size: 0.9rem;
    border-radius: 2px;
  }
`;
