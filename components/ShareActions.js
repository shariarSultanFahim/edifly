"use client";

import { useState } from "react";

export default function ShareActions({ cardId, cardRef }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/card/${cardId}`
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = async () => {
    if (!cardRef?.current) return;
    setDownloading(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const cardCanvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const footerHeight = Math.max(64, Math.round(cardCanvas.height * 0.08));
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = cardCanvas.width;
      finalCanvas.height = cardCanvas.height + footerHeight;
      const context = finalCanvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas context not available");
      }

      context.drawImage(cardCanvas, 0, 0);
      context.fillStyle = "#0a0e1a";
      context.fillRect(0, cardCanvas.height, finalCanvas.width, footerHeight);

      context.fillStyle = "rgba(212, 175, 55, 0.95)";
      context.font = `${Math.max(20, Math.round(footerHeight * 0.42))}px system-ui, sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
        "Created with EidiFly / fa-m.dev",
        finalCanvas.width / 2,
        cardCanvas.height + footerHeight / 2,
      );

      const link = document.createElement("a");
      link.download = `eid-card-${cardId}.png`;
      link.href = finalCanvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="share-actions">
      <div className="share-url-box">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="share-url-input"
          id="share-url-input"
        />
        <button
          onClick={handleCopyLink}
          className={`btn btn-copy ${copied ? "btn-copied" : ""}`}
          id="copy-link-button"
        >
          {copied ? (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy Link
            </>
          )}
        </button>
      </div>

      <div className="share-buttons">
        <button
          onClick={handleDownload}
          className="btn btn-download"
          disabled={downloading}
          id="download-card-button"
        >
          {downloading ? (
            <>
              <span className="spinner"></span>
              Saving...
            </>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download as Image
            </>
          )}
        </button>

        <a href="/" className="btn btn-new" id="create-another-button">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Another Card
        </a>
      </div>
    </div>
  );
}
