"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import * as Styles from "./AnimalMobileCard.styles";

import { Animal } from "@/types/animal";

import ActionBadge from "@/components/ui/badges/ActionBadge";
import GameBadge from "@/components/ui/badges/GameBadge";
import BiomeBadge from "@/components/ui/badges/BiomeBadge";
import ShelterLevelBadge from "@/components/ui/badges/ShelterLevelBadge";
import { Name } from "@/components/elements/Name/Name";
import PriceBadge from "@/components/ui/badges/PriceBadge";

interface AnimalMobileCardProps {
  animal: Animal;
  onClickAction: () => void;
  onEditAction: () => void;
  onDeleteAction: () => void;
}
export default function AnimalMobileCard({
  animal,
  onClickAction,
  onEditAction,
  onDeleteAction,
}: AnimalMobileCardProps) {
  const t = useTranslations();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "Director";

  const habitatId = animal.biomeName?.toLowerCase() || "standard";

  const displayName = animal.name;

  return (
    <Styles.CardContainer onClick={onClickAction}>
      <Styles.HeaderRow>
        <Name>{displayName}</Name>
        {isAdmin && (
          <Styles.ActionGroup onClick={(e) => e.stopPropagation()}>
            <ActionBadge type="edit" tooltip={t("Buttons.edit")} onClickAction={onEditAction} />
            <ActionBadge
              type="delete"
              tooltip={t("Buttons.delete")}
              onClickAction={onDeleteAction}
            />
          </Styles.ActionGroup>
        )}
      </Styles.HeaderRow>

      <Styles.Divider />

      <Styles.StatsRow>
        <Styles.PriceRow>
          <PriceBadge
            value={animal.price ?? 0}
            type={animal.priceType === "Diamond" ? "Diamond" : "Zoodollar"}
          />
        </Styles.PriceRow>

        <Styles.IconsRow>
          <GameBadge type={`tiere/${habitatId}`} fileName={animal.image} size={50} />

          <BiomeBadge type={animal.biomeName} size={35} />

          <ShelterLevelBadge level={animal.shelterLevel} habitat={animal.biomeName} />
        </Styles.IconsRow>
      </Styles.StatsRow>
    </Styles.CardContainer>
  );
}
