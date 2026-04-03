import React from "react";

const statusStyles = {
  Hired: { bg: "#dcfce7", color: "#166534" },
  "On Leave": { bg: "#fef9c3", color: "#854d0e" },
  Terminated: { bg: "#fee2e2", color: "#991b1b" },
  Applicant: { bg: "#ede9fe", color: "#5b21b6" },
  Active: { bg: "#dbeafe", color: "#1d4ed8" },
  "In Transit": { bg: "#dbeafe", color: "#1d4ed8" },
  Delivered: { bg: "#dcfce7", color: "#166534" },
  "En Route": { bg: "#e0e7ff", color: "#3730a3" },
  New: { bg: "#f3f4f6", color: "#374151" },
  Cancelled: { bg: "#fee2e2", color: "#991b1b" },
  Pending: { bg: "#fef3c7", color: "#92400e" },
  Invoiced: { bg: "#dbeafe", color: "#1d4ed8" },
  Paid: { bg: "#dcfce7", color: "#166534" },
  Factored: { bg: "#ede9fe", color: "#5b21b6" },
};

export default function StatusBadge({ status }) {
  const s = statusStyles[status] || { bg: "#f3f4f6", color: "#6b7280" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 8px", borderRadius: 10,
      fontSize: 11, fontWeight: 500,
      background: s.bg, color: s.color,
      whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}
