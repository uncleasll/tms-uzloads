import React from "react";

const iconProps = { width: 14, height: 14, viewBox: "0 0 16 16", fill: "currentColor" };

export const Icons = {
  grid: () => (
    <svg {...iconProps}>
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  ),
  list: () => (
    <svg {...iconProps}>
      <rect x="1" y="2" width="14" height="2" rx="1" />
      <rect x="1" y="7" width="14" height="2" rx="1" />
      <rect x="1" y="12" width="14" height="2" rx="1" />
    </svg>
  ),
  filetext: () => (
    <svg {...iconProps}>
      <path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" />
      <path d="M10 2v4h4M5 8h6M5 11h4" stroke="white" strokeWidth="0.5" fill="none" />
    </svg>
  ),
  user: () => (
    <svg {...iconProps}>
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
  ),
  users: () => (
    <svg {...iconProps}>
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="11" cy="5" r="2.5" />
      <path d="M1 13c0-2.8 1.8-5 4-5s4 2.2 4 5" />
      <path d="M9 13c0-2.8 1.8-5 4-5" />
    </svg>
  ),
  truck: () => (
    <svg {...iconProps}>
      <rect x="1" y="5" width="10" height="7" rx="1" />
      <path d="M11 7l3 2v3h-3V7z" />
      <circle cx="4" cy="13" r="1.5" />
      <circle cx="12" cy="13" r="1.5" />
    </svg>
  ),
  droplet: () => (
    <svg {...iconProps}>
      <path d="M8 2C8 2 3 7.5 3 10.5a5 5 0 0010 0C13 7.5 8 2 8 2z" />
    </svg>
  ),
  creditcard: () => (
    <svg {...iconProps}>
      <rect x="1" y="3" width="14" height="10" rx="1" />
      <path d="M1 6h14M4 10h4" stroke="white" strokeWidth="1" fill="none" />
    </svg>
  ),
  dollar: () => (
    <svg {...iconProps}>
      <path d="M8 1v14M5 4h4.5a2.5 2.5 0 010 5H5.5a2.5 2.5 0 000 5H11" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  barchart: () => (
    <svg {...iconProps}>
      <rect x="1" y="8" width="3" height="6" />
      <rect x="6" y="5" width="3" height="9" />
      <rect x="11" y="2" width="3" height="12" />
    </svg>
  ),
  clock: () => (
    <svg {...iconProps}>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  shield: () => (
    <svg {...iconProps}>
      <path d="M8 1l6 3v5c0 3-2.5 5.5-6 7-3.5-1.5-6-4-6-7V4z" />
    </svg>
  ),
  activity: () => (
    <svg {...iconProps}>
      <path d="M1 8h3l2-5 3 10 2-5 2 2h2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  database: () => (
    <svg {...iconProps}>
      <ellipse cx="8" cy="4" rx="6" ry="2" />
      <path d="M2 4v4c0 1.1 2.7 2 6 2s6-.9 6-2V4" />
      <path d="M2 8v4c0 1.1 2.7 2 6 2s6-.9 6-2V8" />
    </svg>
  ),
  file: () => (
    <svg {...iconProps}>
      <path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" />
      <path d="M10 2v4h4" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  search: () => (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="none">
      <circle cx="6.5" cy="6.5" r="5" stroke="#9ca3af" strokeWidth="1.5" />
      <path d="M11 11l3.5 3.5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  chevronDown: () => (
    <svg width={10} height={10} viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  warning: () => (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="#f59e0b">
      <path d="M8 1L1 14h14L8 1z" />
      <path d="M8 6v4M8 11.5v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  ),
  edit: () => (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor">
      <path d="M11 2l3 3-9 9H2v-3l9-9z" />
    </svg>
  ),
  eye: () => (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor">
      <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
      <circle cx="8" cy="8" r="2" fill="white" />
    </svg>
  ),
  trash: () => (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 4h10M5 4V3h6v1M5 4l1 9h4l1-9" />
    </svg>
  ),
  account: () => (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.5 }}>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2.5" />
    </svg>
  ),
  billing: () => (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.5 }}>
      <rect x="2" y="4" width="12" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 4V3h6v1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  company: () => (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.5 }}>
      <rect x="2" y="3" width="12" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 7h6M5 10h4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  profile: () => (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.5 }}>
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
  ),
  settings: () => (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.5 }}>
      <circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M3.2 12.8l1.4-1.4M11.4 4.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  logout: () => (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.5 }}>
      <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  phone: () => (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.5 }}>
      <path d="M3 2h3l1.5 3.5-2 1.5A9 9 0 0010.5 11l1.5-2L15 10.5V13a1 1 0 01-1 1C6 14 2 9 2 3a1 1 0 011-1z" />
    </svg>
  ),
  menu: () => (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="currentColor">
      <rect x="1" y="3" width="16" height="2" rx="1" />
      <rect x="1" y="8" width="16" height="2" rx="1" />
      <rect x="1" y="13" width="16" height="2" rx="1" />
    </svg>
  ),
  plus: () => (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  pdf: () => (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 1h7l3 3v11H3V1z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 1v4h4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 8h2a1.5 1.5 0 010 3H5V8z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M9.5 8H11v5H9.5M9.5 10.5H11" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  calendar: () => (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="3" width="14" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 7h14M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  filter: () => (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 3h12M4 8h8M6 13h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  note: () => (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.6 }}>
      <path d="M3 2h10v12H3z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 5h6M5 8h6M5 11h3" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  ),
  sort: () => (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
};

export default Icons;
