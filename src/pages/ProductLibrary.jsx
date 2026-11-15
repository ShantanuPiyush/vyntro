import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { U } from "../components/UiIcons.jsx";
import { products as seed, STATUS_LABEL, categoryFilters, statusFilters } from "../data/products.js";
import "../styles/ui.css";
import "./ProductLibrary.css";

const STATUS_ICON = {
  authorized: U.shield, pending: U.hourglass, discontinued: U.minusCircle,
  cancelled: U.xCircle, unauthorized: U.lock,
};

const kpis = [
  { label: "Total Products", value: "1,248", note: "+12.5%", up: true, cls: "purple", icon: U.cube },
  { label: "Authorized", value: "1,032", note: "82.7%", up: true, cls: "green", icon: U.shieldBig },
  { label: "Pending", value: "126", note: "10.1%", up: false, cls: "orange", icon: U.hourglassBig },
  { label: "Discontinued", value: "90", note: "7.2%", up: true, cls: "blue", icon: U.minusCircle },
  { label: "Cancelled", value: "15", note: "1.2%", up: false, cls: "pink", icon: U.xCircle },
];

const tabs = [
  { key: "all", label: "All Products", count: "1,248", icon: U.grid },
  { key: "authorized", label: "Authorized", count: "1,032", icon: U.shield },
  { key: "pending", label: "Pending", count: "126", icon: U.hourglass },
  { key: "discontinued", label: "Discontinued", count: "90", icon: U.minusCircle },
  { key: "cancelled", label: "Cancelled", count: "15", icon: U.xCircle },
];

const money = (n) => "$ " + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

function Thumb({ p, small }) {
  return (
    <span className={`pl-img ${small ? "sm" : ""}`} style={{ background: p.tint }}>
      {p.image ? <img src={p.image} alt={p.name} /> : <span>{p.emoji}</span>}
    </span>
  );
}

function Sel({ label, value, onChange, options }) {
  return (
    <label className="pl-sel">
      <span>{label}</span>
      <div>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o.v} value={o.v}>{o.t}</option>
          ))}
        </select>
        {U.chevDown}
      </div>
    </label>
  );
}

function FilterSection({ title, open, onToggle, children }) {
  return (
    <div className="pl-fsec">
      <button type="button" className="pl-fhead" onClick={onToggle}>
        <b>{title}</b>
        {open ? U.chevUp : U.chevDown}
      </button>
      {open && <div className="pl-fbody">{children}</div>}
    </div>
  );
}

export default function ProductLibrary() {
  const navigate = useNavigate();
  const [items, setItems] = useState(seed);
  const [view, setView] = useState("grid");
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [mat, setMat] = useState("all");
  const [buyer, setBuyer] = useState("all");
  const [selected, setSelected] = useState(new Set(["PRD-1001", "PRD-1003", "PRD-1005"]));
  const [showFilters, setShowFilters] = useState(typeof window !== "undefined" && window.innerWidth > 900);
  const [catChecks, setCatChecks] = useState(new Set());
  const [statusChecks, setStatusChecks] = useState(new Set());
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [openSec, setOpenSec] = useState({ category: true, status: true, price: false, material: false, color: false, finish: false });
  const [page, setPage] = useState(1);
  const [statusMenu, setStatusMenu] = useState(false);

  const list = useMemo(
    () =>
      items.filter((p) => {
        if (tab !== "all" && p.status !== tab) return false;
        if (q && !`${p.name} ${p.id}`.toLowerCase().includes(q.toLowerCase())) return false;
        if (cat !== "all" && p.category !== cat) return false;
        if (mat !== "all" && p.material !== mat) return false;
        if (catChecks.size && !catChecks.has(p.category)) return false;
        if (statusChecks.size && !statusChecks.has(p.status)) return false;
        if (priceMin !== "" && p.price < Number(priceMin)) return false;
        if (priceMax !== "" && p.price > Number(priceMax)) return false;
        return true;
      }),
    [items, tab, q, cat, mat, catChecks, statusChecks, priceMin, priceMax]
  );

  const activeFilters =
    (cat !== "all") + (mat !== "all") + catChecks.size + statusChecks.size + (priceMin !== "") + (priceMax !== "");
  const isFiltered = tab !== "all" || q || activeFilters > 0;

  const toggleIn = (setter) => (key) =>
    setter((prev) => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  const toggleSel = toggleIn(setSelected);

  const allChecked = list.length > 0 && list.every((p) => selected.has(p.id));
  const toggleAll = () =>
    setSelected((prev) => {
      const n = new Set(prev);
      allChecked ? list.forEach((p) => n.delete(p.id)) : list.forEach((p) => n.add(p.id));
      return n;
    });

  const bulkStatus = (status) => {
    setItems((prev) => prev.map((p) => (selected.has(p.id) ? { ...p, status } : p)));
    setStatusMenu(false);
  };

  const clearAll = () => {
    setQ(""); setCat("all"); setMat("all"); setBuyer("all"); setTab("all");
    setCatChecks(new Set()); setStatusChecks(new Set()); setPriceMin(""); setPriceMax("");
  };

  const switchView = (v) => {
    setView(v);
    if (window.innerWidth > 900) setShowFilters(v === "grid");
  };

  const secToggle = (k) => setOpenSec((s) => ({ ...s, [k]: !s[k] }));
  const selCount = [...selected].filter((id) => items.some((p) => p.id === id)).length;

  return (
    <div className="pg">
      {/* ---------- Header ---------- */}
      <div className="pg-head">
        <div>
          <div className="pg-crumb">Products {U.chevR} <b>Product Library</b></div>
          <h1>Product Library</h1>
          <p>Manage your complete product collection, variants and visibility.</p>
        </div>
        <div className="pg-actions">
          <button className="btn btn-outline">{U.upload} Import / Bulk Upload</button>
          <div className="pl-split">
            <button className="btn btn-outline">{U.download} Export</button>
            <button className="btn btn-outline pl-split-chev" aria-label="More export options">{U.chevDown}</button>
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/products/add")}>
            {U.plus} Add Product
          </button>
        </div>
      </div>

      {/* ---------- KPIs ---------- */}
      <div className="pl-kpis">
        {kpis.map((k) => (
          <div key={k.label} className={`pl-kpi ${k.cls}`}>
            <div className="pl-kpi-top">{k.icon}<span>{k.label}</span></div>
            <div className="pl-kpi-bot">
              <strong>{k.value}</strong>
              <span className={`pl-trend ${k.up ? "up" : "down"}`}>
                {k.up ? "↑" : "↓"} {k.note}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Status tabs ---------- */}
      <div className="pl-tabs">
        {tabs.map((t) => (
          <button key={t.key} className={`pl-tab ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
            {t.icon} {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className={`pl-body ${showFilters ? "with-filters" : ""}`}>
        {/* ---------- Filters panel ---------- */}
        {showFilters && (
          <aside className="pl-filters card">
            <div className="pl-filters-head">
              <h3>Filters</h3>
              <button type="button" onClick={clearAll}>Clear All</button>
            </div>

            <FilterSection title={"Category (18)"} open={openSec.category} onToggle={() => secToggle("category")}>
              <div className="pl-checks scroll">
                {categoryFilters.map(([name, n]) => (
                  <label key={name}>
                    <input type="checkbox" checked={catChecks.has(name)} onChange={() => toggleIn(setCatChecks)(name)} />
                    <span>{name}</span><em>({n.toLocaleString()})</em>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Status" open={openSec.status} onToggle={() => secToggle("status")}>
              <div className="pl-checks">
                {statusFilters.map(([key, n]) => (
                  <label key={key}>
                    <input type="checkbox" checked={statusChecks.has(key)} onChange={() => toggleIn(setStatusChecks)(key)} />
                    <span>{STATUS_LABEL[key]}</span><em>({n.toLocaleString()})</em>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Price Range" open={openSec.price} onToggle={() => secToggle("price")}>
              <div className="pl-price">
                <input type="number" placeholder="Min $" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
                <span>–</span>
                <input type="number" placeholder="Max $" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
              </div>
            </FilterSection>

            {[
              ["material", "Material", ["Oak Wood", "Teak Wood", "Rattan", "Fabric", "Ceramic"]],
              ["color", "Color", ["Natural", "Walnut", "Black", "White"]],
              ["finish", "Finish", ["Matte", "Glossy", "Natural"]],
            ].map(([key, title, opts]) => (
              <FilterSection key={key} title={title} open={openSec[key]} onToggle={() => secToggle(key)}>
                <div className="pl-checks">
                  {opts.map((o) => (
                    <label key={o}><input type="checkbox" /><span>{o}</span></label>
                  ))}
                </div>
              </FilterSection>
            ))}

            <button type="button" className="btn btn-outline pl-fbtn">{U.sliders} More Filters</button>
            <button type="button" className="btn btn-primary pl-fbtn" onClick={() => window.innerWidth <= 900 && setShowFilters(false)}>
              Apply Filters
            </button>
          </aside>
        )}

        {/* ---------- Main ---------- */}
        <div className="pl-main">
          <div className="pl-toolbar">
            <label className="pl-search">
              {U.search}
              <input placeholder="Search by product name, SKU or code..." value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
            <Sel label="Category" value={cat} onChange={setCat}
              options={[{ v: "all", t: "All Categories" }, { v: "Furniture", t: "Furniture" }, { v: "Lighting", t: "Lighting" }]} />
            <Sel label="Material" value={mat} onChange={setMat}
              options={[{ v: "all", t: "All Materials" }, ...[...new Set(seed.map((p) => p.material))].map((m) => ({ v: m, t: m }))]} />
            <Sel label="Buyer / Company" value={buyer} onChange={setBuyer}
              options={[{ v: "all", t: "All Buyers" }, { v: "n", t: "Nordic Interiors" }, { v: "u", t: "Urban Living Co." }, { v: "c", t: "Casa Design" }]} />

            <button className={`btn btn-outline pl-morebtn ${showFilters ? "on" : ""}`} onClick={() => setShowFilters(!showFilters)}>
              {U.sliders} More Filters
              {activeFilters > 0 && <i>{activeFilters}</i>}
            </button>

            <div className="pl-toggle">
              <button className={view === "grid" ? "on" : ""} onClick={() => switchView("grid")} aria-label="Grid view">{U.grid}</button>
              <button className={view === "list" ? "on" : ""} onClick={() => switchView("list")} aria-label="List view">{U.list}</button>
            </div>
          </div>

          {/* bulk actions */}
          {selCount > 0 && (
            <div className="pl-bulk">
              <label className="pl-bulk-count">
                <input type="checkbox" checked readOnly /> {selCount} products selected
              </label>
              <button className="pl-b green" onClick={() => bulkStatus("authorized")}>{U.shield} Authorize</button>
              <button className="pl-b" onClick={() => bulkStatus("unauthorized")}>{U.lock} Unauthorized</button>
              <button className="pl-b" onClick={() => bulkStatus("discontinued")}>{U.minusCircle} Discontinue</button>
              <button className="pl-b red" onClick={() => bulkStatus("cancelled")}>{U.xCircle} Cancel</button>
              <div className="pl-b-wrap">
                <button className="pl-b" onClick={() => setStatusMenu(!statusMenu)}>
                  {U.sliders} Change Status {U.chevDown}
                </button>
                {statusMenu && (
                  <div className="pl-menu">
                    {Object.entries(STATUS_LABEL).map(([k, l]) => (
                      <button key={k} onClick={() => bulkStatus(k)}>{l}</button>
                    ))}
                  </div>
                )}
              </div>
              <button className="pl-clear" onClick={() => setSelected(new Set())}>Clear Selection</button>
            </div>
          )}

          {list.length === 0 && (
            <div className="pl-empty card">Koi product nahi mila. Filters change karke dekho.</div>
          )}

          {/* ---------- GRID ---------- */}
          {list.length > 0 && view === "grid" && (
            <div className="pl-grid">
              {list.map((p) => (
                <div key={p.id} className={`pl-card ${selected.has(p.id) ? "sel" : ""}`}>
                  <div className="pl-thumb" style={{ background: p.tint }}>
                    {p.image ? <img src={p.image} alt={p.name} /> : <span className="pl-emoji">{p.emoji}</span>}
                    <label className="pl-chk">
                      <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSel(p.id)} />
                    </label>
                    <span className={`st ${p.status}`}>{STATUS_ICON[p.status]}{STATUS_LABEL[p.status]}</span>
                    <button className="pl-dots" aria-label="More actions">{U.dots}</button>
                  </div>
                  <div className="pl-info">
                    <h4>{p.name}</h4>
                    <div className="pl-sku">{p.id}</div>
                    <div className="pl-cat">{U.folder} {p.category} / {p.type}</div>
                    <div className="pl-price-t">{money(p.price)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---------- LIST ---------- */}
          {list.length > 0 && view === "list" && (
            <div className="pl-table-wrap card">
              <table className="pl-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" checked={allChecked} onChange={toggleAll} /></th>
                    <th>Product</th><th>SKU</th><th>Category</th><th>Material</th>
                    <th>Variants</th><th>Price</th><th>Status</th><th>Updated On</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((p) => (
                    <tr key={p.id} className={selected.has(p.id) ? "sel" : ""}>
                      <td><input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSel(p.id)} /></td>
                      <td><div className="pl-pname"><Thumb p={p} small /><b>{p.name}</b></div></td>
                      <td><span className="pl-skuchip">{p.id}</span></td>
                      <td>{p.category} &gt; {p.type}</td>
                      <td>{p.material}</td>
                      <td>{p.variants}</td>
                      <td className="pl-money">{money(p.price)}</td>
                      <td><span className={`st ${p.status}`}>{STATUS_ICON[p.status]}{STATUS_LABEL[p.status]}</span></td>
                      <td className="pl-date">{p.updated}</td>
                      <td>
                        <div className="pl-rowact">
                          <button aria-label="View">{U.eye}</button>
                          <button aria-label="More">{U.dots}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* pagination */}
          <div className="pl-foot">
            <span>
              Showing 1 – {list.length} of {isFiltered ? list.length : "1,248"} products
            </span>
            <div className="pl-pages">
              <button onClick={() => setPage(Math.max(1, page - 1))} aria-label="Previous page">{U.chevL}</button>
              {[1, 2, 3, 4, 5, "…", 156].map((n, i) =>
                n === "…" ? (
                  <button key={i} disabled>…</button>
                ) : (
                  <button key={i} className={page === n ? "on" : ""} onClick={() => setPage(n)}>{n}</button>
                )
              )}
              <button onClick={() => setPage(Math.min(156, page + 1))} aria-label="Next page">{U.chevR}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
