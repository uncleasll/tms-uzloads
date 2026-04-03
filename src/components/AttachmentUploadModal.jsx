import React, { useState } from "react";

const DOC_TYPES = ["Confirmation", "BOL", "Other", "Lumper"];

export default function AttachmentUploadModal({ onClose, onSave }) {
  const [docType, setDocType] = useState("Confirmation");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (file) setFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleSave = () => {
    onSave({ type: docType, notes, fileName: fileName || "attachment" });
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: "#fff", width: 480, border: "1px solid #d1d5db",
        borderRadius: 4, boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      }}>
        {/* Header */}
        <div style={{ background: "#f3f4f6", padding: "10px 16px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Upload Attachment</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#6b7280" }}>✕</button>
        </div>

        <div style={{ padding: "16px 20px" }}>
          {/* Doc type radios */}
          <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
            {DOC_TYPES.map(t => (
              <label key={t} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#374151", cursor: "pointer" }}>
                <input type="radio" name="docType" value={t} checked={docType === t} onChange={() => setDocType(t)} />
                {t}
              </label>
            ))}
          </div>

          {/* Dropzone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input").click()}
            style={{
              border: `2px dashed ${dragging ? "#3a8c5c" : "#d1d5db"}`,
              borderRadius: 4, padding: "40px 20px",
              textAlign: "center", cursor: "pointer",
              background: dragging ? "#f0fdf4" : "#fafafa",
              marginBottom: 14, transition: "all 0.15s",
            }}>
            <input id="file-input" type="file" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
            <div style={{ fontSize: 28, color: "#9ca3af", marginBottom: 8 }}>📎</div>
            {fileName ? (
              <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>📄 {fileName}</div>
            ) : (
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                <a style={{ color: "#3b82f6", textDecoration: "underline", cursor: "pointer" }}>Click to upload</a>
                {" "}or drag and drop file
              </div>
            )}
          </div>

          {/* Notes */}
          <div style={{ marginBottom: 4 }}>
            <label style={{ display: "block", fontSize: 11, color: "#6b7280", marginBottom: 3, fontWeight: 500 }}>Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Optional notes..."
              style={{
                width: "100%", border: "1px solid #d1d5db", borderRadius: 3,
                padding: "6px 8px", fontSize: 12, resize: "vertical",
                minHeight: 64, outline: "none", color: "#374151",
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "10px 20px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "flex-end", gap: 8, background: "#f9fafb" }}>
          <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", background: "#374151", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 12 }}>
            ✕ Close
          </button>
          <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", background: "#3a8c5c", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 500 }}>
            ✓ Save
          </button>
        </div>
      </div>
    </div>
  );
}
