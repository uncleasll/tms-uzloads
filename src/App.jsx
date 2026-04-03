import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import DriversTable from "./components/DriversTable";
import DispatchBoard from "./components/DispatchBoard";
import LoadsPage from "./components/LoadsPage";
import PlaceholderPage from "./components/PlaceholderPage";

const PAGE_TITLES = {
  loadboards: "Loadboards",
  dispatch: "Dispatch Board",
  loads: "Loads",
  drivers: "Drivers",
  partners: "Partners",
  "partners-customers": "Customers",
  "partners-vendors": "Vendors",
  equipment: "Equipment",
  "equipment-trucks": "Trucks",
  "equipment-trailers": "Trailers",
  fuel: "Fuel",
  "fuel-cards": "Fuel Cards",
  "fuel-transactions": "Fuel Transactions",
  "fuel-import": "Import Templates",
  payroll: "Driver Payroll",
  accounting: "Accounting",
  "accounting-payments": "Payments",
  "accounting-expenses": "Expenses",
  "accounting-factoring": "Factoring Reports",
  "accounting-chart": "Chart of Accounts",
  "accounting-billing": "Billing Entries",
  "accounting-vendor": "Vendor Balances",
  "accounting-additions": "Additions/Deductions",
  "accounting-scheduled": "Scheduled Payments",
  reports: "Reports",
  "reports-emails": "Emails",
  "reports-revenue": "Total Revenue",
  "reports-rpm": "Rate per Mile",
  "reports-dispatcher": "Revenue by Dispatcher",
  "reports-payment": "Payment Summary",
  "reports-expenses": "Expenses",
  "reports-gross": "Gross Profit",
  "reports-grossload": "Gross Profit per Load",
  "reports-pl": "Profit & Loss",
  tolls: "Tolls",
  "tolls-devices": "Toll Devices",
  "tolls-transactions": "Toll Transactions",
  "tolls-import": "Import Templates",
  safety: "Safety",
  "safety-claims": "Claims",
  ifta: "IFTA",
  "ifta-ifta": "IFTA",
  "ifta-states": "KY, NY, OR, NM, CT",
  "ifta-miles": "Miles & Fuel by State",
  users: "Users",
  datalibrary: "Data Library",
  "datalibrary-brokers": "Brokers",
  "datalibrary-shippers": "Shippers/Receivers",
  "datalibrary-factoring": "Factoring Companies",
  "datalibrary-trailer": "Trailer Types",
  docs: "Docs Exchange",
};

function PageContent({ page }) {
  if (page === "dispatch") return <DispatchBoard />;
  if (page === "drivers") return <DriversTable />;
  if (page === "loads") return <LoadsPage />;
  return <PlaceholderPage title={PAGE_TITLES[page] || page} />;
}

export default function App() {
  const [activePage, setActivePage] = useState("dispatch");

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <TopNavbar />
        <main style={{ flex: 1, overflowY: "auto", background: "#f0f1f3" }}>
          <PageContent page={activePage} />
        </main>
      </div>
    </div>
  );
}
