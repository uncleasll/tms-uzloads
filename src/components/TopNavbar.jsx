import React, { useState } from "react";
import AccountDropdown from "./AccountDropdown";

export default function TopNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      style={{
        background: "#1a1f2e",
        height: 44,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid #2a3040",
        flexShrink: 0,
        gap: 12,
        position: "relative",
        zIndex: 100,
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: 4,
          }}
        >
          <span style={{ display: "block", width: 16, height: 2, background: "#9ca3af" }} />
          <span style={{ display: "block", width: 16, height: 2, background: "#9ca3af" }} />
          <span style={{ display: "block", width: 16, height: 2, background: "#9ca3af" }} />
        </button>
      </div>

      {/* Right side */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
          position: "relative",
        }}
      >
        <button
          onClick={() => setDropdownOpen((p) => !p)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: dropdownOpen ? "#252b3a" : "none",
            border: "none",
            cursor: "pointer",
            color: "#d1d5db",
            fontSize: 12,
            padding: "4px 8px",
            borderRadius: 4,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#252b3a")}
          onMouseLeave={(e) => {
            if (!dropdownOpen) e.currentTarget.style.background = "none";
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#3a8c5c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            AK
          </div>
          <span>Asilbek Karimov</span>
          <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span>
        </button>

        {dropdownOpen && (
          <AccountDropdown onClose={() => setDropdownOpen(false)} />
        )}
      </div>
    </div>
  );
}
