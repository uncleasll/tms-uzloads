import React, { useEffect, useRef } from "react";
import Icons from "./Icons";

const menuItems = [
  { label: "Account", icon: "account" },
  { label: "Billing", icon: "billing" },
  { label: "My Company", icon: "company" },
  { label: "My Profile", icon: "profile" },
  { label: "Settings", icon: "settings" },
  { label: "Logout", icon: "logout", danger: true },
];

export default function AccountDropdown({ onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 44,
        right: 0,
        width: 224,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        zIndex: 200,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#1a1f2e",
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#3a8c5c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          AK
        </div>
        <div>
          <div style={{ color: "#e8eaf0", fontSize: 13, fontWeight: 500 }}>
            Asilbek Karimov
          </div>
          <div style={{ color: "#6b7280", fontSize: 11 }}>a.karimov@fleetpro.com</div>
        </div>
      </div>

      {/* Menu items */}
      {menuItems.map((item, i) => {
        const Icon = Icons[item.icon];
        return (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 14px",
              cursor: "pointer",
              color: item.danger ? "#dc2626" : "#374151",
              fontSize: 12,
              borderBottom: i < menuItems.length - 1 ? "1px solid #f3f4f6" : "none",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {Icon && <Icon />}
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
