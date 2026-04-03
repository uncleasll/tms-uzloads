# FleetPro TMS Dashboard

A pixel-accurate replica of a trucking TMS (Transportation Management System) dispatch platform, built with React + Tailwind CSS.

## Features

- **Dark sidebar** with collapsible navigation (16 menu items)
- **Dark top navbar** with user account dropdown
- **Dispatch Board** — weekly grid with driver rows, load cards, day navigation, filters
- **Drivers Table** — sortable/searchable table with pagination, status badges, action buttons
- **Account Dropdown** — user profile menu with avatar header
- **Placeholder pages** for all other nav items

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Install & Run

```bash
npm install
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
  components/
    Sidebar.jsx          — collapsible left navigation
    TopNavbar.jsx        — top bar with user avatar/dropdown
    AccountDropdown.jsx  — user account menu
    DriversTable.jsx     — full drivers page with search/pagination
    DispatchBoard.jsx    — weekly dispatch grid
    FilterBar.jsx        — reusable filter dropdowns
    StatusBadge.jsx      — colored status pills
    PlaceholderPage.jsx  — stub pages for other nav items
    Icons.jsx            — all SVG icons as React components
  data/
    mockData.js          — drivers, loads, weekdays mock data
  App.jsx                — root layout + page routing
  index.css              — global styles + Tailwind directives
  index.js               — React entry point
```

## Design System

| Token | Value |
|-------|-------|
| Sidebar/Navbar bg | `#1a1f2e` |
| Active nav | `#3a8c5c` |
| Content bg | `#f0f1f3` |
| Card bg | `#ffffff` |
| Border | `#e5e7eb` |
| Text primary | `#111827` |
| Text muted | `#6b7280` |
| Blue link | `#3b82f6` |
| Warning | `#f59e0b` |
