import React from "react";

export default function FilterBar({ filters = [], onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      {filters.map((f, i) => (
        <select
          key={i}
          defaultValue={f.value}
          onChange={(e) => onChange && onChange(f.key, e.target.value)}
          style={{
            border: "1px solid #d1d5db",
            borderRadius: 4,
            padding: "4px 8px",
            fontSize: 11,
            background: "#fff",
            color: "#374151",
            cursor: "pointer",
          }}
        >
          {f.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
