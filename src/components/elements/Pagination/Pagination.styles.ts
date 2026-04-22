import styled from "styled-components";

export const SignpostAssembly = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 10px;
    margin-top: 20px;
    transform: scale(0.85);
  }
`;

export const SignpostButton = styled.button<{ $direction: "prev" | "next" }>`
  position: relative;
  width: 160px;
  height: 65px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  background-color: transparent;
  background-image: url("/images/icons/directional_sign.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: saturate(1.2) contrast(1.1);

  /* Die Kurzschreibweise mit Destructuring */
  transform: ${({ $direction }) =>
    $direction === "prev" ? "scaleX(-1)" : "none"};

  &:hover:not(:disabled) {
    filter: saturate(1.4) contrast(1.1)
      drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));

    /* WICHTIG: Hier kombinieren wir translateY, den evtl. scaleX und den Zoom-Effekt */
    transform: ${({ $direction }) =>
      $direction === "prev"
        ? "translateY(-5px) scaleX(-1) scale(1.05)"
        : "translateY(-5px) scale(1.05)"};
  }

  &:disabled {
    filter: grayscale(1) opacity(0.4);
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 110px;
    height: 45px;
  }
`;

export const PageIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url("/images/icons/wooden_plaque.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  width: 150px;
  height: 60px;
  margin-top: -10px;
  padding-bottom: 5px;

  div {
    font-size: 1.2rem;
    font-weight: 900;
    color: #2d5a27;
    font-family: ${({ theme }) => theme.fonts.heading}, serif;
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.6);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100px;
    height: 40px;

    div {
      font-size: 1rem;
    }
  }
`;
