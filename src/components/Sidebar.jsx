import React, { useMemo, useState } from "react";
import {
  LayoutGrid,
  ClipboardList,
  ArrowLeftRight,
  Users,
  Truck,
  Fuel,
  CreditCard,
  CircleDollarSign,
  BarChart3,
  Shield,
  Activity,
  Database,
  FileText,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Menu,
  FileSpreadsheet,
  Receipt,
  Building2,
} from "lucide-react";

const NAV_CONFIG = [
  { id: "loadboards", label: "Loadboards", icon: LayoutGrid },
  { id: "dispatch", label: "Dispatch board", icon: ClipboardList },
  { id: "loads", label: "Loads", icon: ArrowLeftRight },
  { id: "drivers", label: "Drivers", icon: Users },
  {
    id: "partners",
    label: "Partners",
    icon: Building2,
    children: [
      { id: "partners-customers", label: "Customers" },
      { id: "partners-vendors", label: "Vendors" },
    ],
  },
  {
    id: "equipment",
    label: "Equipment",
    icon: Truck,
    children: [
      { id: "equipment-trucks", label: "Trucks" },
      { id: "equipment-trailers", label: "Trailers" },
    ],
  },
  {
    id: "fuel",
    label: "Fuel",
    icon: Fuel,
    children: [
      { id: "fuel-cards", label: "Fuel Cards" },
      { id: "fuel-transactions", label: "Fuel Transactions" },
      { id: "fuel-import", label: "Import Templates" },
    ],
  },
  { id: "payroll", label: "Driver Payroll", icon: CreditCard },
  {
    id: "accounting",
    label: "Accounting",
    icon: CircleDollarSign,
    children: [
      { id: "accounting-payments", label: "Payments" },
      { id: "accounting-expenses", label: "Expenses" },
      { id: "accounting-factoring", label: "Factoring Reports" },
      { id: "accounting-chart", label: "Chart of Accounts" },
      { id: "accounting-billing", label: "Billing Entries" },
      { id: "accounting-vendor", label: "Vendor Balances" },
      { id: "accounting-additions", label: "Additions/Deductions" },
      { id: "accounting-scheduled", label: "Scheduled Payments" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    children: [
      { id: "reports-emails", label: "Emails" },
      { id: "reports-revenue", label: "Total Revenue" },
      { id: "reports-rpm", label: "Rate per Mile" },
      { id: "reports-dispatcher", label: "Revenue by Dispatcher" },
      { id: "reports-payment", label: "Payment Summary" },
      { id: "reports-expenses", label: "Expenses" },
      { id: "reports-gross", label: "Gross Profit" },
      { id: "reports-grossload", label: "Gross Profit per Load" },
      { id: "reports-pl", label: "Profit & Loss" },
    ],
  },
  {
    id: "tolls",
    label: "Tolls",
    icon: Receipt,
    children: [
      { id: "tolls-devices", label: "Toll Devices" },
      { id: "tolls-transactions", label: "Toll Transactions" },
      { id: "tolls-import", label: "Import Templates" },
    ],
  },
  {
    id: "safety",
    label: "Safety",
    icon: Shield,
    children: [{ id: "safety-claims", label: "Claims" }],
  },
  {
    id: "ifta",
    label: "IFTA",
    icon: FileSpreadsheet,
    children: [
      { id: "ifta-ifta", label: "IFTA" },
      { id: "ifta-states", label: "KY, NY, OR, NM, CT" },
      { id: "ifta-miles", label: "Miles & Fuel by State" },
    ],
  },
  { id: "users", label: "Users", icon: Users },
  {
    id: "datalibrary",
    label: "Data Library",
    icon: Database,
    children: [
      { id: "datalibrary-brokers", label: "Brokers" },
      { id: "datalibrary-shippers", label: "Shippers/Receivers" },
      { id: "datalibrary-factoring", label: "Factoring Companies" },
      { id: "datalibrary-trailer", label: "Trailer Types" },
    ],
  },
  { id: "docs", label: "Docs Exchange", icon: FolderOpen },
];

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export default function Sidebar({ activePage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState({
    partners: true,
    equipment: true,
    accounting: false,
    reports: false,
    tolls: false,
    safety: false,
    ifta: false,
    fuel: false,
    datalibrary: false,
  });

  const isParentActive = (item) =>
    activePage === item.id || (item.children || []).some((child) => child.id === activePage);

  const normalizedExpanded = useMemo(() => {
    const next = { ...expanded };
    NAV_CONFIG.forEach((item) => {
      if (item.children?.length && isParentActive(item)) {
        next[item.id] = true;
      }
    });
    return next;
  }, [expanded, activePage]);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
      style={{
        width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        minWidth: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        height: "100vh",
        background: "linear-gradient(180deg, #171d2a 0%, #1d2433 100%)",
        borderRight: "1px solid #2b3447",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "width 180ms ease",
        flexShrink: 0,
      }}
    >
      <div
        onClick={() => onNavigate("dispatch")}
        style={{
          height: 68,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: collapsed ? "0 14px" : "0 18px",
          borderBottom: "1px solid #2b3447",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: "linear-gradient(135deg, #33a86a 0%, #267f4f 100%)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.4px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
            flexShrink: 0,
          }}
        >
          EZ
        </div>

        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                color: "#edf2f7",
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              uzloads
            </div>
            <div
              style={{
                marginTop: 3,
                color: "#7e8aa3",
                fontSize: 11,
                lineHeight: 1,
              }}
            >
              Dispatch TMS
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "0 10px" : "0 16px",
          borderBottom: "1px solid #2b3447",
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <span
            style={{
              color: "#7e8aa3",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Navigation
          </span>
        )}

        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          style={iconButtonStyle}
        >
          <Menu size={16} />
        </button>
      </div>

      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "8px 0 12px",
        }}
      >
        {NAV_CONFIG.map((item) => {
          const hasChildren = !!item.children?.length;
          const parentActive = isParentActive(item);
          const directActive = activePage === item.id && !hasChildren;
          const open = !!normalizedExpanded[item.id];
          const Icon = item.icon;

          return (
            <div key={item.id} style={{ marginBottom: 2 }}>
              <button
                type="button"
                onClick={() => {
                  if (hasChildren) {
                    if (collapsed) {
                      setCollapsed(false);
                    }
                    toggleExpand(item.id);
                  } else {
                    onNavigate(item.id);
                  }
                }}
                style={{
                  ...navItemStyle,
                  ...(directActive ? navItemActiveStyle : {}),
                  color: directActive ? "#ffffff" : parentActive ? "#d7e7dc" : "#b4bece",
                  justifyContent: collapsed ? "center" : "flex-start",
                  padding: collapsed ? "0 0" : "0 16px",
                }}
              >
                <span
                  style={{
                    ...iconWrapStyle,
                    color: directActive ? "#ffffff" : parentActive ? "#7be0a3" : "#96a3b8",
                  }}
                >
                  <Icon size={17} strokeWidth={1.8} />
                </span>

                {!collapsed && (
                  <>
                    <span
                      style={{
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "left",
                      }}
                    >
                      {item.label}
                    </span>

                    {hasChildren ? (
                      open ? (
                        <ChevronDown size={15} strokeWidth={2} style={{ opacity: 0.75 }} />
                      ) : (
                        <ChevronRight size={15} strokeWidth={2} style={{ opacity: 0.75 }} />
                      )
                    ) : null}
                  </>
                )}

                {directActive && !collapsed && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 10,
                      bottom: 10,
                      width: 3,
                      borderRadius: "0 3px 3px 0",
                      background: "#59c27d",
                    }}
                  />
                )}
              </button>

              {hasChildren && open && !collapsed && (
                <div
                  style={{
                    marginTop: 2,
                    paddingBottom: 4,
                    background: "rgba(10,14,22,0.16)",
                  }}
                >
                  {item.children.map((child) => {
                    const childActive = activePage === child.id;

                    return (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => onNavigate(child.id)}
                        style={{
                          ...subItemStyle,
                          ...(childActive ? subItemActiveStyle : {}),
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: childActive ? "#59c27d" : "#425067",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {child.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {!collapsed && (
        <div
          style={{
            borderTop: "1px solid #2b3447",
            padding: "14px 16px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              border: "1px solid #32415b",
              background: "rgba(255,255,255,0.02)",
              borderRadius: 10,
              padding: "12px 12px",
            }}
          >
            <div
              style={{
                color: "#e8edf6",
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Dispatch Workspace
            </div>
            <div
              style={{
                color: "#8a97ab",
                fontSize: 11,
                lineHeight: 1.45,
              }}
            >
              Fast access to loads, drivers, billing, and operations tools.
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

const iconButtonStyle = {
  width: 32,
  height: 32,
  borderRadius: 8,
  border: "1px solid #32415b",
  background: "transparent",
  color: "#b4bece",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const navItemStyle = {
  position: "relative",
  width: "100%",
  minHeight: 42,
  border: "none",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "0 16px",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  transition: "background 120ms ease, color 120ms ease",
};

const navItemActiveStyle = {
  background: "linear-gradient(90deg, rgba(61,145,95,0.24) 0%, rgba(61,145,95,0.12) 100%)",
};

const iconWrapStyle = {
  width: 20,
  height: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const subItemStyle = {
  width: "100%",
  minHeight: 34,
  border: "none",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "0 16px 0 36px",
  color: "#8f9bb0",
  fontSize: 12.5,
  fontWeight: 500,
  cursor: "pointer",
  textAlign: "left",
  transition: "background 120ms ease, color 120ms ease",
};

const subItemActiveStyle = {
  color: "#ffffff",
  background: "rgba(61,145,95,0.22)",
  borderLeft: "2px solid #59c27d",
};