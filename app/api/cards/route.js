import { saveCard } from "@/lib/storage";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { templateId, fontId, recipientName, senderName, message } = body;

    if (!templateId || !recipientName || !senderName || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const card = {
      id: nanoid(8),
      templateId,
      fontId: fontId || "playfair",
      recipientName: recipientName.trim(),
      senderName: senderName.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    saveCard(card);

    return NextResponse.json({
      id: card.id,
      shareUrl: `/card/${card.id}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create card" },
      { status: 500 }
    );
  }
}
