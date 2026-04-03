import React, { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  X,
  Check,
  FileText,
  ArrowUp,
  ArrowDown,
  Package,
  User,
  StickyNote,
  Paperclip,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
  SlidersHorizontal,
  CircleDollarSign,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import AttachmentUploadModal from "./AttachmentUploadModal";

const STATUSES = ["New", "In Transit", "Delivered", "Cancelled"];
const BILLING_STATUSES = ["Pending", "Invoiced", "Paid", "Factored"];
const DISPATCHERS = ["Asilbek Karimov", "Bobur Toshmatov"];
const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS",
  "KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY",
  "NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV",
  "WI","WY"
];
const BROKERS = [
  "XPO Logistics",
  "Echo Global",
  "Coyote Logistics",
  "CH Robinson",
  "Transplace",
];
const DRIVERS_LIST = [
  "Xumotyun Baxriddinov",
  "Bobur Toshmatov",
  "Sardor Yusupov",
  "Jasur Mirzayev",
];
const TRUCKS = ["TRK-001", "TRK-002", "TRK-003", "TRK-007"];
const TRAILERS = ["TRL-012", "TRL-023", "TRL-044", "TRL-055"];

const initialLoads = [
  {
    id: "LD-20241",
    date: "04/30/26",
    driver: "Xumotyun Baxriddinov",
    broker: "XPO Logistics",
    po: "PO-8821",
    pickup: "New York Mills, MN",
    delivery: "Brookland, AR",
    rate: "$2,480.00",
    completed: "05/02/26",
    status: "In Transit",
    billing: "Pending",
    notes: "",
    attachments: 1,
  },
  {
    id: "LD-20235",
    date: "04/28/26",
    driver: "Bobur Toshmatov",
    broker: "Echo Global",
    po: "PO-8801",
    pickup: "Chicago, IL",
    delivery: "Dallas, TX",
    rate: "$1,840.00",
    completed: "05/03/26",
    status: "Delivered",
    billing: "Invoiced",
    notes: "",
    attachments: 2,
  },
  {
    id: "LD-20228",
    date: "04/27/26",
    driver: "Sardor Yusupov",
    broker: "CH Robinson",
    po: "PO-8795",
    pickup: "Atlanta, GA",
    delivery: "Memphis, TN",
    rate: "$786.00",
    completed: "05/01/26",
    status: "Delivered",
    billing: "Paid",
    notes: "Lumper required",
    attachments: 0,
  },
];

const emptyForm = () => ({
  status: "New",
  billingStatus: "Pending",
  dispatcher: "Asilbek Karimov",
  pickupDate: "",
  pickupCity: "",
  pickupState: "",
  pickupZip: "",
  deliveryDate: "",
  deliveryCity: "",
  deliveryState: "",
  deliveryZip: "",
  broker: "",
  po: "",
  rate: "",
  driver: "",
  truck: "",
  trailer: "",
  notes: "",
  attachments: [],
});

const tableHeaders = [
  "Load",
  "Date",
  "Driver",
  "Broker",
  "PO #",
  "Pickup",
  "Delivery",
  "Rate",
  "Completed",
  "Status",
  "Billing",
  "Notes",
  "Attach.",
  "Actions",
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SectionTitle({ icon: Icon, text }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon className="h-4 w-4 text-emerald-600" />
      <span className="text-[18px] font-semibold text-slate-800">{text}</span>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-3">
      {label ? (
        <label className="mb-1.5 block text-[12px] font-medium text-slate-600">
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-[13px] text-slate-700 outline-none transition",
        "placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20",
        props.className
      )}
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-[13px] text-slate-700 outline-none transition",
        "focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20",
        props.className
      )}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition",
        "placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20",
        props.className
      )}
    />
  );
}

function MoneyInput({ value, onChange, placeholder = "0.00" }) {
  return (
    <div className="flex h-10 items-center overflow-hidden rounded-md border border-slate-300 bg-white">
      <div className="flex h-full w-10 items-center justify-center border-r border-slate-300 bg-slate-50 text-slate-500">
        <CircleDollarSign className="h-4 w-4" />
      </div>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-full flex-1 px-3 text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

function SmallActionButton({ icon: Icon, danger = false }) {
  return (
    <button
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border transition",
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-slate-300 text-slate-600 hover:bg-slate-50"
      )}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export default function LoadsPage() {
  const [loads, setLoads] = useState(initialLoads);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [attachModal, setAttachModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loadFilter, setLoadFilter] = useState("All");

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const filtered = useMemo(() => {
    return loads.filter((l) => {
      const matchesSearch =
        search === "" ||
        l.id.toLowerCase().includes(search.toLowerCase()) ||
        l.driver.toLowerCase().includes(search.toLowerCase()) ||
        l.broker.toLowerCase().includes(search.toLowerCase()) ||
        l.pickup.toLowerCase().includes(search.toLowerCase()) ||
        l.delivery.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        loadFilter === "All" ||
        (loadFilter === "Active" &&
          !String(l.status).toLowerCase().includes("delivered") &&
          !String(l.status).toLowerCase().includes("cancelled")) ||
        (loadFilter === "Completed" &&
          String(l.status).toLowerCase().includes("delivered")) ||
        (loadFilter === "Cancelled" &&
          String(l.status).toLowerCase().includes("cancelled"));

      return matchesSearch && matchesFilter;
    });
  }, [loads, search, loadFilter]);

  const totalRate = useMemo(() => {
    return loads.reduce((sum, l) => {
      const n = parseFloat((l.rate || "0").replace(/[$,]/g, ""));
      return sum + (isNaN(n) ? 0 : n);
    }, 0);
  }, [loads]);

  const handleCreate = () => {
    const newLoad = {
      id: `LD-${20000 + Math.floor(Math.random() * 999)}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      }),
      driver: form.driver || "—",
      broker: form.broker || "—",
      po: form.po || "—",
      pickup: `${form.pickupCity}${form.pickupState ? ", " + form.pickupState : ""}` || "—",
      delivery:
        `${form.deliveryCity}${form.deliveryState ? ", " + form.deliveryState : ""}` || "—",
      rate: form.rate
        ? `$${parseFloat(form.rate).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}`
        : "$0.00",
      completed: form.deliveryDate || "—",
      status: form.status,
      billing: form.billingStatus,
      notes: form.notes,
      attachments: form.attachments.length,
    };

    setLoads((prev) => [newLoad, ...prev]);
    setForm(emptyForm());
    setShowForm(false);
  };

  const handleAttachSave = (att) => {
    setForm((prev) => ({ ...prev, attachments: [...prev.attachments, att] }));
  };

  return (
    <div className="min-h-full bg-[#f4f5f7] px-5 py-4">
      {attachModal ? (
        <AttachmentUploadModal
          onClose={() => setAttachModal(false)}
          onSave={handleAttachSave}
        />
      ) : null}

      {/* Page Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[20px] font-bold text-slate-800">Loads</h1>

          <div className="relative">
            <select
              value={loadFilter}
              onChange={(e) => setLoadFilter(e.target.value)}
              className="h-9 rounded-md border border-slate-300 bg-white pl-3 pr-8 text-[13px] text-slate-700 outline-none"
            >
              <option>All</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[340px] rounded-md border border-slate-300 bg-white px-4 py-2 shadow-sm">
            <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-slate-500">
              <span>$0.00</span>
              <span>
                TOTAL: $
                {totalRate.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[68%] rounded-full bg-slate-500" />
            </div>
          </div>

          <div className="flex h-10 items-center rounded-md border border-slate-300 bg-white px-3 shadow-sm">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[180px] border-none bg-transparent px-2 text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
            />
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
          </div>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            type="button"
          >
            <Plus className="h-4 w-4" />
            <span>New Load</span>
            <ChevronDown className="h-4 w-4 opacity-80" />
          </button>
        </div>
      </div>

      {/* New Load Form */}
      {showForm ? (
        <div className="mb-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_1fr_1fr_1fr_1fr_1.1fr_260px]">
            {/* New Load */}
            <div>
              <SectionTitle icon={FileText} text="New Load" />

              <Field label="Status">
                <Select value={form.status} onChange={(e) => set("status", e.target.value)}>
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>

              <Field label="Billing Status">
                <Select
                  value={form.billingStatus}
                  onChange={(e) => set("billingStatus", e.target.value)}
                >
                  {BILLING_STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>

              <Field label="Dispatcher">
                <Select
                  value={form.dispatcher}
                  onChange={(e) => set("dispatcher", e.target.value)}
                >
                  {DISPATCHERS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>
            </div>

            {/* Pickup */}
            <div>
              <SectionTitle icon={ArrowUp} text="Pickup" />

              <Field label="Date">
                <div className="relative">
                  <Input
                    type="date"
                    value={form.pickupDate}
                    onChange={(e) => set("pickupDate", e.target.value)}
                  />
                  <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>

              <Field label="City">
                <Input
                  value={form.pickupCity}
                  onChange={(e) => set("pickupCity", e.target.value)}
                  placeholder="City"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="State">
                  <Select
                    value={form.pickupState}
                    onChange={(e) => set("pickupState", e.target.value)}
                  >
                    <option value="">Select</option>
                    {US_STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                </Field>

                <Field label="Zip">
                  <Input
                    value={form.pickupZip}
                    onChange={(e) => set("pickupZip", e.target.value)}
                    placeholder="Zip"
                  />
                </Field>
              </div>
            </div>

            {/* Delivery */}
            <div>
              <SectionTitle icon={ArrowDown} text="Delivery" />

              <Field label="Date">
                <div className="relative">
                  <Input
                    type="date"
                    value={form.deliveryDate}
                    onChange={(e) => set("deliveryDate", e.target.value)}
                  />
                  <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>

              <Field label="City">
                <Input
                  value={form.deliveryCity}
                  onChange={(e) => set("deliveryCity", e.target.value)}
                  placeholder="City"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="State">
                  <Select
                    value={form.deliveryState}
                    onChange={(e) => set("deliveryState", e.target.value)}
                  >
                    <option value="">Select</option>
                    {US_STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                </Field>

                <Field label="Zip">
                  <Input
                    value={form.deliveryZip}
                    onChange={(e) => set("deliveryZip", e.target.value)}
                    placeholder="Zip"
                  />
                </Field>
              </div>
            </div>

            {/* Broker */}
            <div>
              <SectionTitle icon={Package} text="Broker" />

              <Field label="Broker">
                <Select value={form.broker} onChange={(e) => set("broker", e.target.value)}>
                  <option value="">Select broker</option>
                  {BROKERS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </Select>
              </Field>

              <Field label="PO #">
                <Input
                  value={form.po}
                  onChange={(e) => set("po", e.target.value)}
                  placeholder="PO number"
                />
              </Field>

              <Field label="Rate">
                <MoneyInput
                  value={form.rate}
                  onChange={(e) => set("rate", e.target.value)}
                />
              </Field>
            </div>

            {/* Driver */}
            <div>
              <SectionTitle icon={User} text="Driver" />

              <Field label="Driver">
                <Select value={form.driver} onChange={(e) => set("driver", e.target.value)}>
                  <option value="">Select driver</option>
                  {DRIVERS_LIST.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </Select>
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Truck">
                  <Select value={form.truck} onChange={(e) => set("truck", e.target.value)}>
                    <option value="">Select</option>
                    {TRUCKS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </Select>
                </Field>

                <Field label="Trailer">
                  <Select
                    value={form.trailer}
                    onChange={(e) => set("trailer", e.target.value)}
                  >
                    <option value="">Select</option>
                    {TRAILERS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </Select>
                </Field>
              </div>
            </div>

            {/* Notes */}
            <div>
              <SectionTitle icon={StickyNote} text="Notes" />

              <Field label="Notes">
                <Textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Enter notes..."
                  className="min-h-[112px] resize-y"
                />
              </Field>
            </div>

            {/* Attachments */}
            <div>
              <SectionTitle icon={Paperclip} text="Attachments" />

              <button
                type="button"
                onClick={() => setAttachModal(true)}
                className="w-full rounded-md border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-emerald-500 hover:bg-emerald-50"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                  <Paperclip className="h-5 w-5" />
                </div>

                <div className="text-[13px] text-slate-600">
                  Drag and drop or{" "}
                  <span className="font-medium text-sky-600 underline">upload</span>
                </div>

                {form.attachments.length > 0 ? (
                  <div className="mt-3 text-[12px] font-medium text-emerald-600">
                    {form.attachments.length} file
                    {form.attachments.length > 1 ? "s" : ""} attached
                  </div>
                ) : null}
              </button>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm(emptyForm());
              }}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <X className="h-4 w-4" />
              Close
            </button>

            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-[13px] font-semibold text-white transition hover:bg-emerald-700"
            >
              <Check className="h-4 w-4" />
              Create Load
            </button>
          </div>
        </div>
      ) : null}

      {/* Table */}
      <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[1320px] w-full border-collapse">
            <thead>
              <tr>
                {tableHeaders.map((h) => (
                  <th
                    key={h}
                    className="border-b border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={14}
                    className="px-6 py-14 text-center text-[13px] text-slate-400"
                  >
                    No loads found.
                  </td>
                </tr>
              ) : (
                filtered.map((load) => (
                  <tr
                    key={load.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50/70"
                  >
                    <td className="px-3 py-2.5 text-[13px]">
                      <a
                        href="#"
                        className="font-semibold text-sky-600 no-underline hover:underline"
                      >
                        {load.id}
                      </a>
                    </td>

                    <td className="px-3 py-2.5 text-[13px] text-slate-700">{load.date}</td>
                    <td className="px-3 py-2.5 text-[13px] text-slate-700">{load.driver}</td>
                    <td className="px-3 py-2.5 text-[13px] text-slate-700">{load.broker}</td>
                    <td className="px-3 py-2.5 text-[13px] text-slate-500">{load.po}</td>

                    <td className="max-w-[160px] truncate px-3 py-2.5 text-[13px] text-slate-700">
                      {load.pickup}
                    </td>

                    <td className="max-w-[160px] truncate px-3 py-2.5 text-[13px] text-slate-700">
                      {load.delivery}
                    </td>

                    <td className="px-3 py-2.5 text-[13px] font-semibold text-slate-900">
                      {load.rate}
                    </td>

                    <td className="px-3 py-2.5 text-[13px] text-slate-500">
                      {load.completed}
                    </td>

                    <td className="px-3 py-2.5">
                      <StatusBadge status={load.status} />
                    </td>

                    <td className="px-3 py-2.5">
                      <StatusBadge status={load.billing} />
                    </td>

                    <td className="max-w-[140px] truncate px-3 py-2.5 text-[13px] text-slate-500">
                      {load.notes || "—"}
                    </td>

                    <td className="px-3 py-2.5 text-center">
                      {load.attachments > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-1 text-[11px] font-semibold text-sky-700">
                          <Paperclip className="h-3.5 w-3.5" />
                          {load.attachments}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <SmallActionButton icon={Pencil} />
                        <SmallActionButton icon={Eye} />
                        <SmallActionButton icon={Trash2} danger />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="min-h-[72px] border-t border-slate-100 bg-white" />

        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 text-[12px] text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of{" "}
            <span className="font-semibold text-slate-700">{loads.length}</span> entries
          </div>
          <div className="text-slate-400">50 on page</div>
        </div>
      </div>
    </div>
  );
}