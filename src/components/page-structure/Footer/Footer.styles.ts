import styled from "styled-components";

export const StyledFooter = styled.footer`
  position: relative;
  flex-shrink: 0;
  padding: 1rem 0;
  margin: 10px auto;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.widthPage};
  min-height: 70px;
  z-index: 1;
  text-align: center;

  /* Nutzung deines Themes */
  background-color: ${({ theme }) => theme.colors.header.bg};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  border: ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.main};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent.main};
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.accent.main};
  }

  p {
    margin: 0.5rem 0;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.ui.white};
    font-family: ${({ theme }) => theme.fonts.text};
    font-weight: 500;
    /* Ein leichter Text-Shadow sorgt für bessere Lesbarkeit auf dem Glas-Effekt */
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  a {
    color: ${({ theme }) => theme.colors.ui.white};
    text-decoration: none;
    margin-left: 5px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.accent.main};
    transition: all 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent.main};
      text-shadow: 0 0 8px ${({ theme }) => theme.colors.accent.main};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
    width: 95%; /* Etwas Platz am Rand auf mobilen Geräten */
  }
`;

export const FooterContent = styled.div`
  padding: 0.5rem 0;
  opacity: 0.95;
`;
