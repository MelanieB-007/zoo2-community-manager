import { useState } from "react";

// Wir definieren einen Typ für die Sortierrichtung
type SortDirection = "asc" | "desc";

export function useSort(
  initialKey: string = "name",
  initialDirection: SortDirection = "asc",
) {
  const [sortBy, setSortBy] = useState<string>(initialKey);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialDirection);

  const toggleSort = (key: string) => {
    if (sortBy === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  return {
    sortBy,
    sortDirection,
    toggleSort,
    /**
     * Hilfreich für die Tabellenköpfe in der AnimalOverview
     */
    getSortIcon: (key: string): string => {
      if (sortBy !== key) return "↕";
      return sortDirection === "asc" ? "▲" : "▼";
    },
  };
}
