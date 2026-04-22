"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

import { Animal } from "@/types/animal";

import SortableTableHeader from "@/components/page-structure/Table/SortableTableHeader";

import BiomeBadge from "@/components/ui/badges/BiomeBadge";
import CurrencyBadge from "@/components/ui/badges/CurrencyBadge";
import ShelterLevelBadge from "@/components/ui/badges/ShelterLevelBadge";
import XPBadge from "@/components/ui/badges/XPBadge";
import ActionBadge from "@/components/ui/badges/ActionBadge";
import ThumbnailBadge from "@/components/ui/badges/ThumbnailBadge";
import Table from "@/components/page-structure/Table/Table";
import { calculateTotalXP } from "@/util/AnimalUtil";

interface AnimalDesktopTableProps {
  animals: Animal[];
  sortBy: string;
  sortDirection: "asc" | "desc";
  onSort: (key: string) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function AnimalDesktopTable({
  animals,
  sortBy,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
}: AnimalDesktopTableProps) {
  const t = useTranslations("Animals");
  const tCommon = useTranslations("Common");
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "Director";

  return (
    <Table>
      <thead>
        <tr>
          <SortableTableHeader
            label={t("table.species")}
            onSort={() => onSort("name")}
            columnKey="name"
            currentSortBy={sortBy}
            sortDirection={sortDirection}
          />
          <SortableTableHeader
            label={t("table.enclosure")}
            onSort={() => onSort("biomeName")}
            columnKey="biomeName"
            currentSortBy={sortBy}
            sortDirection={sortDirection}
          />
          <SortableTableHeader
            label={t("table.price")}
            onSort={() => onSort("price")}
            columnKey="price"
            currentSortBy={sortBy}
            sortDirection={sortDirection}
            align="right"
          />
          <SortableTableHeader
            label={t("table.stall")}
            onSort={() => onSort("shelterLevel")}
            columnKey="shelterLevel"
            currentSortBy={sortBy}
            sortDirection={sortDirection}
          />
          <SortableTableHeader
            label="XP"
            onSort={() => onSort("xp")}
            columnKey="xp"
            currentSortBy={sortBy}
            sortDirection={sortDirection}
          />
          {isAdmin && <th style={{ textAlign: "right" }}>{tCommon("actions")}</th>}
        </tr>
      </thead>
      <tbody>
        {animals.length > 0 ? (
          animals.map((animal) => (
            <tr key={animal.id}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <ThumbnailBadge image={animal.image} category={"any"} name={animal.name} />
                  <strong>{animal.name}</strong>
                </div>
              </td>
              <td>
                <BiomeBadge type={animal.biomeName} />
              </td>
              <td style={{ textAlign: "right" }}>
                <CurrencyBadge
                  value={animal.price}
                  type={animal.priceType === "Diamond" ? "Diamond" : "Zoodollar"}
                />
              </td>
              <td>
                <ShelterLevelBadge level={animal.shelterLevel} habitat={animal.biomeName} />
              </td>
              <td>
                <XPBadge label={calculateTotalXP(animal)} />
              </td>
              {isAdmin && (
                <td style={{ textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "8px",
                    }}
                  >
                    <ActionBadge
                      type="edit"
                      onClickAction={() => onEdit(animal.id)}
                      tooltip={tCommon("edit")}
                    />
                    <ActionBadge
                      type="delete"
                      onClickAction={() => onDelete(animal.id)}
                      tooltip={tCommon("delete")}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={isAdmin ? 6 : 5} style={{ textAlign: "center", padding: "40px" }}>
              {t("empty.title")} 🐾
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
