"use client";

import CardPreview from "@/components/CardPreview";
import { useEffect, useState } from "react";

export default function CardViewClient({ id }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`/api/cards/${id}`);
        if (!res.ok) {
          throw new Error("Card not found");
        }
        const data = await res.json();
        setCard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [id]);

  if (loading) {
    return (
      <main className="card-view-page">
        <div className="loading-container">
          <span className="spinner large"></span>
          <p>Loading your Eid card...</p>
        </div>
      </main>
    );
  }

  if (error || !card) {
    return (
      <main className="card-view-page">
        <div className="error-container">
          <div className="error-icon">😔</div>
          <h1>Card Not Found</h1>
          <p>Sorry, we couldn&apos;t find this greeting card.</p>
          <a href="/" className="btn btn-hero">
            Create a New Card
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="card-view-page">
      <div className="card-view-content">
        <div className="card-view-header">
          <h1 className="card-view-title">✦ Eid Mubarak ✦</h1>
          <p className="card-view-subtitle">
            A special card has been shared with you
          </p>
        </div>

        <div className="card-view-preview">
          <CardPreview
            templateId={card.templateId}
            fontId={card.fontId}
            recipientName={card.recipientName}
            senderName={card.senderName}
            message={card.message}
          />
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <p>Made with ❤️ for the Eid Celebration</p>
          <a href="/" className="footer-cta">
            Create your own Edifly →
          </a>
        </div>
      </footer>
    </main>
  );
}
