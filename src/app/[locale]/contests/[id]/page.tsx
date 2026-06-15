import { getContestById, getResultsByContestId } from "@/service/ContestService";

import ContestDetailClient from "./ContestDetailClient";
import { notFound } from "next/navigation";
import { calculateAnimalStats } from "@/utils/ContestUtil";
import { ContestStatue } from "@/types/contest";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function ContestDetailPage({ params }: Props) {
  const { id, locale } = await params;

  // 1. Daten direkt auf dem Server abrufen
  const contest = await getContestById(id);

  // Falls der Contest nicht existiert, Next.js 404 zeigen
  if (!contest) {
    notFound();
  }

  const results = await getResultsByContestId(id);

  const analyses = contest.conteststatue.map((contestStatue: ContestStatue) => ({
    animal: contestStatue.statue.animal,
    stats: calculateAnimalStats(contestStatue.statue.animal.id, results),
  }));

  return <ContestDetailClient contest={contest} analyses={analyses} locale={locale} />;
}
