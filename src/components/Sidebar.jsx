import React, { useState } from "react";

const NAV_CONFIG = [
  { id: "loadboards", label: "Loadboards", icon: "grid" },
  { id: "dispatch", label: "Dispatch board", icon: "list" },
  { id: "loads", label: "Loads", icon: "filetext" },
  { id: "drivers", label: "Drivers", icon: "user" },
  { id: "partners", label: "Partners", icon: "users", children: [
    { id: "partners-customers", label: "Customers" },
    { id: "partners-vendors", label: "Vendors" },
  ]},
  { id: "equipment", label: "Equipment", icon: "truck", children: [
    { id: "equipment-trucks", label: "Trucks" },
    { id: "equipment-trailers", label: "Trailers" },
  ]},
  { id: "fuel", label: "Fuel", icon: "droplet", children: [
    { id: "fuel-cards", label: "Fuel Cards" },
    { id: "fuel-transactions", label: "Fuel Transactions" },
    { id: "fuel-import", label: "Import Templates" },
  ]},
  { id: "payroll", label: "Driver Payroll", icon: "creditcard" },
  { id: "accounting", label: "Accounting", icon: "dollar", children: [
    { id: "accounting-payments", label: "Payments" },
    { id: "accounting-expenses", label: "Expenses" },
    { id: "accounting-factoring", label: "Factoring Reports" },
    { id: "accounting-chart", label: "Chart of Accounts" },
    { id: "accounting-billing", label: "Billing Entries" },
    { id: "accounting-vendor", label: "Vendor Balances" },
    { id: "accounting-additions", label: "Additions/Deductions" },
    { id: "accounting-scheduled", label: "Scheduled Payments" },
  ]},
  { id: "reports", label: "Reports", icon: "barchart", children: [
    { id: "reports-emails", label: "Emails" },
    { id: "reports-revenue", label: "Total Revenue" },
    { id: "reports-rpm", label: "Rate per Mile" },
    { id: "reports-dispatcher", label: "Revenue by Dispatcher" },
    { id: "reports-payment", label: "Payment Summary" },
    { id: "reports-expenses", label: "Expenses" },
    { id: "reports-gross", label: "Gross Profit" },
    { id: "reports-grossload", label: "Gross Profit per Load" },
    { id: "reports-pl", label: "Profit & Loss" },
  ]},
  { id: "tolls", label: "Tolls", icon: "clock", children: [
    { id: "tolls-devices", label: "Toll Devices" },
    { id: "tolls-transactions", label: "Toll Transactions" },
    { id: "tolls-import", label: "Import Templates" },
  ]},
  { id: "safety", label: "Safety", icon: "shield", children: [
    { id: "safety-claims", label: "Claims" },
  ]},
  { id: "ifta", label: "IFTA", icon: "activity", children: [
    { id: "ifta-ifta", label: "IFTA" },
    { id: "ifta-states", label: "KY, NY, OR, NM, CT" },
    { id: "ifta-miles", label: "Miles & Fuel by State" },
  ]},
  { id: "users", label: "Users", icon: "user" },
  { id: "datalibrary", label: "Data Library", icon: "database", children: [
    { id: "datalibrary-brokers", label: "Brokers" },
    { id: "datalibrary-shippers", label: "Shippers/Receivers" },
    { id: "datalibrary-factoring", label: "Factoring Companies" },
    { id: "datalibrary-trailer", label: "Trailer Types" },
  ]},
  { id: "docs", label: "Docs Exchange", icon: "file" },
];

function SvgIcon({ name, size = 14 }) {
  const p = { width: size, height: size, viewBox: "0 0 16 16", fill: "currentColor", style: { flexShrink: 0, display: "block" } };
  switch (name) {
    case "grid": return <svg {...p}><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>;
    case "list": return <svg {...p}><rect x="1" y="2" width="14" height="2" rx="1"/><rect x="1" y="7" width="14" height="2" rx="1"/><rect x="1" y="12" width="14" height="2" rx="1"/></svg>;
    case "filetext": return <svg {...p}><path d="M3 1h7l3 3v11H3V1z" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M10 1v4h4" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1" fill="none"/></svg>;
    case "user": return <svg {...p}><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>;
    case "users": return <svg {...p}><circle cx="5" cy="5" r="2.2"/><circle cx="11" cy="5" r="2.2"/><path d="M1 13c0-2.8 1.8-5 4-5s4 2.2 4 5" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M9 13c0-2.8 1.8-5 4-5" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>;
    case "truck": return <svg {...p}><rect x="1" y="5" width="10" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.3"/><path d="M11 7l3 2v3h-3V7z" fill="none" stroke="currentColor" strokeWidth="1.3"/><circle cx="4" cy="13" r="1.4"/><circle cx="12" cy="13" r="1.4"/></svg>;
    case "droplet": return <svg {...p}><path d="M8 2C8 2 3 7.5 3 10.5a5 5 0 0010 0C13 7.5 8 2 8 2z"/></svg>;
    case "creditcard": return <svg {...p}><rect x="1" y="3" width="14" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M1 7h14M4 10.5h3" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>;
    case "dollar": return <svg {...p}><path d="M8 1v14M5 4.5h4.5a2.5 2.5 0 010 5H6a2.5 2.5 0 000 5H11" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>;
    case "barchart": return <svg {...p}><rect x="1" y="8" width="3" height="6"/><rect x="6" y="5" width="3" height="9"/><rect x="11" y="2" width="3" height="12"/></svg>;
    case "clock": return <svg {...p}><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>;
    case "shield": return <svg {...p}><path d="M8 1l6 3v5c0 3-2.5 5.5-6 7-3.5-1.5-6-4-6-7V4z"/></svg>;
    case "activity": return <svg {...p}><path d="M1 8h3l2-5 3 10 2-5 2 2h2" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>;
    case "database": return <svg {...p}><ellipse cx="8" cy="4" rx="6" ry="2" fill="none" stroke="currentColor" strokeWidth="1.3"/><path d="M2 4v4c0 1.1 2.7 2 6 2s6-.9 6-2V4" fill="none" stroke="currentColor" strokeWidth="1.3"/><path d="M2 8v4c0 1.1 2.7 2 6 2s6-.9 6-2V8" fill="none" stroke="currentColor" strokeWidth="1.3"/></svg>;
    case "file": return <svg {...p}><path d="M3 1h7l3 3v11H3V1z" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M10 1v4h4" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>;
    case "chev-down": return <svg {...p}><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>;
    case "chev-right": return <svg {...p}><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>;
    default: return <svg {...p}><circle cx="8" cy="8" r="5"/></svg>;
  }
}

export default function Sidebar({ activePage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const isParentActive = (item) =>
    activePage === item.id || (item.children || []).some(c => c.id === activePage);

  return (
    <div style={{
      width: collapsed ? 44 : 210,
      minWidth: collapsed ? 44 : 210,
      background: "#1a1f2e",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflowY: "auto",
      overflowX: "hidden",
      transition: "width 0.15s",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div onClick={() => onNavigate("dispatch")} style={{
        display: "flex", alignItems: "center", gap: 9,
        padding: "11px 13px", borderBottom: "1px solid #2a3040",
        cursor: "pointer", minHeight: 46, flexShrink: 0,
      }}>
        <div style={{
          width: 26, height: 26, background: "#3a8c5c", borderRadius: 4,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 10, fontWeight: 700, flexShrink: 0,
        }}>TMS</div>
        {!collapsed && <div>
          <div style={{ color: "#e8eaf0", fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>FleetPro</div>
          <div style={{ color: "#6b7280", fontSize: 10 }}>Dispatch TMS</div>
        </div>}
      </div>

      {/* Hamburger */}
      <div style={{ padding: "7px 13px", borderBottom: "1px solid #2a3040", flexShrink: 0 }}>
        <button onClick={() => setCollapsed(p => !p)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 3,
          display: "flex", flexDirection: "column", gap: 3,
        }}>
          <span style={{ display: "block", width: 16, height: 2, background: "#9ca3af" }} />
          <span style={{ display: "block", width: 16, height: 2, background: "#9ca3af" }} />
          <span style={{ display: "block", width: 16, height: 2, background: "#9ca3af" }} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, paddingBottom: 8 }}>
        {NAV_CONFIG.map(item => {
          const hasChildren = !!(item.children && item.children.length);
          const parentActive = isParentActive(item);
          const isOpen = !!expanded[item.id];
          const directActive = activePage === item.id && !hasChildren;

          return (
            <div key={item.id}>
              <div
                onClick={() => { hasChildren ? toggleExpand(item.id) : onNavigate(item.id); }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "6px 13px",
                  cursor: "pointer",
                  background: directActive ? "#3a8c5c" : "transparent",
                  color: directActive ? "#fff" : parentActive ? "#d1fae5" : "#b0b7c3",
                  fontSize: 12,
                  fontWeight: directActive || parentActive ? 500 : 400,
                  userSelect: "none",
                  minHeight: 30,
                  whiteSpace: "nowrap",
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => { if (!directActive) e.currentTarget.style.background = "#252b3a"; }}
                onMouseLeave={e => { if (!directActive) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ opacity: directActive ? 1 : 0.7, flexShrink: 0 }}>
                  <SvgIcon name={item.icon} />
                </span>
                {!collapsed && <>
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>
                  {hasChildren && (
                    <span style={{ opacity: 0.5, flexShrink: 0 }}>
                      <SvgIcon name={isOpen ? "chev-down" : "chev-right"} size={10} />
                    </span>
                  )}
                </>}
              </div>

              {/* Submenu */}
              {hasChildren && isOpen && !collapsed && (
                <div style={{ background: "#13182280" }}>
                  {item.children.map(child => {
                    const cActive = activePage === child.id;
                    return (
                      <div
                        key={child.id}
                        onClick={() => onNavigate(child.id)}
                        style={{
                          padding: "5px 13px 5px 36px",
                          cursor: "pointer",
                          color: cActive ? "#fff" : "#8a92a0",
                          fontSize: 11.5,
                          fontWeight: cActive ? 500 : 400,
                          background: cActive ? "rgba(58,140,92,0.25)" : "transparent",
                          borderLeft: cActive ? "2px solid #3a8c5c" : "2px solid transparent",
                          userSelect: "none",
                          minHeight: 27,
                          display: "flex",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={e => { if (!cActive) e.currentTarget.style.background = "#1e2436"; }}
                        onMouseLeave={e => { if (!cActive) e.currentTarget.style.background = "transparent"; }}
                      >
                        {child.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
