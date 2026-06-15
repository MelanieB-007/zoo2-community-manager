"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import ContestDetailView from "@/components/pages/Contests/ContestDetail/ContestDetailView";
import { Contest } from "@/types/contest";

interface ContestDetailClientProps {
  contest: Contest;
  analyses: any[];
  locale: string;
}

export default function ContestDetailClient({ contest, analyses }: ContestDetailClientProps) {
  const t = useTranslations();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/contests/${contest.id}/edit`);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: t("Contest.contestOverview.messages.deleteErrorTitle"),
      text: t("Contest.contestOverview.messages.confirmDelete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("Contest.contestOverview.messages.deleteButton"),
      cancelButtonText: t("Contest.contestOverview.messages.cancelButton"),
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/contests/${contest.id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          toast.success(t("Common.save_changes"));
          router.push("/contests");
          router.refresh(); // Wichtig, um die Liste zu aktualisieren
        }
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error(t("Common.error"));
      }
    }
  };

  return (
    <ContestDetailView
      contest={contest}
      analyses={analyses}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
