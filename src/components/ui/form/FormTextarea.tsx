"use client";

import React, { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  $minHeight?: string;
}

export default function FormTextarea({ label, id, $minHeight, ...props }: FormTextareaProps) {
  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledTextarea id={id} $minHeight={$minHeight} {...props} />
    </Wrapper>
  );
}

// --- Styles ---

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px; /* Einheitlich zum FormInput und FormSelect */
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledTextarea = styled.textarea<{ $minHeight?: string }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors?.ui?.border || "#d1e2a5"};
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.95rem;
  line-height: 1.5;
  resize: vertical;
  min-height: ${(props) => props.$minHeight || "120px"};
  color: #333;
  background-color: #ffffff;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors?.primary?.[600] || "#88a04d"};
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(136, 160, 77, 0.15);
  }

  &::placeholder {
    color: #bbb;
    font-size: 0.9rem;
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #eee;
    color: #999;
    cursor: not-allowed;
  }
`;
