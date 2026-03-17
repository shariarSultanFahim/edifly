import { getCard } from "@/lib/storage";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  const card = getCard(id);

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}
