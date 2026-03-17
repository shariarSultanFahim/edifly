import { decodeCardData } from "@/lib/storage";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const card = decodeCardData(id);

  const recipient = card?.recipientName?.trim() || "Your Loved One";
  const sender = card?.senderName?.trim() || "Someone Special";
  const message =
    card?.message?.trim() ||
    "May this blessed occasion bring peace, joy, and prosperity to you and your family.";
  const headline = `Eid Mubarak, ${recipient}`;
  const signature = `From ${sender}`;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background:
          "linear-gradient(145deg, #0f172a 0%, #1e3a8a 50%, #d4af37 100%)",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 32,
        }}
      >
        <span>🌙 EidiFly</span>
        <span style={{ opacity: 0.85 }}>Shared Greeting Card</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.02 }}>
          {headline}
        </div>
        <div style={{ fontSize: 34, opacity: 0.92, maxWidth: "92%" }}>
          {message.length > 120 ? `${message.slice(0, 117)}...` : message}
        </div>
      </div>

      <div style={{ fontSize: 30, opacity: 0.9 }}>{signature}</div>
    </div>,
    {
      ...size,
    },
  );
}
