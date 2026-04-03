import React, { useEffect, useRef, useState } from "react";
import { Menu, ChevronDown, Bell, Settings } from "lucide-react";
import AccountDropdown from "./AccountDropdown";

export default function TopNavbar({ onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      style={{
        height: 56,
        background: "linear-gradient(180deg, #171d2a 0%, #1b2231 100%)",
        borderBottom: "1px solid #2b3447",
        display: "flex",
        alignItems: "center",
        padding: "0 18px",
        gap: 12,
        position: "relative",
        zIndex: 120,
        flexShrink: 0,
        boxShadow: "0 1px 0 rgba(255,255,255,0.02)",
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          type="button"
          onClick={onToggleSidebar}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            border: "1px solid #32415b",
            background: "transparent",
            color: "#b4bece",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 120ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#252d3d";
            e.currentTarget.style.borderColor = "#3c4b66";
            e.currentTarget.style.color = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#32415b";
            e.currentTarget.style.color = "#b4bece";
          }}
        >
          <Menu size={17} />
        </button>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span
            style={{
              color: "#eef2f7",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.01em",
            }}
          >
            Operations Dashboard
          </span>
          <span
            style={{
              color: "#7e8aa3",
              fontSize: 11,
              marginTop: 2,
            }}
          >
            Fleet dispatch and admin workspace
          </span>
        </div>
      </div>

      {/* Right */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
          position: "relative",
        }}
      >
        <button
          type="button"
          style={iconButtonStyle}
          onMouseEnter={handleIconHoverIn}
          onMouseLeave={handleIconHoverOut}
        >
          <Bell size={16} />
        </button>

        <button
          type="button"
          style={iconButtonStyle}
          onMouseEnter={handleIconHoverIn}
          onMouseLeave={handleIconHoverOut}
        >
          <Settings size={16} />
        </button>

        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              minHeight: 38,
              padding: "4px 10px 4px 6px",
              borderRadius: 10,
              border: dropdownOpen ? "1px solid #3d4a63" : "1px solid transparent",
              background: dropdownOpen ? "#252d3d" : "transparent",
              color: "#d8dee9",
              cursor: "pointer",
              transition: "all 120ms ease",
            }}
            onMouseEnter={(e) => {
              if (!dropdownOpen) {
                e.currentTarget.style.background = "#252d3d";
                e.currentTarget.style.borderColor = "#334155";
              }
            }}
            onMouseLeave={(e) => {
              if (!dropdownOpen) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "transparent";
              }
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3aa86a 0%, #2f7d52 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              AK
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                lineHeight: 1.1,
              }}
            >
              <span
                style={{
                  color: "#e5e7eb",
                  fontSize: 12.5,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Asilbek Karimov
              </span>
              <span
                style={{
                  color: "#7e8aa3",
                  fontSize: 10.5,
                  marginTop: 2,
                }}
              >
                Administrator
              </span>
            </div>

            <ChevronDown
              size={14}
              style={{
                color: "#94a3b8",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 120ms ease",
              }}
            />
          </button>

          {dropdownOpen && <AccountDropdown onClose={() => setDropdownOpen(false)} />}
        </div>
      </div>
    </header>
  );
}

const iconButtonStyle = {
  width: 34,
  height: 34,
  borderRadius: 8,
  border: "1px solid #32415b",
  background: "transparent",
  color: "#b4bece",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 120ms ease",
};

function handleIconHoverIn(e) {
  e.currentTarget.style.background = "#252d3d";
  e.currentTarget.style.borderColor = "#3c4b66";
  e.currentTarget.style.color = "#e2e8f0";
}

function handleIconHoverOut(e) {
  e.currentTarget.style.background = "transparent";
  e.currentTarget.style.borderColor = "#32415b";
  e.currentTarget.style.color = "#b4bece";
}