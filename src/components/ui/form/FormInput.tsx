"use client";

import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  $width?: string;
}

export default function FormInput({ label, id, $width, ...props }: FormInputProps) {
  return (
    <Wrapper $width={$width}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput id={id} {...props} />
    </Wrapper>
  );
}

// --- Styles ---

const Wrapper = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${(props) => props.$width || "100%"};
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  /* Konsistente Border-Farbe zum FormSelect */
  border: 1px solid ${({ theme }) => theme.colors?.ui?.border || "#d1e2a5"};
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
  color: #333;
  background-color: #ffffff;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors?.primary?.[600] || "#88a04d"};
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(136, 160, 77, 0.15);
  }

  /* Spezielle Behandlung für Zahlenfelder (Level/Anzahl im Wettbewerb) */
  &[type="number"] {
    text-align: center;
    font-weight: 600;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #eee;
    color: #999;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #bbb;
    font-size: 0.9rem;
  }
`;
