"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* 1. CSS Reset & Box-Sizing */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 2. Basis-Setup für HTML und Body */
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden !important;
    overflow-y: auto !important;
  }

  body {
    overflow-x: hidden;
    position: relative;
    background-color: ${({ theme }) => theme.colors.ui.bodyBg};
    color: ${({ theme }) => theme.colors.ui.textMain};
    font-family: ${({ theme }) => theme.fonts.text}; /* DM Sans */
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scrollbar-gutter: stable;
  }
  
  

  /* 3. Typografie-Standards */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading}; /* Playfair Display */
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  /* 4. Links & Buttons */
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  /* 5. Nützliche Standard-Klassen (Optional) */
  .font-club {
    font-family: ${({ theme }) => theme.fonts.club}; /* Sedgwick Ave Display */
  }

  /* Scrollbar Styling für den Zoo-Vibe */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.ui.bodyBg};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary[100]};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary[500]};
  }
`;
