export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAllAnimals } from "@/service/AnimalService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "de";

  try {
    // Nutze den gleichen Service wie in deiner page.tsx
    const animals = await getAllAnimals(locale);
    return NextResponse.json(animals);
  } catch (error) {
    return NextResponse.json({ error: "Fehler beim Laden" }, { status: 500 });
  }
}
