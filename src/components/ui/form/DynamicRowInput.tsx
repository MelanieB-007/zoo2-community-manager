"use client";

import React from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import FormInput from "./FormInput";

interface Column {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  $flex?: number | string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
}

interface DynamicRowInputProps {
  label?: string;
  rows: any[];
  onAdd: () => void;
  disabledAdd?: boolean;
  onRemove: (id: string | number) => void;
  onChange: (id: string | number, key: string, value: any) => void;
  columns: Column[];
}

export default function DynamicRowInput({
  label,
  rows,
  onAdd,
  disabledAdd,
  onRemove,
  onChange,
  columns,
}: DynamicRowInputProps) {
  // Verwendung von next-intl
  const t = useTranslations("Common");

  return (
    <Container>
      {label && <Label>{label}</Label>}

      <Header>
        {columns.map((col) => (
          <HeaderCell key={col.key} $flex={col.$flex}>
            {col.label}
          </HeaderCell>
        ))}
        <DeletePlaceholder />
      </Header>

      {(rows || []).map((row) => (
        <Row key={row.id}>
          {columns.map((col) => (
            <Cell key={col.key} $flex={col.$flex}>
              {col.type === "select" ? (
                <FormSelect
                  value={row[col.key] ?? ""} // Sicherstellung eines stabilen Werts für React
                  onChange={(e) => onChange(row.id, col.key, e.target.value)}
                  options={(col.options || []).filter((opt) => {
                    const otherRows = rows.filter((r) => r.id !== row.id);
                    const usedValues = otherRows.map((r) => r[col.key]);
                    return !usedValues.includes(opt.value) || opt.value === row[col.key];
                  })}
                />
              ) : col.type === "textarea" ? (
                <FormTextarea
                  $minHeight="60px"
                  placeholder={col.placeholder}
                  value={row[col.key] || ""}
                  onChange={(e: any) => onChange(row.id, col.key, e.target.value)}
                />
              ) : (
                <FormInput
                  type={col.type || "text"}
                  placeholder={col.placeholder}
                  value={row[col.key] || ""}
                  onChange={(e: any) => onChange(row.id, col.key, e.target.value)}
                />
              )}
            </Cell>
          ))}
          <Tooltip text={t("removeRow")}>
            <DeleteBtn onClick={() => onRemove(row.id)} type="button">
              🗑️
            </DeleteBtn>
          </Tooltip>
        </Row>
      ))}

      <AddBtn onClick={onAdd} type="button" disabled={disabledAdd}>
        {disabledAdd ? t("allLanguages") : t("addRow")}
      </AddBtn>
    </Container>
  );
}

// --- Styles ---

const Container = styled.div`
  margin: 10px 0;
`;

const Label = styled.p`
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: #5d7a2a;
`;

const Header = styled.div`
  display: flex;
  gap: 10px;
  font-size: 0.75rem;
  color: #88a04d;
  font-weight: bold;
  margin-bottom: 8px;
  padding: 0 12px;
`;

const HeaderCell = styled.span<{ $flex?: number | string }>`
  flex: ${(props) => props.$flex || 1};
`;

const DeletePlaceholder = styled.div`
  width: 40px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  align-items: flex-start;
`;

const Cell = styled.div<{ $flex?: number | string }>`
  display: flex;
  flex: ${(props) => props.$flex || 1};
  min-width: 0; /* Verhindert das Ausbrechen von Texten */
`;

const AddBtn = styled.button`
  background: #fdfdfd;
  border: 2px dashed #d1e2a5;
  color: #5a7024;
  padding: 12px;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 10px;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: #f4f9e9;
    border-color: #88a04d;
    box-shadow: 0 2px 8px rgba(136, 160, 77, 0.15);
  }

  &:disabled {
    background: #f5f5f5;
    color: #aaa;
    border-color: #eee;
    cursor: not-allowed;
  }
`;

const DeleteBtn = styled.button`
  background: #fff5f5;
  border: 1px solid #ffebeb;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  color: #e53e3e;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #fff0f0;
    border-color: #feb2b2;
    transform: scale(1.05);
  }
`;
