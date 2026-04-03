import React from "react";

export default function PlaceholderPage({ title }) {
  return (
    <div style={{ padding: "16px 20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <h1 style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: 0 }}>{title}</h1>
        <button
          style={{
            background: "#3a8c5c",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "5px 14px",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          + New
        </button>
      </div>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 4,
          padding: "60px 20px",
          textAlign: "center",
          color: "#9ca3af",
          fontSize: 13,
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.3 }}>📋</div>
        <div style={{ fontWeight: 500, color: "#6b7280", marginBottom: 4 }}>
          No {title.toLowerCase()} found
        </div>
        <div style={{ fontSize: 12 }}>
          Get started by creating a new entry.
        </div>
      </div>
    </div>
  );
}
