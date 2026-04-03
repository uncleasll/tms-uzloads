import React, { useMemo, useState } from "react";
import { drivers, loads, weekDays } from "../data/mockData";
import Icons from "./Icons";

const SHOW_DAYS_OPTIONS = [7, 14, 21];

const FILTER_CONFIG = [
  {
    key: "date",
    options: ["Search by Date", "This Week", "Last Week", "This Month"],
  },
  {
    key: "sort",
    options: [
      "Sort by: Driver's Name...",
      "Sort by: Load #",
      "Sort by: Status",
      "Sort by: Date",
    ],
  },
  {
    key: "filter",
    options: [
      "Filter by: All",
      "Filter by: Active",
      "Filter by: Completed",
      "Filter by: Cancelled",
    ],
  },
  {
    key: "drivers",
    options: ["Drivers: Show All", "Drivers: Assigned", "Drivers: Unassigned"],
  },
];

const TABS = ["New Load", "Delivered", "En Route"];

export default function DispatchBoard() {
  const [showDays, setShowDays] = useState(7);
  const [activeTab, setActiveTab] = useState("New Load");
  const [search, setSearch] = useState("");
  const [selectedLoadId, setSelectedLoadId] = useState(null);
  const [filters, setFilters] = useState({
    date: "Search by Date",
    sort: "Sort by: Driver's Name...",
    filter: "Filter by: All",
    drivers: "Drivers: Show All",
  });

  const visibleDays = useMemo(() => weekDays.slice(0, showDays), [showDays]);
  const gridCols = `repeat(${visibleDays.length}, minmax(130px, 1fr))`;

  const filteredLoads = useMemo(() => {
    let result = [...loads];

    // Tab filter
    result = result.filter((load) => {
      const normalizedStatus = String(load.status || "").toLowerCase();

      if (activeTab === "Delivered") {
        return normalizedStatus.includes("delivered");
      }

      if (activeTab === "En Route") {
        return (
          normalizedStatus.includes("route") ||
          normalizedStatus.includes("transit") ||
          normalizedStatus.includes("picked")
        );
      }

      return (
        normalizedStatus.includes("new") ||
        normalizedStatus.includes("pending") ||
        normalizedStatus.includes("route") ||
        normalizedStatus.includes("transit") ||
        normalizedStatus.includes("picked")
      );
    });

    // Search filter
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((load) => {
        return [
          load.id,
          load.origin,
          load.destination,
          load.status,
          load.rate,
          load.miles,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);
      });
    }

    // Driver filter
    if (filters.drivers === "Drivers: Assigned") {
      result = result.filter((load) => !!load.driverId);
    }
    if (filters.drivers === "Drivers: Unassigned") {
      result = result.filter((load) => !load.driverId);
    }

    // Generic filter
    if (filters.filter === "Filter by: Completed") {
      result = result.filter((load) =>
        String(load.status || "").toLowerCase().includes("delivered")
      );
    }
    if (filters.filter === "Filter by: Active") {
      result = result.filter(
        (load) =>
          !String(load.status || "").toLowerCase().includes("delivered") &&
          !String(load.status || "").toLowerCase().includes("cancelled")
      );
    }
    if (filters.filter === "Filter by: Cancelled") {
      result = result.filter((load) =>
        String(load.status || "").toLowerCase().includes("cancelled")
      );
    }

    // Sort
    if (filters.sort === "Sort by: Load #") {
      result.sort((a, b) => Number(a.id) - Number(b.id));
    } else if (filters.sort === "Sort by: Status") {
      result.sort((a, b) =>
        String(a.status || "").localeCompare(String(b.status || ""))
      );
    } else if (filters.sort === "Sort by: Date") {
      result.sort((a, b) => Number(a.startDay || 0) - Number(b.startDay || 0));
    } else {
      result.sort((a, b) => {
        const driverA =
          drivers.find((d) => d.id === a.driverId)?.name?.toLowerCase() || "";
        const driverB =
          drivers.find((d) => d.id === b.driverId)?.name?.toLowerCase() || "";
        return driverA.localeCompare(driverB);
      });
    }

    return result;
  }, [activeTab, search, filters]);

  const loadsByDriverAndDay = useMemo(() => {
    const map = new Map();

    filteredLoads.forEach((load) => {
      if (!load.driverId && load.driverId !== 0) return;
      const key = `${load.driverId}-${load.startDay}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(load);
    });

    return map;
  }, [filteredLoads]);

  const unassignedLoads = useMemo(
    () => filteredLoads.filter((load) => !load.driverId),
    [filteredLoads]
  );

  const selectedLoad = useMemo(
    () => filteredLoads.find((load) => load.id === selectedLoadId) || null,
    [filteredLoads, selectedLoadId]
  );

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={styles.page}>
      <DispatchHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
      />

      <DispatchFilters
        filters={filters}
        onChange={handleFilterChange}
      />

      <div style={styles.boardShell}>
        <DriverColumn drivers={drivers} />

        <div style={styles.gridArea}>
          <DayHeader visibleDays={visibleDays} gridCols={gridCols} />

          {drivers.map((driver) => (
            <DriverGridRow
              key={driver.id}
              driver={driver}
              visibleDays={visibleDays}
              gridCols={gridCols}
              loadsByDriverAndDay={loadsByDriverAndDay}
              selectedLoadId={selectedLoadId}
              setSelectedLoadId={setSelectedLoadId}
            />
          ))}

          <UnassignedRow
            visibleDays={visibleDays}
            gridCols={gridCols}
            unassignedLoads={unassignedLoads}
            selectedLoadId={selectedLoadId}
            setSelectedLoadId={setSelectedLoadId}
          />

          <ShowDaysFooter showDays={showDays} setShowDays={setShowDays} />
        </div>

        <NotesPanel selectedLoad={selectedLoad} />
      </div>
    </div>
  );
}

function DispatchHeader({ activeTab, setActiveTab, search, setSearch }) {
  return (
    <div style={styles.headerRow}>
      <h1 style={styles.pageTitle}>Dispatch Board</h1>

      <div style={styles.headerRight}>
        <div style={styles.tabsWrap}>
          {TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.tabButton,
                  ...(active ? styles.tabButtonActive : {}),
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div style={styles.searchWrap}>
          <Icons.search />
          <input
            type="text"
            placeholder="Search loads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>
    </div>
  );
}

function DispatchFilters({ filters, onChange }) {
  return (
    <div style={styles.filterRow}>
      {FILTER_CONFIG.map((item) => (
        <select
          key={item.key}
          value={filters[item.key]}
          onChange={(e) => onChange(item.key, e.target.value)}
          style={styles.filterSelect}
        >
          {item.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ))}
    </div>
  );
}

function DriverColumn({ drivers }) {
  return (
    <div style={styles.driverColumn}>
      <div style={{ ...styles.stickyHeaderCell, ...styles.driverHeaderCell }}>
        DRIVERS
      </div>

      {drivers.map((driver) => (
        <div key={driver.id} style={styles.driverCell}>
          <div style={styles.driverNameRow}>
            <span style={styles.driverName}>{driver.name}</span>
            <span style={styles.driverType}>{driver.type}</span>
          </div>
          <div style={styles.driverPhone}>{driver.phone}</div>
        </div>
      ))}

      <div style={{ ...styles.driverCell, ...styles.unassignedDriverCell }}>
        <span style={styles.unassignedText}>Unassigned loads</span>
      </div>
    </div>
  );
}

function DayHeader({ visibleDays, gridCols }) {
  return (
    <div
      style={{
        ...styles.gridHeader,
        gridTemplateColumns: gridCols,
      }}
    >
      {visibleDays.map((day) => (
        <div
          key={`${day.label}-${day.date}`}
          style={{
            ...styles.dayHeaderCell,
            ...(day.today ? styles.dayHeaderToday : {}),
            ...(day.weekend ? styles.dayHeaderWeekend : {}),
          }}
        >
          <span style={styles.dayLabel}>{day.label}</span>
          <span style={styles.dayNumber}>{day.date}</span>
        </div>
      ))}
    </div>
  );
}

function DriverGridRow({
  driver,
  visibleDays,
  gridCols,
  loadsByDriverAndDay,
  selectedLoadId,
  setSelectedLoadId,
}) {
  return (
    <div
      style={{
        ...styles.gridRow,
        gridTemplateColumns: gridCols,
      }}
    >
      {visibleDays.map((day, dayIndex) => {
        const dayLoads = loadsByDriverAndDay.get(`${driver.id}-${dayIndex}`) || [];

        return (
          <div
            key={`${driver.id}-${dayIndex}`}
            style={{
              ...styles.gridCell,
              ...(day.weekend ? styles.gridCellWeekend : {}),
            }}
          >
            {dayLoads.map((load, index) => (
              <LoadCard
                key={`${load.id}-${index}`}
                load={load}
                selected={selectedLoadId === load.id}
                onClick={() =>
                  setSelectedLoadId((prev) => (prev === load.id ? null : load.id))
                }
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function UnassignedRow({
  visibleDays,
  gridCols,
  unassignedLoads,
  selectedLoadId,
  setSelectedLoadId,
}) {
  return (
    <div
      style={{
        ...styles.gridRow,
        gridTemplateColumns: gridCols,
        minHeight: 58,
      }}
    >
      {visibleDays.map((day, dayIndex) => {
        const dayLoads = unassignedLoads.filter((load) => load.startDay === dayIndex);

        return (
          <div
            key={`unassigned-${dayIndex}`}
            style={{
              ...styles.gridCell,
              ...styles.unassignedGridCell,
            }}
          >
            {dayLoads.map((load) => (
              <LoadCard
                key={load.id}
                load={load}
                selected={selectedLoadId === load.id}
                onClick={() =>
                  setSelectedLoadId((prev) => (prev === load.id ? null : load.id))
                }
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function LoadCard({ load, selected, onClick }) {
  const span = Math.max(1, Math.min(load.spanDays || 1, 3));
  return (
    <div
      onClick={onClick}
      style={{
        ...styles.loadCard,
        ...(selected ? styles.loadCardSelected : {}),
        ...(span > 1 ? { width: `calc(${span * 100}% + ${(span - 1) * 6}px)` } : {}),
      }}
    >
      <div style={styles.loadCardId}>#{load.id}</div>
      <div style={styles.loadCardLine}>{load.origin}</div>
      <div style={styles.loadCardSubline}>→ {load.destination}</div>
    </div>
  );
}

function NotesPanel({ selectedLoad }) {
  return (
    <div style={styles.notesPanel}>
      <div style={{ ...styles.stickyHeaderCell, ...styles.notesHeaderCell }}>
        NOTES
      </div>

      <div style={styles.notesBody}>
        <div style={styles.notesLinks}>
          {["+ Add note", "+ Add lumper", "View details"].map((item) => (
            <a key={item} href="#" style={styles.notesLink}>
              {item}
            </a>
          ))}
        </div>

        <span style={styles.inactiveBadge}>INACTIVE</span>

        {!selectedLoad ? (
          <div style={styles.emptyDetailsCard}>
            <div style={styles.emptyDetailsTitle}>No load selected</div>
            <div style={styles.emptyDetailsText}>
              Click a load card on the board to view more details here.
            </div>
          </div>
        ) : (
          <div style={styles.detailsCard}>
            <div style={styles.detailsHeader}>#{selectedLoad.id}</div>

            <DetailRow label="Origin" value={selectedLoad.origin} />
            <DetailRow label="Destination" value={selectedLoad.destination} />
            <DetailRow label="Miles" value={String(selectedLoad.miles ?? "-")} />
            <DetailRow label="Rate" value={`$${selectedLoad.rate ?? "0.00"}`} />

            <div style={{ marginTop: 8 }}>
              <StatusBadgeSmall status={selectedLoad.status} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={styles.detailRow}>
      <span style={styles.detailLabel}>{label}</span>
      <span style={styles.detailValue}>{value}</span>
    </div>
  );
}

function ShowDaysFooter({ showDays, setShowDays }) {
  return (
    <div style={styles.footerBar}>
      <span>Show days:</span>
      {SHOW_DAYS_OPTIONS.map((n) => {
        const active = showDays === n;
        return (
          <button
            key={n}
            onClick={() => setShowDays(n)}
            style={{
              ...styles.daysButton,
              ...(active ? styles.daysButtonActive : {}),
            }}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

function StatusBadgeSmall({ status }) {
  const text = String(status || "Pending");
  const normalized = text.toLowerCase();

  let palette = {
    bg: "#f3f4f6",
    color: "#6b7280",
  };

  if (normalized.includes("delivered")) {
    palette = { bg: "#dcfce7", color: "#166534" };
  } else if (
    normalized.includes("route") ||
    normalized.includes("transit") ||
    normalized.includes("picked")
  ) {
    palette = { bg: "#dbeafe", color: "#1d4ed8" };
  } else if (normalized.includes("new")) {
    palette = { bg: "#e0e7ff", color: "#3730a3" };
  }

  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: 10,
        fontSize: 10,
        fontWeight: 600,
        background: palette.bg,
        color: palette.color,
      }}
    >
      {text}
    </span>
  );
}

const styles = {
  page: {
    padding: "16px 20px",
    background: "#f3f4f6",
  },

  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#111827",
    margin: 0,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  tabsWrap: {
    display: "flex",
    gap: 4,
  },
  tabButton: {
    padding: "5px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 4,
    fontSize: 11,
    cursor: "pointer",
    background: "#ffffff",
    color: "#374151",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  tabButtonActive: {
    background: "#3a8c5c",
    borderColor: "#3a8c5c",
    color: "#ffffff",
  },

  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: "1px solid #d1d5db",
    borderRadius: 4,
    padding: "5px 8px",
    background: "#ffffff",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: 12,
    width: 180,
    color: "#374151",
    background: "transparent",
  },

  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  filterSelect: {
    border: "1px solid #d1d5db",
    borderRadius: 4,
    padding: "5px 8px",
    fontSize: 11,
    background: "#ffffff",
    color: "#374151",
    cursor: "pointer",
  },

  boardShell: {
    display: "flex",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
    background: "#ffffff",
    minHeight: 420,
  },

  driverColumn: {
    width: 188,
    minWidth: 188,
    borderRight: "1px solid #e5e7eb",
    background: "#ffffff",
    flexShrink: 0,
  },
  stickyHeaderCell: {
    position: "sticky",
    top: 0,
    zIndex: 3,
    height: 44,
    borderBottom: "1px solid #e5e7eb",
    background: "#f9fafb",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    fontSize: 11,
    fontWeight: 600,
    color: "#6b7280",
    letterSpacing: "0.5px",
  },
  driverHeaderCell: {},
  notesHeaderCell: {},

  driverCell: {
    padding: "8px 10px",
    borderBottom: "1px solid #f3f4f6",
    minHeight: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  driverNameRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  driverName: {
    fontSize: 11,
    fontWeight: 600,
    color: "#374151",
    lineHeight: 1.3,
  },
  driverType: {
    display: "inline-flex",
    alignItems: "center",
    padding: "1px 5px",
    background: "#dbeafe",
    color: "#1d4ed8",
    borderRadius: 3,
    fontSize: 9,
    fontWeight: 700,
  },
  driverPhone: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 3,
  },
  unassignedDriverCell: {
    minHeight: 58,
    background: "#fafafa",
  },
  unassignedText: {
    fontSize: 10,
    color: "#9ca3af",
    fontStyle: "italic",
  },

  gridArea: {
    flex: 1,
    overflow: "auto",
    background: "#ffffff",
  },
  gridHeader: {
    display: "grid",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 2,
    background: "#f9fafb",
  },
  dayHeaderCell: {
    padding: "6px 8px",
    textAlign: "center",
    borderRight: "1px solid #f3f4f6",
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 1,
    color: "#374151",
    background: "#f9fafb",
  },
  dayHeaderToday: {
    background: "rgba(58,140,92,0.08)",
    color: "#3a8c5c",
  },
  dayHeaderWeekend: {
    background: "#fbfbfc",
  },
  dayLabel: {
    fontSize: 10,
    opacity: 0.72,
  },
  dayNumber: {
    fontSize: 13,
    fontWeight: 600,
  },

  gridRow: {
    display: "grid",
    borderBottom: "1px solid #f3f4f6",
    minHeight: 70,
  },
  gridCell: {
    borderRight: "1px solid #f3f4f6",
    padding: 4,
    position: "relative",
    background: "#ffffff",
  },
  gridCellWeekend: {
    background: "rgba(249,250,251,0.8)",
  },
  unassignedGridCell: {
    background: "#fafafa",
  },

  loadCard: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 3,
    padding: "5px 7px",
    cursor: "pointer",
    position: "relative",
    zIndex: 1,
    marginBottom: 4,
    boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
  },
  loadCardSelected: {
    background: "#dbeafe",
    border: "1px solid #93c5fd",
  },
  loadCardId: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1d4ed8",
  },
  loadCardLine: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.3,
    marginTop: 2,
  },
  loadCardSubline: {
    fontSize: 10,
    color: "#6b7280",
    lineHeight: 1.3,
  },

  notesPanel: {
    width: 200,
    minWidth: 200,
    borderLeft: "1px solid #e5e7eb",
    background: "#f9fafb",
    flexShrink: 0,
  },
  notesBody: {
    padding: 10,
  },
  notesLinks: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 10,
  },
  notesLink: {
    fontSize: 11,
    color: "#3b82f6",
    textDecoration: "none",
    cursor: "pointer",
  },
  inactiveBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 8px",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: 3,
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 10,
  },

  emptyDetailsCard: {
    marginTop: 8,
    padding: 10,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
  },
  emptyDetailsTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 4,
  },
  emptyDetailsText: {
    fontSize: 10,
    color: "#6b7280",
    lineHeight: 1.5,
  },

  detailsCard: {
    padding: 10,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
  },
  detailsHeader: {
    fontWeight: 700,
    color: "#1d4ed8",
    marginBottom: 8,
    fontSize: 12,
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    padding: "3px 0",
    borderBottom: "1px solid #f3f4f6",
  },
  detailLabel: {
    fontSize: 10,
    color: "#6b7280",
  },
  detailValue: {
    fontSize: 10,
    color: "#374151",
    textAlign: "right",
    fontWeight: 500,
  },

  footerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "8px 10px",
    borderTop: "1px solid #e5e7eb",
    background: "#f9fafb",
    gap: 8,
    fontSize: 11,
    color: "#6b7280",
  },
  daysButton: {
    padding: "3px 8px",
    border: "1px solid #d1d5db",
    borderRadius: 3,
    background: "#ffffff",
    color: "#374151",
    fontSize: 11,
    cursor: "pointer",
  },
  daysButtonActive: {
    background: "#3a8c5c",
    color: "#ffffff",
    borderColor: "#3a8c5c",
  },
};