"use client";

import { getTemplateById } from "@/lib/templates";

export default function TemplateCard({ template, onClick, selected }) {
  return (
    <button
      className={`template-card ${selected ? "template-selected" : ""}`}
      onClick={() => onClick(template.id)}
      style={{
        background: template.gradient,
        border: selected
          ? `3px solid ${template.accentColor}`
          : template.borderStyle,
      }}
    >
      <div className="template-card-inner">
        <div className="template-preview-icon" style={{ color: template.accentColor }}>
          {template.decorationType === "mosque" && "🕌"}
          {template.decorationType === "crescent" && "🌙"}
          {template.decorationType === "lantern" && "🏮"}
          {template.decorationType === "geometric" && "✦"}
          {template.decorationType === "floral" && "🌸"}
          {template.decorationType === "stars" && "⭐"}
        </div>
        <h3 className="template-name" style={{ color: template.textColor }}>
          {template.name}
        </h3>
        <p className="template-description" style={{ color: template.textColor, opacity: 0.7 }}>
          {template.description}
        </p>
        {selected && (
          <div className="template-check" style={{ color: template.accentColor }}>
            ✓ Selected
          </div>
        )}
      </div>
    </button>
  );
}
