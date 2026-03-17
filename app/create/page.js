"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { templates, cardFonts } from "@/lib/templates";
import CardPreview from "@/components/CardPreview";
import TemplateCard from "@/components/TemplateCard";
import ShareActions from "@/components/ShareActions";

function CreateCardForm() {
  const searchParams = useSearchParams();
  const initialTemplate = searchParams.get("template") || templates[0].id;

  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  const [selectedFont, setSelectedFont] = useState(cardFonts[0].id);
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdCardId, setCreatedCardId] = useState(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const cardRef = useRef(null);
  const aiAbortRef = useRef(false);

  const handleAiGenerate = async () => {
    if (aiGenerating) return;
    setAiGenerating(true);
    aiAbortRef.current = false;
    setMessage("");

    try {
      const res = await fetch("/api/ai-message");
      const data = await res.json();

      if (!res.ok || !data.message) {
        throw new Error("Failed to generate");
      }

      const text = data.message;
      for (let i = 0; i < text.length; i++) {
        if (aiAbortRef.current) break;
        await new Promise((resolve) => setTimeout(resolve, 18 + Math.random() * 22));
        setMessage((prev) => prev + text[i]);
      }
    } catch {
      setError("Could not generate a message. Please try again.");
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!recipientName.trim() || !senderName.trim() || !message.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: selectedTemplate,
          fontId: selectedFont,
          recipientName: recipientName.trim(),
          senderName: senderName.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setCreatedCardId(data.id);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // --- Success Screen ---
  if (createdCardId) {
    return (
      <main className="create-page">
        <nav className="create-nav">
          <a href="/" className="nav-logo">
            <span className="nav-icon">✦</span>
            EidiFly
          </a>
        </nav>
        <div className="success-screen">
          <div className="success-header">
            <div className="success-icon">🎉</div>
            <h1 className="success-title">Your Card is Ready!</h1>
            <p className="success-subtitle">Share it with your loved ones</p>
          </div>
          <div className="success-card" ref={cardRef}>
            <CardPreview
              templateId={selectedTemplate}
              fontId={selectedFont}
              recipientName={recipientName}
              senderName={senderName}
              message={message}
            />
          </div>
          <ShareActions cardId={createdCardId} cardRef={cardRef} />
        </div>
      </main>
    );
  }

  return (
    <main className="create-page">
      <nav className="create-nav">
        <a href="/" className="nav-logo">
          <span className="nav-icon">✦</span>
          EidiFly
        </a>
      </nav>

      <div className="create-layout">
        {/* Left: Live Preview */}
        <div className="preview-panel">
          <div className="preview-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Live Preview
          </div>
          <div className="preview-wrapper">
            <CardPreview
              templateId={selectedTemplate}
              fontId={selectedFont}
              recipientName={recipientName || "Friend"}
              senderName={senderName || "Your Name"}
              message={message || "Wishing you a blessed Eid filled with joy, peace, and happiness!"}
            />
          </div>
        </div>

        {/* Right: Editor Form */}
        <div className="editor-panel">
          <div className="editor-header">
            <h1 className="editor-title">Customize Your Card</h1>
            <p className="editor-subtitle">
              Fill in the details and watch your card come to life
            </p>
          </div>

          <form onSubmit={handleSubmit} className="editor-form">
            {/* Template Selector */}
            <div className="form-section">
              <label className="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                Choose Template
              </label>
              <div className="template-selector">
                {templates.map((t) => (
                  <TemplateCard
                    key={t.id}
                    template={t}
                    onClick={setSelectedTemplate}
                    selected={selectedTemplate === t.id}
                  />
                ))}
              </div>
            </div>

            {/* Font Selector */}
            <div className="form-section">
              <label className="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 7 4 4 20 4 20 7" />
                  <line x1="9" y1="20" x2="15" y2="20" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
                Choose Font
              </label>
              <div className="font-selector">
                {cardFonts.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`font-option ${selectedFont === f.id ? "font-selected" : ""}`}
                    onClick={() => setSelectedFont(f.id)}
                  >
                    <span
                      className="font-preview-text"
                      style={{ fontFamily: `${f.cssVar}, serif` }}
                    >
                      Eid Mubarak
                    </span>
                    <span className="font-name">{f.name}</span>
                    <span className="font-category">{f.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="recipientName">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Recipient Name
              </label>
              <input
                type="text"
                id="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Ahmed, Sarah..."
                className="form-input"
                maxLength={50}
              />
            </div>

            {/* Sender Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="senderName">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                Your Name
              </label>
              <input
                type="text"
                id="senderName"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Your name..."
                className="form-input"
                maxLength={50}
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label" htmlFor="message">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Your Message
                </label>
                <button
                  type="button"
                  className={`btn-ai-generate ${aiGenerating ? "ai-active" : ""}`}
                  onClick={handleAiGenerate}
                  disabled={aiGenerating}
                  title="Generate message with AI"
                  id="ai-generate-button"
                >
                  <svg className="ai-star-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                  {aiGenerating ? "Writing..." : "AI Write"}
                </button>
              </div>
              <div className={`textarea-wrapper ${aiGenerating ? "ai-typing" : ""}`}>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => {
                    if (aiGenerating) {
                      aiAbortRef.current = true;
                    }
                    setMessage(e.target.value);
                  }}
                  placeholder="Write your heartfelt Eid message..."
                  className="form-textarea"
                  rows={4}
                  maxLength={300}
                />
                {aiGenerating && <span className="ai-cursor">|</span>}
              </div>
              <div className="char-count">{message.length}/300</div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button
              type="submit"
              className="btn btn-create"
              disabled={loading}
              id="create-card-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                  Create & Share Card
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <main className="create-page">
          <div className="loading-container">
            <span className="spinner large"></span>
            <p>Loading editor...</p>
          </div>
        </main>
      }
    >
      <CreateCardForm />
    </Suspense>
  );
}
