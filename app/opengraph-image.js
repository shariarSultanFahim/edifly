import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px",
        background:
          "linear-gradient(135deg, #0b1f3a 0%, #1d4f91 45%, #d4af37 100%)",
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontSize: 38,
          fontWeight: 600,
          opacity: 0.95,
        }}
      >
        <span>🌙</span>
        <span>EidiFly</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.02 }}>
          Eid Mubarak Cards
        </div>
        <div style={{ fontSize: 36, opacity: 0.92 }}>
          Create and share beautiful greetings in seconds
        </div>
      </div>

      <div style={{ fontSize: 28, fontWeight: 600, opacity: 0.95 }}>
        Create yours now at eidifly.fa-m.dev
      </div>
    </div>,
    {
      ...size,
    },
  );
}
