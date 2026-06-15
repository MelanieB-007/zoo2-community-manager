"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";

import * as Styles from "@/components/pages/Contests/ContestDonationForm/ContestDonationForm.styles";

import ThumbnailBadge from "@/components/ui/badges/ThumbnailBadge";
import { getStatueName } from "@/utils/ContestUtil";
import PageHeader from "@/components/page-structure/page/PageHeader";
import { getAnimalImage } from "@/utils/AnimalUtil";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { Contest } from "@/types/contest";
import { User } from "@/types/user";
import FormSelect from "@/components/ui/form/FormSelect";
import DynamicRowInput from "@/components/ui/form/DynamicRowInput";

interface ContestEntryFormProps {
  contest: Contest;
  members: User[];
  selectedMember: string | null;
  setSelectedMember: (memberId: string | null) => void;
  entries: any;
  columns: any;
  handlers: any;
  onSubmit: (e: React.SubmitEvent) => Promise<void>;
}
export default function ContestDonationForm({
  contest,
  members,
  selectedMember,
  setSelectedMember,
  entries,
  columns,
  handlers, // Objekt mit addRow, removeRow, handleRowChange
  onSubmit,
}: ContestEntryFormProps) {
  const t = useTranslations();

  const locale = useLocale();
  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

  return (
    <form onSubmit={onSubmit}>
      <Styles.HeaderSection>
        <PageHeader text={t("Contest.contestOverview.entry.title")} />
        <Styles.DateRange>
          {new Date(contest.startDate).toLocaleDateString(locale, options)} &ndash;
          {new Date(contest.endDate).toLocaleDateString(locale, options)}
        </Styles.DateRange>
      </Styles.HeaderSection>

      <Styles.Section>
        <Styles.Label>{t("Contest.contestOverview.entry.clubMember")}</Styles.Label>
        <FormSelect
          value={selectedMember}
          onChange={(e: any) => setSelectedMember(e.target.value)}
          placeholder={t("Contest.contestOverview.entry.chooseMember")}
          options={members.map((m) => ({
            value: m.id,
            label: m.name || m.name,
          }))}
          required
        />
      </Styles.Section>

      {/* Wir mappen über conteststatue (Prisma Relation Name) */}
      {contest.conteststatue?.map((link, index) => {
        const statue = link.statue;
        const animal = statue.animal;
        const isColorVariant = index === 3;

        return (
          <Styles.AnimalSection key={animal.id} $isColorVariant={isColorVariant}>
            <Styles.AnimalHeader>
              <ThumbnailBadge image={getAnimalImage(animal)} size={55} biome={animal.biome} />
              <Styles.TitleGroup>
                <h3>{getStatueName(statue, "Unbekannt")}</h3>
                {isColorVariant && (
                  <Styles.ColorLabel>{t("Contest.details.colorVariant")}</Styles.ColorLabel>
                )}
              </Styles.TitleGroup>
            </Styles.AnimalHeader>

            <DynamicRowInput
              columns={columns}
              rows={entries[animal.id] || []}
              onAdd={() => handlers.addRow(animal.id)}
              onRemove={(rowId: any) => handlers.removeRow(animal.id, rowId)}
              onChange={(rowId: any, key: any, value: any) =>
                handlers.handleRowChange(animal.id, rowId, key, value)
              }
            />
          </Styles.AnimalSection>
        );
      })}

      <Styles.SubmitSection>
        <SubmitButton label={t("Common.save_changes")} isSubmitting={false} />
      </Styles.SubmitSection>
    </form>
  );
}
