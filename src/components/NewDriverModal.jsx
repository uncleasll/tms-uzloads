import React, { useState } from "react";

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
const STATUSES = ["Applicant","Hired","On Leave","Terminated"];
const TRUCKS = ["TRK-001","TRK-002","TRK-003","TRK-007"];
const TRAILERS = ["TRL-012","TRL-023","TRL-044","TRL-055"];
const CODRIVERS = ["None","Xumotyun Baxriddinov","Bobur Toshmatov","Sardor Yusupov"];

const DOCS = [
  { name: "Application", status: "Missing", warn: true },
  { name: "CDL", status: "Missing", warn: true },
  { name: "Medical card", status: "Missing", warn: true },
  { name: "Drug Test", status: "Missing", warn: true },
  { name: "MVR", status: "Missing", warn: true },
  { name: "SSN card", status: "Missing", warn: true },
  { name: "Employment verification", status: "Missing", warn: true },
  { name: "Other", status: "OK", warn: false },
];

const PAY_TABS = ["Pay rates", "Scheduled payments/deductions", "Additional payee", "Notes"];

function Field({ label, children, half, third, full }) {
  let width = "100%";
  if (half) width = "calc(50% - 4px)";
  if (third) width = "calc(33.33% - 5px)";
  return (
    <div style={{ width, marginBottom: 10 }}>
      {label && <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3, fontWeight: 500 }}>{label}</label>}
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", border: "1px solid #d1d5db", borderRadius: 3,
  padding: "5px 8px", fontSize: 12, color: "#374151",
  outline: "none", background: "#fff", height: 30,
};

const selectStyle = { ...inputStyle, cursor: "pointer" };

export default function NewDriverModal({ onClose, onSave }) {
  const [activeTab, setActiveTab] = useState("Pay rates");
  const [payType, setPayType] = useState("company");
  const [rateType, setRateType] = useState("permile");
  const [form, setForm] = useState({
    firstName: "", lastName: "", status: "Applicant",
    appDate: new Date().toISOString().slice(0,10),
    hireDate: "", dob: "", phone: "", email: "",
    address: "", address2: "", city: "", state: "", zip: "",
    payableTo: "", coDriver: "None", truck: "", trailer: "",
    fuelCard: "", createVendor: false, iftaCompany: false,
    perMile: "", perExtraStop: "", perEmptyMile: "",
    notes: "",
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    const driver = {
      id: Date.now(),
      name: `${form.firstName} ${form.lastName}`.trim() || "New Driver",
      type: payType === "company" ? "Drv" : "OO",
      status: form.status,
      hireDate: form.hireDate || "—",
      termDate: "",
      phone: form.phone,
      email: form.email,
      truck: form.truck,
      trailer: form.trailer,
      payableTo: form.payableTo || `${form.firstName} ${form.lastName}`.trim(),
      warnings: 0,
      driverApp: false,
    };
    onSave(driver);
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      zIndex: 1000, display: "flex", alignItems: "flex-start",
      justifyContent: "center", paddingTop: 30, paddingBottom: 30,
      overflowY: "auto",
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: "#fff", width: "90%", maxWidth: 900,
        border: "1px solid #d1d5db", borderRadius: 4,
        display: "flex", flexDirection: "column",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        maxHeight: "calc(100vh - 60px)",
      }}>
        {/* Modal header */}
        <div style={{
          background: "#f3f4f6", padding: "10px 16px",
          borderBottom: "1px solid #e5e7eb", display: "flex",
          alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>New Driver</span>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 16, color: "#6b7280", lineHeight: 1, padding: "0 4px",
          }}>✕</button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {/* Help banner */}
          <div style={{
            background: "#ede9fe", padding: "8px 16px",
            display: "flex", alignItems: "center", gap: 8,
            borderBottom: "1px solid #ddd6fe", fontSize: 12,
          }}>
            <span style={{ fontSize: 14, color: "#7c3aed" }}>?</span>
            <span style={{ color: "#4c1d95" }}>
              Need Help? Watch our video tutorial on{" "}
              <a href="#" style={{ color: "#7c3aed", textDecoration: "underline" }}>How to manage drivers.</a>
            </span>
          </div>

          <div style={{ padding: "16px 20px" }}>
            {/* Top form area: avatar left, fields right */}
            <div style={{ display: "flex", gap: 20, marginBottom: 6 }}>
              {/* Avatar */}
              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 4 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "#e5e7eb", border: "2px solid #d1d5db",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#9ca3af", fontSize: 24,
                }}>👤</div>
                <button style={{
                  background: "#3a8c5c", color: "#fff", border: "none",
                  borderRadius: 3, padding: "3px 8px", fontSize: 10,
                  cursor: "pointer", whiteSpace: "nowrap",
                }}>Update photo</button>
              </div>

              {/* Main fields */}
              <div style={{ flex: 1 }}>
                {/* Row 1: First, Last, Status */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Field label="First Name" half>
                    <input style={inputStyle} value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="First name" />
                  </Field>
                  <Field label="Last Name" half>
                    <input style={inputStyle} value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Last name" />
                  </Field>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Field label="Status" third>
                    <select style={selectStyle} value={form.status} onChange={e => set("status", e.target.value)}>
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Application Date" third>
                    <input type="date" style={inputStyle} value={form.appDate} onChange={e => set("appDate", e.target.value)} />
                  </Field>
                  <Field label="Hire Date" third>
                    <input type="date" style={inputStyle} value={form.hireDate} onChange={e => set("hireDate", e.target.value)} />
                  </Field>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Field label="Date of Birth" third>
                    <input type="date" style={inputStyle} value={form.dob} onChange={e => set("dob", e.target.value)} />
                  </Field>
                  <Field label="Phone" third>
                    <input style={inputStyle} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+1 (___) ___-____" />
                  </Field>
                  <Field label="Email" third>
                    <input style={inputStyle} value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@example.com" />
                  </Field>
                </div>
              </div>
            </div>

            {/* Address block */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Field label="Address" half>
                <input style={inputStyle} value={form.address} onChange={e => set("address", e.target.value)} placeholder="Street address" />
              </Field>
              <Field label="Address line 2" half>
                <input style={inputStyle} value={form.address2} onChange={e => set("address2", e.target.value)} placeholder="Apt, suite, etc." />
              </Field>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Field label="City" half>
                <input style={inputStyle} value={form.city} onChange={e => set("city", e.target.value)} placeholder="City" />
              </Field>
              <Field label="State" third>
                <select style={selectStyle} value={form.state} onChange={e => set("state", e.target.value)}>
                  <option value="">— Select —</option>
                  {US_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Zip" style={{ width: "calc(16.66% - 5px)" }}>
                <input style={inputStyle} value={form.zip} onChange={e => set("zip", e.target.value)} placeholder="Zip" />
              </Field>
            </div>

            {/* Right-side fields */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Field label="Payable To" half>
                <input style={inputStyle} value={form.payableTo} onChange={e => set("payableTo", e.target.value)} placeholder="Name or company" />
              </Field>
              <div style={{ width: "calc(50% - 4px)", display: "flex", alignItems: "flex-end", paddingBottom: 10 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.createVendor} onChange={e => set("createVendor", e.target.checked)} />
                  Create new vendor
                </label>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Field label="Co-Driver" third>
                <select style={selectStyle} value={form.coDriver} onChange={e => set("coDriver", e.target.value)}>
                  {CODRIVERS.map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Truck" third>
                <select style={selectStyle} value={form.truck} onChange={e => set("truck", e.target.value)}>
                  <option value="">— Select —</option>
                  {TRUCKS.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Trailer" third>
                <select style={selectStyle} value={form.trailer} onChange={e => set("trailer", e.target.value)}>
                  <option value="">— Select —</option>
                  {TRAILERS.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Field label="Fuel Card #" half>
                <input style={inputStyle} value={form.fuelCard} onChange={e => set("fuelCard", e.target.value)} placeholder="Card number" />
              </Field>
              <div style={{ width: "calc(50% - 4px)", display: "flex", alignItems: "flex-end", paddingBottom: 10 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.iftaCompany} onChange={e => set("iftaCompany", e.target.checked)} />
                  IFTA handled by Company
                </label>
              </div>
            </div>

            {/* Documents section */}
            <div style={{ marginTop: 16, border: "1px solid #e5e7eb", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ background: "#f9fafb", padding: "8px 14px", borderBottom: "1px solid #e5e7eb" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Documents</span>
              </div>
              {/* Note */}
              <div style={{ background: "#fff7ed", padding: "7px 14px", borderBottom: "1px solid #fed7aa", fontSize: 11, color: "#92400e" }}>
                ⚠ Documents will be available for adding and editing after saving a driver.
              </div>
              {DOCS.map((doc, i) => (
                <div key={doc.name} style={{
                  display: "flex", alignItems: "center", padding: "7px 14px",
                  borderBottom: i < DOCS.length - 1 ? "1px solid #f3f4f6" : "none",
                  gap: 10,
                }}>
                  <span style={{ fontSize: 13, flexShrink: 0 }}>{doc.warn ? "⚠" : "✓"}</span>
                  <span style={{ flex: 1, fontSize: 12, color: "#374151" }}>{doc.name}</span>
                  <span style={{ fontSize: 11, color: doc.warn ? "#d97706" : "#3a8c5c" }}>{doc.status}</span>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>›</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
                {PAY_TABS.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    padding: "7px 14px", fontSize: 12, cursor: "pointer",
                    color: activeTab === tab ? "#111827" : "#6b7280",
                    borderBottom: activeTab === tab ? "2px solid #3a8c5c" : "2px solid transparent",
                    background: "none", border: "none",
                    borderBottomStyle: "solid",
                    fontWeight: activeTab === tab ? 500 : 400,
                    whiteSpace: "nowrap",
                  }}>
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "Pay rates" && (
                <div style={{ padding: "14px 0", display: "flex", gap: 32 }}>
                  {/* Driver type */}
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "#6b7280", marginBottom: 8 }}>Driver Type</div>
                    {[["company", "Company driver"], ["owner", "Owner operator"]].map(([val, lbl]) => (
                      <label key={val} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151", cursor: "pointer", marginBottom: 6 }}>
                        <input type="radio" name="payType" value={val} checked={payType === val} onChange={() => setPayType(val)} />
                        {lbl}
                      </label>
                    ))}
                  </div>
                  {/* Rate type */}
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "#6b7280", marginBottom: 8 }}>Rate Type</div>
                    {[["permile","Per mile"],["freight","Freight percentage"],["flatpay","Flatpay"],["hourly","Hourly"]].map(([val, lbl]) => (
                      <label key={val} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151", cursor: "pointer", marginBottom: 6 }}>
                        <input type="radio" name="rateType" value={val} checked={rateType === val} onChange={() => setRateType(val)} />
                        {lbl}
                      </label>
                    ))}
                  </div>
                  {/* Rate fields */}
                  <div style={{ flex: 1, maxWidth: 260 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "#6b7280", marginBottom: 8 }}>Rate Fields</div>
                    {[["perMile","Per mile"],["perExtraStop","Per extra stop"],["perEmptyMile","Per empty mile"]].map(([key, lbl]) => (
                      <div key={key} style={{ marginBottom: 8 }}>
                        <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3 }}>{lbl}</label>
                        <div style={{ display: "flex", alignItems: "center", border: "1px solid #d1d5db", borderRadius: 3, overflow: "hidden", height: 30 }}>
                          <span style={{ padding: "0 8px", background: "#f9fafb", borderRight: "1px solid #d1d5db", fontSize: 12, color: "#6b7280" }}>$</span>
                          <input style={{ flex: 1, border: "none", outline: "none", padding: "0 8px", fontSize: 12 }}
                            value={form[key]} onChange={e => set(key, e.target.value)} placeholder="0.00" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab !== "Pay rates" && (
                <div style={{ padding: "30px 20px", textAlign: "center", color: "#9ca3af", fontSize: 12 }}>
                  No data yet for {activeTab}.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "10px 20px", borderTop: "1px solid #e5e7eb",
          display: "flex", justifyContent: "flex-end", gap: 8,
          background: "#f9fafb", flexShrink: 0,
        }}>
          <button onClick={onClose} style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "6px 14px", background: "#374151", color: "#fff",
            border: "none", borderRadius: 4, cursor: "pointer", fontSize: 12,
          }}>✕ Close</button>
          <button onClick={handleSave} style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "6px 14px", background: "#3a8c5c", color: "#fff",
            border: "none", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 500,
          }}>✓ Save</button>
        </div>
      </div>
    </div>
  );
}
