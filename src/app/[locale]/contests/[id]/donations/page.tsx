import { notFound } from "next/navigation";
import ContestDonationClient from "@/app/[locale]/contests/[id]/donations/ContestDonationClient";
import { getContestById } from "@/service/ContestService";
import { getAllMembers } from "@/service/UserService";

export default async function ContestDonationPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Daten parallel laden
  const [contest, members] = await Promise.all([getContestById(id), getAllMembers()]);

  if (!contest) {
    notFound();
  }

  return (
    <ContestDonationClient
      contest={JSON.parse(JSON.stringify(contest))}
      members={JSON.parse(JSON.stringify(members))}
    />
  );
}
