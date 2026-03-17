"use client";

import { getTemplateById, getFontById } from "@/lib/templates";

export default function CardPreview({
  templateId,
  recipientName,
  senderName,
  message,
  fontId = "playfair",
  compact = false,
}) {
  const template = getTemplateById(templateId);
  const font = getFontById(fontId);

  const renderDecorations = () => {
    switch (template.decorationType) {
      case "mosque":
        return (
          <div className="card-decoration mosque-decoration">
            <svg viewBox="0 0 400 120" className="mosque-svg">
              <defs>
                <linearGradient id={`mosqueGrad-${template.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={template.accentColor} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={template.accentColor} stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Central dome */}
              <ellipse cx="200" cy="60" rx="40" ry="45" fill={`url(#mosqueGrad-${template.id})`} />
              <rect x="185" y="15" width="2" height="20" fill={template.accentColor} />
              <circle cx="186" cy="12" r="4" fill={template.accentColor} />
              {/* Side domes */}
              <ellipse cx="130" cy="75" rx="25" ry="30" fill={`url(#mosqueGrad-${template.id})`} opacity="0.7" />
              <ellipse cx="270" cy="75" rx="25" ry="30" fill={`url(#mosqueGrad-${template.id})`} opacity="0.7" />
              {/* Minarets */}
              <rect x="70" y="30" width="8" height="90" fill={template.accentColor} opacity="0.5" />
              <rect x="322" y="30" width="8" height="90" fill={template.accentColor} opacity="0.5" />
              <polygon points="74,30 64,45 84,45" fill={template.accentColor} opacity="0.6" />
              <polygon points="326,30 316,45 336,45" fill={template.accentColor} opacity="0.6" />
              {/* Base */}
              <rect x="60" y="100" width="280" height="20" fill={template.accentColor} opacity="0.15" rx="2" />
            </svg>
          </div>
        );

      case "crescent":
        return (
          <div className="card-decoration crescent-decoration">
            <svg viewBox="0 0 200 200" className="crescent-svg">
              <circle cx="100" cy="100" r="50" fill={template.accentColor} opacity="0.9" />
              <circle cx="120" cy="85" r="45" fill={template.gradient.includes("#0b0e2d") ? "#0b0e2d" : "#1b1e4b"} />
              {/* Stars */}
              {[
                [40, 40], [160, 50], [30, 140], [170, 130],
                [80, 30], [50, 80], [150, 80], [120, 160],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={1.5 + Math.random()} fill={template.accentColor} opacity={0.4 + Math.random() * 0.5} className="twinkle-star" style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </svg>
          </div>
        );

      case "lantern":
        return (
          <div className="card-decoration lantern-decoration">
            <svg viewBox="0 0 400 150" className="lantern-svg">
              {[80, 200, 320].map((x, i) => (
                <g key={i} className="lantern-group" style={{ animationDelay: `${i * 0.5}s` }}>
                  <line x1={x} y1="0" x2={x} y2={30 + i * 5} stroke={template.accentColor} strokeWidth="1" opacity="0.5" />
                  <rect x={x - 12} y={30 + i * 5} width="24" height="35" rx="4" fill={template.accentColor} opacity="0.3" />
                  <rect x={x - 8} y={33 + i * 5} width="16" height="28" rx="3" fill={template.accentColor} opacity="0.15" />
                  <ellipse cx={x} cy={48 + i * 5} rx="6" ry="8" fill={template.accentColor} opacity="0.6" className="lantern-glow" />
                  <line x1={x - 3} y1={38 + i * 5} x2={x - 3} y2={58 + i * 5} stroke={template.accentColor} strokeWidth="0.5" opacity="0.3" />
                  <line x1={x + 3} y1={38 + i * 5} x2={x + 3} y2={58 + i * 5} stroke={template.accentColor} strokeWidth="0.5" opacity="0.3" />
                </g>
              ))}
            </svg>
          </div>
        );

      case "geometric":
        return (
          <div className="card-decoration geometric-decoration">
            <svg viewBox="0 0 400 100" className="geometric-svg">
              <defs>
                <pattern id={`geoPattern-${template.id}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <polygon points="25,0 50,25 25,50 0,25" fill="none" stroke={template.accentColor} strokeWidth="0.5" opacity="0.4" />
                  <circle cx="25" cy="25" r="3" fill="none" stroke={template.accentColor} strokeWidth="0.5" opacity="0.3" />
                  <polygon points="25,10 40,25 25,40 10,25" fill="none" stroke={template.accentColor} strokeWidth="0.3" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="400" height="100" fill={`url(#geoPattern-${template.id})`} />
            </svg>
          </div>
        );

      case "floral":
        return (
          <div className="card-decoration floral-decoration">
            <svg viewBox="0 0 400 120" className="floral-svg">
              {[60, 200, 340].map((cx, i) => (
                <g key={i} opacity={0.4 + i * 0.1}>
                  {[0, 60, 120, 180, 240, 300].map((angle, j) => {
                    const rad = (angle * Math.PI) / 180;
                    const px = cx + Math.cos(rad) * 20;
                    const py = 60 + Math.sin(rad) * 20;
                    return (
                      <ellipse key={j} cx={px} cy={py} rx="10" ry="6" fill={template.accentColor} opacity="0.3"
                        transform={`rotate(${angle}, ${px}, ${py})`} />
                    );
                  })}
                  <circle cx={cx} cy={60} r="6" fill={template.accentColor} opacity="0.5" />
                </g>
              ))}
              {/* Swirling vines */}
              <path d={`M 0 100 Q 100 70 200 100 Q 300 130 400 100`} fill="none" stroke={template.accentColor} strokeWidth="1" opacity="0.2" />
              <path d={`M 0 110 Q 100 85 200 110 Q 300 135 400 110`} fill="none" stroke={template.accentColor} strokeWidth="0.5" opacity="0.15" />
            </svg>
          </div>
        );

      case "stars":
        return (
          <div className="card-decoration stars-decoration">
            <svg viewBox="0 0 400 150" className="stars-svg">
              {Array.from({ length: 30 }).map((_, i) => {
                const x = Math.random() * 400;
                const y = Math.random() * 150;
                const r = 0.5 + Math.random() * 2;
                return (
                  <circle key={i} cx={x} cy={y} r={r} fill={template.accentColor}
                    opacity={0.2 + Math.random() * 0.6} className="twinkle-star"
                    style={{ animationDelay: `${Math.random() * 3}s` }} />
                );
              })}
              {/* Big decorative star */}
              <polygon points="200,10 206,30 228,30 210,42 217,62 200,50 183,62 190,42 172,30 194,30"
                fill={template.accentColor} opacity="0.4" className="twinkle-star" />
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  const cardStyle = {
    background: template.gradient,
    border: template.borderStyle,
    fontFamily: `${font.cssVar}, serif`,
    "--accent": template.accentColor,
    "--text": template.textColor,
  };

  return (
    <div className={`card-preview ${compact ? "card-compact" : ""}`} style={cardStyle}>
      <div className="card-inner">
        {/* Top decoration */}
        <div className="card-top-decoration">
          {renderDecorations()}
        </div>

        {/* Decorative divider */}
        <div className="card-divider">
          <span className="divider-ornament">✦</span>
        </div>

        {/* Greeting */}
        <div className="card-greeting">
          <h2 className="eid-title" style={{ color: template.accentColor }}>
            Eid Mubarak
          </h2>
        </div>

        {/* Message area */}
        <div className="card-message-area">
          {recipientName && (
            <p className="card-recipient" style={{ color: template.textColor }}>
              Dear <strong>{recipientName}</strong>,
            </p>
          )}
          <p className="card-message" style={{ color: template.textColor }}>
            {message || "Wishing you a blessed Eid filled with joy, peace, and happiness!"}
          </p>
        </div>

        {/* Bottom divider */}
        <div className="card-divider">
          <span className="divider-ornament">✦</span>
        </div>

        {/* Sender */}
        {senderName && (
          <p className="card-sender" style={{ color: template.accentColor }}>
            — {senderName}
          </p>
        )}

        {/* Corner decorations */}
        <div className="corner-decoration top-left" style={{ borderColor: template.accentColor }}></div>
        <div className="corner-decoration top-right" style={{ borderColor: template.accentColor }}></div>
        <div className="corner-decoration bottom-left" style={{ borderColor: template.accentColor }}></div>
        <div className="corner-decoration bottom-right" style={{ borderColor: template.accentColor }}></div>
      </div>
    </div>
  );
}
