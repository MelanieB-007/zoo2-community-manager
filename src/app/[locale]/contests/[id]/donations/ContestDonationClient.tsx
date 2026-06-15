"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import { Contest } from "@/types/contest";
import { User } from "@/types/user";
import PageWrapper from "@/components/page-structure/page/PageWrapper";
import ContestDonationForm from "@/components/pages/Contests/ContestDonationForm/ContestDonationForm";

// 1. Definiere die Struktur einer einzelnen Zeile
interface EntryRow {
  id: string | number;
  level: string | number;
  count: string | number;
}

// 2. Definiere das Objekt, das die Tier-IDs auf die Zeilen-Arrays mappt
interface EntriesState {
  [key: string | number]: EntryRow[];
}

interface ContestDonationClientProps {
  contest: Contest;
  members: User[];
}
export default function ContestDonationClient({ contest, members }: ContestDonationClientProps) {
  const t = useTranslations();
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState<string | null>("");

  // Hilfsfunktion für das leere Start-Layout (memoized)
  const emptyEntries = useMemo<EntriesState>(() => {
    return (contest.conteststatue || []).reduce((acc: EntriesState, link) => {
      const animalId = link.statue.animal.id;
      acc[animalId] = [{ id: crypto.randomUUID(), level: "", count: "" }];
      return acc;
    }, {}); // Hier wird {} nun als EntriesState behandelt
  }, [contest]);

  const [entries, setEntries] = useState<EntriesState>(emptyEntries);

  useEffect(() => {
    async function loadMemberEntries() {
      if (!selectedMember) {
        setEntries(emptyEntries);
        return;
      }

      try {
        const res = await fetch(
          `/api/contests/get-entry?contestId=${contest.id}&memberId=${selectedMember}`,
        );

        if (res.ok) {
          const result = await res.json();
          // Merge Logik: Falls DB Daten hat, diese nehmen, sonst leeres Schema
          const mergedEntries = { ...emptyEntries };
          if (result.data && Object.keys(result.data).length > 0) {
            Object.assign(mergedEntries, result.data);
          }
          setEntries(mergedEntries);
        }
      } catch (error) {
        console.error("Fehler beim Laden:", error);
        setEntries(emptyEntries);
      }
    }

    loadMemberEntries();
  }, [selectedMember, contest.id, emptyEntries]);

  const columns = [
    {
      key: "level",
      label: t("Contest.contestOverview.entry.level"),
      type: "number",
      $flex: 1,
    },
    {
      key: "count",
      label: t("Contest.contestOverview.entry.count"),
      type: "number",
      $flex: 1,
    },
  ];

  const handlers = {
    addRow: (animalId: number) =>
      setEntries((prev) => ({
        ...prev,
        [animalId]: [...prev[animalId], { id: crypto.randomUUID(), level: "", count: "" }],
      })),
    removeRow: (animalId: number, rowId: number) =>
      setEntries((prev) => ({
        ...prev,
        [animalId]: prev[animalId].filter((row: any) => row.id !== rowId),
      })),
    handleRowChange: (animalId: number, rowId: number, key: any, value: number) =>
      setEntries((prev) => ({
        ...prev,
        [animalId]: prev[animalId].map((row: any) =>
          row.id === rowId ? { ...row, [key]: value } : row,
        ),
      })),
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contests/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contestId: contest.id,
          memberId: selectedMember,
          data: entries,
        }),
      });

      if (res.ok) {
        toast.success(t("Common.save_changes"));
        router.push(`/contests/${contest.id}`);
        router.refresh(); // Server-Daten aktualisieren
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error(t("Common.save_changes_error"));
    }
  };

  return (
    <PageWrapper>
      <ContestDonationForm
        contest={contest}
        members={members}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        entries={entries}
        columns={columns}
        handlers={handlers}
        onSubmit={handleSubmit}
      />
    </PageWrapper>
  );
}
