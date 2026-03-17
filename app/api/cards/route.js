import { encodeCardData } from "@/lib/storage";
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
      templateId,
      fontId: fontId || "playfair",
      recipientName: recipientName.trim(),
      senderName: senderName.trim(),
      message: message.trim(),
    };

    const encoded = encodeCardData(card);

    return NextResponse.json({
      id: encoded,
      shareUrl: `/card/${encoded}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create card" },
      { status: 500 }
    );
  }
}
