import React, { useState } from "react";
import { drivers as initialDrivers } from "../data/mockData";
import StatusBadge from "./StatusBadge";
import NewDriverModal from "./NewDriverModal";

const ROWS_OPTIONS = [10, 25, 50, 100];

function Ico({ d, size = 12, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill={color}><path d={d} /></svg>;
}

export default function DriversTable() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInactive, setShowInactive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = drivers.filter(d => {
    const ms = search === "" || d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase()) || d.phone.includes(search);
    const ma = showInactive ? true : d.status !== "Terminated";
    return ms && ma;
  });

  const total = filtered.length;
  const start = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, total);
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const pageData = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSaveDriver = (driver) => {
    setDrivers(p => [...p, driver]);
  };

  const inp = {
    border: "none", outline: "none", fontSize: 12,
    width: 160, color: "#374151", background: "transparent",
  };

  return (
    <div style={{ padding: "16px 20px" }}>
      {modalOpen && <NewDriverModal onClose={() => setModalOpen(false)} onSave={handleSaveDriver} />}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h1 style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: 0 }}>Drivers</h1>
          <div style={{ display: "flex", gap: 0, fontSize: 11 }}>
            {["Pdf", "Excel", "Email"].map((a, i, arr) => (
              <React.Fragment key={a}>
                <a href="#" style={{ color: "#3b82f6", textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.textDecoration = "underline"}
                  onMouseLeave={e => e.target.style.textDecoration = "none"}>{a}</a>
                {i < arr.length - 1 && <span style={{ color: "#d1d5db", margin: "0 4px" }}>|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #d1d5db", borderRadius: 4, padding: "4px 8px", background: "#fff" }}>
            <svg width={13} height={13} viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="#9ca3af" strokeWidth="1.5"/>
              <path d="M11 11l3.5 3.5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input type="text" placeholder="Search..." value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} style={inp} />
          </div>
          <button onClick={() => setModalOpen(true)} style={{
            background: "#3a8c5c", color: "#fff", border: "none", borderRadius: 4,
            padding: "5px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#2d7049"}
            onMouseLeave={e => e.currentTarget.style.background = "#3a8c5c"}>
            + New
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
            <thead>
              <tr>
                {["", "Name", "Type", "Status", "Hire Date", "Term Date", "Phone", "Email", "Truck", "Trailer", "Payable To", "Warnings", "Driver App", "Actions"].map((h, i) => (
                  <th key={i} style={{ background: "#f9fafb", color: "#6b7280", fontSize: 11, fontWeight: 500, padding: "7px 10px", textAlign: "left", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={14} style={{ padding: "40px 20px", textAlign: "center", color: "#9ca3af", fontSize: 12 }}>No drivers found.</td></tr>
              ) : pageData.map(driver => (
                <tr key={driver.id} style={{ borderBottom: "1px solid #f3f4f6" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "7px 10px", verticalAlign: "middle" }}>
                    {driver.warnings > 0 && <span style={{ color: "#f59e0b" }}>⚠</span>}
                  </td>
                  <td style={{ padding: "7px 10px", verticalAlign: "middle" }}>
                    <a href="#" style={{ color: "#3b82f6", textDecoration: "none", fontSize: 12 }}
                      onMouseEnter={e => e.target.style.textDecoration = "underline"}
                      onMouseLeave={e => e.target.style.textDecoration = "none"}>{driver.name}</a>
                  </td>
                  <td style={{ padding: "7px 10px", color: "#6b7280", fontSize: 12, verticalAlign: "middle" }}>{driver.type}</td>
                  <td style={{ padding: "7px 10px", verticalAlign: "middle" }}><StatusBadge status={driver.status} /></td>
                  <td style={{ padding: "7px 10px", fontSize: 12, color: "#374151", verticalAlign: "middle" }}>{driver.hireDate}</td>
                  <td style={{ padding: "7px 10px", fontSize: 12, color: "#d1d5db", verticalAlign: "middle" }}>{driver.termDate || "—"}</td>
                  <td style={{ padding: "7px 10px", fontSize: 12, color: "#374151", verticalAlign: "middle" }}>{driver.phone}</td>
                  <td style={{ padding: "7px 10px", verticalAlign: "middle" }}>
                    <a href={`mailto:${driver.email}`} style={{ color: "#3b82f6", textDecoration: "none", fontSize: 11 }}>{driver.email}</a>
                  </td>
                  <td style={{ padding: "7px 10px", verticalAlign: "middle" }}>
                    {driver.truck ? <a href="#" style={{ color: "#3b82f6", textDecoration: "none", fontSize: 12 }}>{driver.truck}</a> : <span style={{ color: "#d1d5db" }}>—</span>}
                  </td>
                  <td style={{ padding: "7px 10px", verticalAlign: "middle" }}>
                    {driver.trailer ? <a href="#" style={{ color: "#3b82f6", textDecoration: "none", fontSize: 12 }}>{driver.trailer}</a> : <span style={{ color: "#d1d5db" }}>—</span>}
                  </td>
                  <td style={{ padding: "7px 10px", fontSize: 12, color: "#374151", verticalAlign: "middle" }}>{driver.payableTo}</td>
                  <td style={{ padding: "7px 10px", textAlign: "center", verticalAlign: "middle" }}>
                    {driver.warnings > 0 ? (
                      <span style={{ background: "#fef3c7", color: "#92400e", padding: "1px 6px", borderRadius: 3, fontSize: 10, fontWeight: 500 }}>{driver.warnings}</span>
                    ) : <span style={{ color: "#d1d5db" }}>—</span>}
                  </td>
                  <td style={{ padding: "7px 10px", textAlign: "center", verticalAlign: "middle" }}>
                    <span style={{ color: driver.driverApp ? "#3a8c5c" : "#9ca3af", fontSize: 11 }}>{driver.driverApp ? "✓ Active" : "Inactive"}</span>
                  </td>
                  <td style={{ padding: "7px 10px", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[{ t: "Edit", c: "#374151" }, { t: "View", c: "#374151" }, { t: "✕", c: "#dc2626" }].map(btn => (
                        <button key={btn.t} title={btn.t} style={{
                          background: "none", border: "1px solid #d1d5db", borderRadius: 3,
                          padding: "2px 6px", cursor: "pointer", color: btn.c, fontSize: 10,
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
                          onMouseLeave={e => e.currentTarget.style.background = "none"}>
                          {btn.t === "Edit" ? "✎" : btn.t === "View" ? "👁" : btn.t}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ minHeight: 80, borderTop: "1px solid #f3f4f6" }} />
        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderTop: "1px solid #e5e7eb", background: "#f9fafb", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "#6b7280" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
              <input type="checkbox" checked={showInactive} onChange={e => setShowInactive(e.target.checked)} style={{ margin: 0 }} />
              Show inactive drivers
            </label>
            <span>{total === 0 ? "No entries" : `Showing ${start} to ${end} of ${total} ${total === 1 ? "entry" : "entries"}`}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#6b7280" }}>
            <div style={{ display: "flex", gap: 2 }}>
              {["‹", ...Array.from({ length: totalPages }, (_, i) => i + 1), "›"].map((p, i) => {
                const isNum = typeof p === "number";
                const isActive = isNum && p === currentPage;
                const disabled = (p === "‹" && currentPage === 1) || (p === "›" && currentPage === totalPages);
                return (
                  <button key={i} disabled={disabled} onClick={() => {
                    if (p === "‹") setCurrentPage(c => Math.max(1, c - 1));
                    else if (p === "›") setCurrentPage(c => Math.min(totalPages, c + 1));
                    else setCurrentPage(p);
                  }} style={{
                    padding: "3px 8px", border: "1px solid #d1d5db",
                    background: isActive ? "#3a8c5c" : "#fff",
                    color: isActive ? "#fff" : disabled ? "#d1d5db" : "#374151",
                    borderColor: isActive ? "#3a8c5c" : "#d1d5db",
                    borderRadius: 3, cursor: disabled ? "default" : "pointer", fontSize: 11,
                  }}>{p}</button>
                );
              })}
            </div>
            <span>Show</span>
            <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              style={{ border: "1px solid #d1d5db", borderRadius: 3, padding: "2px 4px", fontSize: 11, background: "#fff" }}>
              {ROWS_OPTIONS.map(n => <option key={n}>{n}</option>)}
            </select>
            <span>records</span>
          </div>
        </div>
      </div>
    </div>
  );
}
