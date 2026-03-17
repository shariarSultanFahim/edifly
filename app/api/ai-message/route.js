import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "ai-messages.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const messages = JSON.parse(raw);

    // Return a random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    return NextResponse.json({ message: messages[randomIndex] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get message" },
      { status: 500 }
    );
  }
}
