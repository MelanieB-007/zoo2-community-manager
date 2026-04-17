import styled from "styled-components";

export type TooltipPosition = "top" | "bottom";
export type TooltipAlign = "left" | "center" | "right";

interface StyledContainerProps {
  $text: string;
  $align: TooltipAlign;
  $position: TooltipPosition;
}

export const TooltipContainer = styled.div<StyledContainerProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: visible; /* Ganz wichtig, damit er oben raus darf! */

  &::after {
    content: "${(props) => props.$text}";
    position: absolute;
    z-index: 1000;

    background-color: ${({ theme }) => theme.colors.primary["800"]};
    color: white;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.8rem;
    white-space: nowrap;
    pointer-events: none;

    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;

    /* POSITIONIERUNG OBEN */
    ${(props) =>
      props.$position === "top"
        ? "bottom: calc(100% + 10px);" // 10px Abstand nach oben
        : "top: calc(100% + 10px);"} // 10px Abstand nach unten

    left: 50%;
    transform: translateX(-50%) translateY(0);
  }

  /* Der kleine Pfeil (optional) */
  &::before {
    content: "";
    position: absolute;
    z-index: 999;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;

    opacity: 0;
    visibility: hidden;

    ${(props) =>
      props.$position === "top"
        ? `bottom: 100%; border-top-color: ${props.theme.colors.primary["800"]};`
        : `top: 100%; border-bottom-color: ${props.theme.colors.primary["800"]};`}
  }

  &:hover::after,
  &:hover::before {
    opacity: 1;
    visibility: visible;
    /* Ein leichter kleiner Slide-Effekt nach oben beim Auftauchen */
    ${(props) => props.$position === "top" && "transform: translateX(-50%) translateY(-5px);"}
  }
`;
