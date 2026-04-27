"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useTransition } from "react";
import { useTranslations } from "next-intl";

import * as Styles from "@/components/elements/Filter/Filter.styles";
import { Animal } from "@/types/animal";
import CustomBadgeFilter from "@/components/elements/Filter/CustomBadgeFilter";
import BiomeBadge from "@/components/ui/badges/BiomeBadge";
import ShelterLevelBadge from "@/components/ui/badges/ShelterLevelBadge";

interface FilterBarProps {
  animals: Animal[];
  showBiomeFilter?: boolean;
  showLevelFilter?: boolean;
}

export default function FilterBar({
  animals = [],
  showBiomeFilter = true,
  showLevelFilter = true,
}: Partial<FilterBarProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  // Aktuelle Werte aus der URL holen
  const searchTerm = searchParams.get("search") || "";
  const selectedBiome = searchParams.get("biome") || "all";
  const selectedLevel = searchParams.get("level") || "all";

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1");

    // "startTransition" verhindert, dass die UI während des URL-Updates einfriert
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const uniqueBiomes = Array.from(new Set(animals.map((a) => a.biomeName))).filter(Boolean);

  const uniqueLevels = Array.from(new Set(animals.map((a) => a.shelterLevel)))
    .filter((lvl): lvl is number => lvl !== undefined && lvl !== null)
    .sort((a, b) => a - b);

  return (
    <Styles.FilterBar style={{ opacity: isPending ? 0.7 : 1 }}>
      <Styles.SearchInput
        type="text"
        placeholder={t("Filter.search_placeholder")}
        value={searchTerm}
        onChange={(e) => updateFilters({ search: e.target.value })}
      />

      {showBiomeFilter && (
        <CustomBadgeFilter
          items={uniqueBiomes}
          selectedValue={selectedBiome}
          onSelectAction={(val) => updateFilters({ biome: val })}
          allLabelKey="all_enclosures"
          getIdentifier={(b) => b}
          renderBadge={(biome) => <BiomeBadge type={biome} size={20} showTooltip={false} />}
        />
      )}

      {showLevelFilter && (
        <CustomBadgeFilter
          items={uniqueLevels}
          selectedValue={selectedLevel}
          onSelectAction={(val) => updateFilters({ level: val })}
          allLabelKey="all_levels"
          labelPrefixKey="level_label"
          getIdentifier={(lvl) => String(lvl)}
          renderBadge={(lvl) => (
            <Styles.ScaledBadge>
              <ShelterLevelBadge
                level={Number(lvl)}
                habitat="grassland"
                showTooltip={false}
                size={60}
              />
            </Styles.ScaledBadge>
          )}
        />
      )}
    </Styles.FilterBar>
  );
}
