import Link from "next/link";
import { templates } from "@/lib/templates";

export const metadata = {
  title: "EidiFly — Create & Share Beautiful Eid Cards",
  description:
    "Create stunning Eid Mubarak virtual greeting cards with EidiFly. Choose from 12+ gorgeous templates, customize fonts and messages, and share with friends and family via a simple link.",
  openGraph: {
    title: "EidiFly — Create & Share Beautiful Eid Cards",
    description:
      "Design beautiful Eid greeting cards in seconds. Pick a template, write your message, and share the joy of Eid!",
  },
};

export default function HomePage() {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-pattern"></div>
        <div className="hero-content">
          <div className="hero-badge">✦ Eid Mubarak 2026 ✦</div>
          <h1 className="hero-title">
            Create Beautiful
            <span className="hero-title-accent"> Eid Cards</span>
          </h1>
          <p className="hero-subtitle">
            Design stunning virtual greeting cards, add your heartfelt message,
            and share the joy of Eid with your loved ones.
          </p>
          <a href="#templates" className="btn btn-hero">
            <span>Start Creating</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Floating decorations */}
        <div className="floating-elements">
          <span className="float-element" style={{ "--delay": "0s", "--x": "10%", "--y": "20%" }}>🌙</span>
          <span className="float-element" style={{ "--delay": "1s", "--x": "85%", "--y": "15%" }}>⭐</span>
          <span className="float-element" style={{ "--delay": "2s", "--x": "70%", "--y": "70%" }}>🏮</span>
          <span className="float-element" style={{ "--delay": "0.5s", "--x": "15%", "--y": "75%" }}>✦</span>
          <span className="float-element" style={{ "--delay": "1.5s", "--x": "90%", "--y": "50%" }}>🕌</span>
          <span className="float-element" style={{ "--delay": "2.5s", "--x": "50%", "--y": "10%" }}>🌟</span>
        </div>
      </section>

      {/* Templates Section */}
      <section className="templates-section" id="templates">
        <div className="section-header">
          <span className="section-badge">Choose Your Design</span>
          <h2 className="section-title">Beautiful Card Templates</h2>
          <p className="section-subtitle">
            Select a template to get started. Each design is crafted with love
            and inspired by the beauty of Islamic art.
          </p>
        </div>

        <div className="templates-grid">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/create?template=${template.id}`}
              className="template-card-link"
            >
              <div
                className="template-card"
                style={{
                  background: template.gradient,
                  border: template.borderStyle,
                }}
              >
                <div className="template-card-inner">
                  <div
                    className="template-preview-icon"
                    style={{ color: template.accentColor }}
                  >
                    {template.decorationType === "mosque" && "🕌"}
                    {template.decorationType === "crescent" && "🌙"}
                    {template.decorationType === "lantern" && "🏮"}
                    {template.decorationType === "geometric" && "✦"}
                    {template.decorationType === "floral" && "🌸"}
                    {template.decorationType === "stars" && "⭐"}
                  </div>
                  <h3
                    className="template-name"
                    style={{ color: template.textColor }}
                  >
                    {template.name}
                  </h3>
                  <p
                    className="template-description"
                    style={{ color: template.textColor, opacity: 0.7 }}
                  >
                    {template.description}
                  </p>
                  <div
                    className="template-cta"
                    style={{ color: template.accentColor }}
                  >
                    Use This Template →
                  </div>
                </div>
                <div
                  className="template-card-glow"
                  style={{ background: template.accentColor }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works section */}
      <section className="how-it-works">
        <div className="section-header">
          <span className="section-badge">Simple & Easy</span>
          <h2 className="section-title">How It Works</h2>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Choose a Template</h3>
            <p>Pick from our beautiful collection of Eid-themed designs</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Customize Your Card</h3>
            <p>Add your personal message, names, and make it special</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Share the Joy</h3>
            <p>Get a shareable link or download as an image to send</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <p>Made with ❤️ for the Eid Celebration</p>
          <p className="footer-sub">Spread joy and blessings this Eid</p>
          <a href="https://fa-m.dev/" target="_blank" rel="noopener noreferrer" className="footer-portfolio">
            Built by fa-m.dev
          </a>
        </div>
      </footer>
    </main>
  );
}
