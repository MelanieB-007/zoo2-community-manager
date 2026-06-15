"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import * as Styles from "@/components/pages/Contests/ContestDetail/ContestDetailView.styles";
import PageHeader from "@/components/page-structure/page/PageHeader";
import ActionGroupBadge from "@/components/ui/badges/ActionGroupBadge";
import { Contest } from "@/types/contest";
import { getAnimalImage } from "@/utils/AnimalUtil";
import Accordion from "@/components/ui/accordion/accordion";

interface ContestDetailViewProps {
  contest: Contest;
  analyses: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
export default function ContestDetailView({
  contest,
  analyses,
  onEdit,
  onDelete,
}: ContestDetailViewProps) {
  const t = useTranslations();

  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

  const isExpired = new Date() > new Date(contest.endDate);
  console.log("contest", contest);

  return (
    <Styles.Container>
      <Styles.AdminActions>
        <ActionGroupBadge
          object={contest}
          onEdit={() => onEdit(contest.id.toString())}
          onDelete={() => onDelete(contest.id.toString())}
        />
      </Styles.AdminActions>

      <PageHeader text={t("Contest.details.headline")} />

      <Styles.MetaInfo>
        📅 {new Date(contest.startDate).toLocaleDateString(undefined, options)} –
        {new Date(contest.endDate).toLocaleDateString(undefined, options)}
      </Styles.MetaInfo>

      {!isExpired && (
        <Styles.ActionRow>
          <Link href={`/contests/${contest.id}/donations`} passHref>
            <Styles.StyledButton type="button">
              {t("Contest.details.postAnimals")}
            </Styles.StyledButton>
          </Link>
        </Styles.ActionRow>
      )}

      <Styles.TierGrid>
        {analyses.map(({ animal, stats }, index) => (
          <Styles.AccordionWrapper key={animal.id} $isColorVariant={index === 3}>
            <Accordion
              icon={getAnimalImage(animal)}
              biome={animal.biome}
              title={
                <Styles.HeaderContent>
                  <Styles.TitleGroup>
                    <Styles.AnimalName>{animal.animaltext[0].animalName}</Styles.AnimalName>
                    {index === 3 && (
                      <Styles.ColorLabel>{t("Contest.details.colorVariant")}</Styles.ColorLabel>
                    )}
                  </Styles.TitleGroup>
                  <Styles.PointsTotal>
                    {stats.totalWeighted.toLocaleString()} Pkt.
                  </Styles.PointsTotal>
                </Styles.HeaderContent>
              }
            >
              {/* Der Inhalt des Accordions (deine Ranking-Liste) */}
              <Styles.RankingTable>
                <thead>
                  <tr>
                    <th>{t("Contest.details.rang")}</th>
                    <th className="left">{t("Contest.details.member")}</th>
                    <th className="right">{t("Contest.details.points")}</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.rankedMembers.map((m: any, i: number) => (
                    <tr key={i}>
                      <td>
                        <Styles.Badge>{i + 1}</Styles.Badge>
                      </td>
                      <td className="left">{m.name}</td>
                      <td className="right">
                        <Styles.PointsCell>
                          <small>
                            {m.rawSum} × {m.multiplier}
                          </small>
                          <strong>{m.weighted.toLocaleString()}</strong>
                        </Styles.PointsCell>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Styles.RankingTable>

              {stats.rankedMembers.length === 0 && (
                <Styles.EmptyState>{t("Contest.details.noPosts")}</Styles.EmptyState>
              )}
            </Accordion>
          </Styles.AccordionWrapper>
        ))}
      </Styles.TierGrid>
    </Styles.Container>
  );
}
