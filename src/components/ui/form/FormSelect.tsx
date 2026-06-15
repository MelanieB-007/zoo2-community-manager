"use client";

import React, { SelectHTMLAttributes } from "react";
import styled from "styled-components";

interface SelectOption {
  value: string | number;
  label: string;
}

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value"> {
  options: SelectOption[];
  value: string | number | null; // Erlaubt null für deine Logik
  placeholder?: string;
  $width?: string;
}

export default function FormSelect({
  options,
  value,
  onChange,
  placeholder,
  required,
  $width,
  ...props
}: FormSelectProps) {
  // Konvertiere null zu einem leeren String für das native Element
  const selectValue = value ?? "";

  return (
    <Wrapper $width={$width}>
      <StyledSelect {...props} value={selectValue} onChange={onChange} required={required}>
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $width?: string }>`
  width: ${(props) => props.$width || "100%"};
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1e2a5;
  border-radius: 10px;
  font-size: 0.95rem;
  background-color: white;
  color: #333;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2388a04d' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 35px;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #88a04d;
    box-shadow: 0 0 0 2px rgba(136, 160, 77, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;
