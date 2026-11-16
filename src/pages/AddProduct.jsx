import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { U } from "../components/UiIcons.jsx";
import "../styles/ui.css";
import "./AddProduct.css";

/* ================= small form helpers ================= */
const Field = ({ label, req, note, children, className = "" }) => (
  <label className={`ap-field ${className}`}>
    <span className="ap-lbl">
      {label}
      {req && <em>*</em>}
      {note && <small> {note}</small>}
    </span>
    {children}
  </label>
);

const Sel = ({ icon, value, onChange, options }) => (
  <div className="ap-ctl sel">
    {icon}
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <span className="ap-chev">{U.chevDown}</span>
  </div>
);

const Inp = ({ icon, value, onChange, ...rest }) => (
  <div className="ap-ctl">
    {icon}
    <input value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
  </div>
);

function Chips({ items, onChange, placeholder = "Add...", icon }) {
  const [text, setText] = useState("");
  const add = () => {
    const t = text.trim();
    if (t && !items.includes(t)) onChange([...items, t]);
    setText("");
  };
  return (
    <div className="ap-ctl chips">
      {icon}
      {items.map((t) => (
        <span className="ap-chip" key={t}>
          {t}
          <button type="button" onClick={() => onChange(items.filter((x) => x !== t))} aria-label={`Remove ${t}`}>{U.close}</button>
        </span>
      ))}
      <input
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); add(); }
        }}
        onBlur={add}
      />
    </div>
  );
}

const Check = ({ label, checked, onChange }) => (
  <label className="ap-check">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <span>{label}</span>
  </label>
);

const StepHead = ({ icon, title, sub, children }) => (
  <div className="ap-sechead">
    <span className="ap-secicon">{icon}</span>
    <div>
      <h2>{title}</h2>
      <p>{sub}</p>
    </div>
    {children || <span className="ap-reqnote"><em>*</em> Indicates required field</span>}
  </div>
);

/* ================= options ================= */
const CATEGORIES = ["Furniture", "Lighting", "Decor", "Textiles", "Outdoor", "Kitchen"];
const TYPES = ["Chair", "Bed", "Table", "Sofa", "Storage", "Pendant", "Table Lamp"];
const UOMS = ["Pieces (PCS)", "Set (SET)", "Meter (MTR)", "Kilogram (KG)"];
const SIZE_UNITS = ["Centimetre (CM)", "Inch (IN)", "Millimetre (MM)"];
const BRANDS = ["Modern Living", "Urban Craft", "Heritage Home"];
const MAT_COLLECTIONS = ["Solid Wood", "Engineered Wood", "Metal", "Fabric", "Ceramic"];
const MATERIALS = ["Mango Wood", "Oak Wood", "Teak Wood", "Plywood", "Fabric", "MS (Metal)", "Rattan"];
const FINISHES = ["Natural", "Matte", "Glossy", "Polished"];
const COLORS = ["Natural Wood", "Walnut", "Black", "White"];
const SHAPES = ["Rectangular", "Round", "Square", "Oval"];
const SEASONS = ["All Season", "Summer", "Winter"];
const TECHNIQUES = ["Handcrafted", "Machine Made", "Hand Carved"];
const STYLES = ["Modern", "Classic", "Rustic", "Minimal"];
const BOM_UOMS = ["Kg", "PCS", "MTR", "SET"];
const CARTON_TYPES = ["Master", "Inner", "Dummy"];
const CURRENCIES = ["USD – US Dollar", "EUR – Euro", "GBP – Pound", "INR – Rupee"];
const PRICE_TYPES = ["FOB", "CIF", "EXW", "CNF"];
const SWATCH = { Natural: "#e0c2a2", Walnut: "#8b5a3c", Black: "#111111" };

const steps = [
  { t: "Basic Information", s: "Product identity & dimensions" },
  { t: "Attributes & Production", s: "Material, finish & components" },
  { t: "Variants & Media", s: "Variants, images & documents" },
  { t: "Packing", s: "Carton, weight & container" },
  { t: "Pricing & Review", s: "Commercial details & approval" },
];

/* ================= initial (demo) data ================= */
const initial = {
  // step 1
  category: "Furniture", type: "Chair", code: "PRD-1001", name: "Oak Lounge Chair",
  uom: "Pieces (PCS)", sizeUnit: "Centimetre (CM)",
  desc: "Premium handcrafted solid wood lounge chair with a natural finish, designed for comfort and modern living spaces.",
  buyerSpecific: false, length: 80, width: 75, height: 90,
  brand: "Modern Living", sku: "", tags: ["chair", "lounge", "wood"],
  // step 2
  hsn: "940360", materialCollection: "Solid Wood", primaryMaterial: "Mango Wood",
  finish: "Natural", color: "Natural Wood", shape: "Rectangular",
  season: "All Season", technique: "Handcrafted", style: "Modern",
  props: { stackable: true, indoor: false, foldable: false, outdoor: true, assembled: false, fire: false, kd: true, water: false },
  bom: [
    { id: 1, part: "Main Frame", material: "Mango Wood", spec: "40 × 40 mm", qty: 2.5, uom: "Kg", remarks: "Chair frame structure" },
    { id: 2, part: "Seat Panel", material: "Plywood", spec: "18 mm", qty: 1, uom: "PCS", remarks: "Seat base" },
    { id: 3, part: "Cushion", material: "Fabric", spec: "—", qty: 0.8, uom: "MTR", remarks: "Seat & back cushion" },
    { id: 4, part: "Hardware", material: "MS (Metal)", spec: "Screw, Bracket", qty: 1, uom: "SET", remarks: "Fitting accessories" },
  ],
  // step 3
  hasVariants: true,
  varAttrs: { color: true, size: true, finish: true, material: false },
  varOptions: { color: ["Natural", "Walnut", "Black"], size: ["S", "M", "L"], finish: ["Matte", "Glossy"], material: [] },
  variants: [
    { id: 1, code: "PRD-1001-NT-S", color: "Natural", size: "S", finish: "Matte", price: 320, moq: 10 },
    { id: 2, code: "PRD-1001-NT-M", color: "Natural", size: "M", finish: "Matte", price: 340, moq: 10 },
    { id: 3, code: "PRD-1001-WN-M", color: "Walnut", size: "M", finish: "Matte", price: 360, moq: 10 },
    { id: 4, code: "PRD-1001-WN-L", color: "Walnut", size: "L", finish: "Glossy", price: 380, moq: 10 },
    { id: 5, code: "PRD-1001-BK-M", color: "Black", size: "M", finish: "Matte", price: 350, moq: 10 },
    { id: 6, code: "PRD-1001-BK-L", color: "Black", size: "L", finish: "Glossy", price: 370, moq: 10 },
  ],
  mediaTab: "images",
  media: [
    { id: 1, emoji: "🪑", tint: "linear-gradient(135deg,#f3e3cf,#d9b48a)" },
    { id: 2, emoji: "🪑", tint: "linear-gradient(135deg,#efe6da,#cfc0a8)" },
    { id: 3, emoji: "🪑", tint: "linear-gradient(135deg,#ece3d6,#c6b293)" },
    { id: 4, emoji: "🪑", tint: "linear-gradient(135deg,#e9dccb,#b89b72)" },
  ],
  // step 4
  packStructure: "nested",
  packing: [
    { id: 1, type: "Master", unit: "CM", l: 85, w: 78, h: 92, pcs: 10, wt: 12 },
    { id: 2, type: "Inner", unit: "CM", l: 40, w: 38, h: 30, pcs: 2, wt: 2.4 },
    { id: 3, type: "Dummy", unit: "CM", l: 30, w: 20, h: 15, pcs: 1, wt: 0.7 },
  ],
  packRemarks: "",
  // step 5
  currency: "USD – US Dollar", rate: 83.5, price: 320, moq: 10, priceType: "FOB", lead: 45, validity: 90,
  designer: "Studio Nova", madeBy: "Vyntro Crafts", sizeRange: "S, M, L",
  keywords: ["chair", "lounge", "wooden", "handcrafted"],
  remarks: "Natural wood variation may occur. Custom sizes and finishes available on request.",
  confirm: false,
};

/* ================= calculations ================= */
const num = (v) => Number(v) || 0;
const cbmOf = (l, w, h, unit = "CM") =>
  ((num(l) * num(w) * num(h)) * (unit === "Inch" ? 16.387064 : 1)) / 1e6;
const fmt = (n, d = 2) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

/* ================= STEP 1 ================= */
function Step1({ f, set }) {
  const cbm = cbmOf(f.length, f.width, f.height);
  return (
    <>
      <StepHead icon={U.cube} title="01. Basic Information" sub="Enter the product's identity, category and dimensions." />
      <div className="ap-cols c-main-side">
        <section className="ap-panel">
          <h3>Product Details</h3>
          <div className="ap-grid g2">
            <Field label="Product Category" req><Sel value={f.category} onChange={(v) => set("category", v)} options={CATEGORIES} icon={U.cubeSm} /></Field>
            <Field label="Product Type" req><Sel value={f.type} onChange={(v) => set("type", v)} options={TYPES} icon={U.cubeSm} /></Field>
            <Field label="Alias / Product Code" req><Inp icon={U.barcode} value={f.code} onChange={(v) => set("code", v)} /></Field>
            <Field label="Product Name" req><Inp value={f.name} onChange={(v) => set("name", v)} /></Field>
            <Field label="Product UOM" req><Sel value={f.uom} onChange={(v) => set("uom", v)} options={UOMS} icon={U.cubeSm} /></Field>
            <Field label="Size Unit"><Sel value={f.sizeUnit} onChange={(v) => set("sizeUnit", v)} options={SIZE_UNITS} icon={U.tag} /></Field>
          </div>

          <div className="ap-lbl block">Product Description</div>
          <div className="ap-editor">
            <div className="ap-toolbar">
              <button type="button">{U.bold}</button><button type="button">{U.italic}</button><button type="button">{U.underline}</button>
              <i /><button type="button">{U.listUl}</button><button type="button">{U.listOl}</button><i /><button type="button">{U.link}</button>
            </div>
            <textarea rows={4} maxLength={1000} value={f.desc} onChange={(e) => set("desc", e.target.value)} />
            <small>{f.desc.length} / 1000</small>
          </div>

          <label className="ap-buyer">
            <input type="checkbox" checked={f.buyerSpecific} onChange={(e) => set("buyerSpecific", e.target.checked)} />
            <span>
              <b>Buyer Specific Product</b>
              <small>Enable if this product is intended for a specific buyer only (not for general catalogue).</small>
            </span>
          </label>
        </section>

        <div className="ap-stack">
          <section className="ap-panel">
            <h3>Product Dimensions</h3>
            <div className="ap-dim">
              <span className="ap-dimicon">{U.cube}</span>
              <div className="ap-grid g3">
                <Field label="Length (CM)" req><Inp type="number" value={f.length} onChange={(v) => set("length", v)} /></Field>
                <Field label="Width (CM)" req><Inp type="number" value={f.width} onChange={(v) => set("width", v)} /></Field>
                <Field label="Height (CM)" req><Inp type="number" value={f.height} onChange={(v) => set("height", v)} /></Field>
              </div>
            </div>
            <div className="ap-vol">
              <span className="ap-volicon">{U.calc}</span>
              <div><small>Volume (CBM)</small><b>{cbm.toFixed(3)} m³</b></div>
              <div><small>Volume (CFT)</small><b>{(cbm * 35.3147).toFixed(2)} ft³</b></div>
            </div>
          </section>

          <section className="ap-panel">
            <h3>Additional Information</h3>
            <div className="ap-grid g2">
              <Field label="Brand / Collection"><Sel value={f.brand} onChange={(v) => set("brand", v)} options={BRANDS} icon={U.cubeSm} /></Field>
              <Field label="SKU" note="(Optional)"><Inp icon={U.tag} placeholder="Enter SKU" value={f.sku} onChange={(v) => set("sku", v)} /></Field>
            </div>
            <div className="ap-lbl block">Tags / Keywords</div>
            <Chips items={f.tags} onChange={(v) => set("tags", v)} icon={U.tag} placeholder="Add tag..." />
          </section>
        </div>
      </div>
    </>
  );
}

/* ================= STEP 2 ================= */
function Step2({ f, set }) {
  const setProp = (k, v) => set("props", { ...f.props, [k]: v });
  const setBom = (id, k, v) => set("bom", f.bom.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const propList = [
    ["stackable", "Stackable"], ["indoor", "Indoor Use"], ["foldable", "Foldable"], ["outdoor", "Outdoor Use"],
    ["assembled", "Assembled"], ["fire", "Fire Resistant"], ["kd", "Knock-Down (KD)"], ["water", "Water Resistant"],
  ];
  return (
    <>
      <StepHead icon={U.sliderBig} title="02. Attributes & Production" sub="Define product characteristics, materials and manufacturing details." />
      <div className="ap-cols c-wide-side">
        <section className="ap-panel">
          <h3>Product Attributes</h3>
          <div className="ap-grid g3">
            <Field label="HSN Code"><Inp value={f.hsn} onChange={(v) => set("hsn", v)} /></Field>
            <Field label="Material Collection" req><Sel value={f.materialCollection} onChange={(v) => set("materialCollection", v)} options={MAT_COLLECTIONS} icon={U.cubeSm} /></Field>
            <Field label="Primary Material" req><Sel value={f.primaryMaterial} onChange={(v) => set("primaryMaterial", v)} options={MATERIALS} icon={U.cubeSm} /></Field>
            <Field label="Finish"><Sel value={f.finish} onChange={(v) => set("finish", v)} options={FINISHES} icon={U.pencil} /></Field>
            <Field label="Color"><Sel value={f.color} onChange={(v) => set("color", v)} options={COLORS} icon={U.wand} /></Field>
            <Field label="Shape"><Sel value={f.shape} onChange={(v) => set("shape", v)} options={SHAPES} icon={U.grid} /></Field>
            <Field label="Season"><Sel value={f.season} onChange={(v) => set("season", v)} options={SEASONS} icon={U.calendar} /></Field>
            <Field label="Production Technique"><Sel value={f.technique} onChange={(v) => set("technique", v)} options={TECHNIQUES} icon={U.sliders} /></Field>
            <Field label="Style / Design"><Sel value={f.style} onChange={(v) => set("style", v)} options={STYLES} icon={U.cubeSm} /></Field>
          </div>
        </section>

        <section className="ap-panel">
          <h3>Product Properties</h3>
          <div className="ap-props">
            {propList.map(([k, l]) => (
              <Check key={k} label={l} checked={f.props[k]} onChange={(v) => setProp(k, v)} />
            ))}
          </div>
        </section>
      </div>

      <section className="ap-panel">
        <div className="ap-panel-head">
          <div>
            <h3>Production Components (BOM Basis)</h3>
            <p>Add the main components, materials and consumption required for production.</p>
          </div>
          <button type="button" className="btn btn-outline ap-addbtn"
            onClick={() => set("bom", [...f.bom, { id: Date.now(), part: "", material: MATERIALS[0], spec: "", qty: 1, uom: "PCS", remarks: "" }])}>
            {U.plus} Add Component
          </button>
        </div>
        <div className="ap-scroll">
          <table className="ap-table">
            <thead>
              <tr><th>#</th><th>Component / Part <em>*</em></th><th>Material <em>*</em></th><th>Specification / Size</th><th>Consumption <em>*</em></th><th>UOM <em>*</em></th><th>Remarks</th><th>Action</th></tr>
            </thead>
            <tbody>
              {f.bom.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  <td><input className="ap-cell" value={r.part} onChange={(e) => setBom(r.id, "part", e.target.value)} /></td>
                  <td><select className="ap-cell" value={r.material} onChange={(e) => setBom(r.id, "material", e.target.value)}>{MATERIALS.map((m) => <option key={m}>{m}</option>)}</select></td>
                  <td><input className="ap-cell plain" value={r.spec} onChange={(e) => setBom(r.id, "spec", e.target.value)} /></td>
                  <td><input className="ap-cell" type="number" step="0.01" value={r.qty} onChange={(e) => setBom(r.id, "qty", e.target.value)} /></td>
                  <td><select className="ap-cell" value={r.uom} onChange={(e) => setBom(r.id, "uom", e.target.value)}>{BOM_UOMS.map((m) => <option key={m}>{m}</option>)}</select></td>
                  <td><input className="ap-cell plain" value={r.remarks} onChange={(e) => setBom(r.id, "remarks", e.target.value)} /></td>
                  <td>
                    <div className="ap-acts">
                      <button type="button" className="edit" aria-label="Edit">{U.pencil}</button>
                      <button type="button" className="del" aria-label="Delete" onClick={() => set("bom", f.bom.filter((x) => x.id !== r.id))}>{U.trash}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

/* ================= STEP 3 ================= */
function Step3({ f, set }) {
  const fileRef = useRef(null);
  const attrList = [["color", "Color"], ["size", "Size"], ["finish", "Finish"], ["material", "Material"]];
  const activeAttrs = attrList.filter(([k]) => f.varAttrs[k]);

  const generate = () => {
    const keys = activeAttrs.map(([k]) => k).filter((k) => f.varOptions[k].length);
    if (!keys.length) return;
    let combos = [[]];
    keys.forEach((k) => {
      combos = combos.flatMap((c) => f.varOptions[k].map((o) => [...c, [k, o]]));
    });
    const rows = combos.map((c, i) => {
      const o = Object.fromEntries(c);
      return {
        id: Date.now() + i,
        code: `${f.code}-${c.map(([, v]) => v.slice(0, 2).toUpperCase()).join("-")}`,
        color: o.color || "—", size: o.size || "—", finish: o.finish || "—",
        price: num(f.price) + i * 10, moq: num(f.moq),
      };
    });
    set("variants", rows);
  };

  const addVariant = () =>
    set("variants", [...f.variants, { id: Date.now(), code: `${f.code}-NEW`, color: "—", size: "—", finish: "—", price: num(f.price), moq: num(f.moq) }]);

  const onFiles = (e) => {
    const files = [...(e.target.files || [])];
    set("media", [...f.media, ...files.map((file, i) => ({ id: Date.now() + i, url: URL.createObjectURL(file) }))]);
    e.target.value = "";
  };

  const mediaTabs = [
    ["images", `Images (${f.media.length})`, U.image], ["360", "360° View", U.eye],
    ["video", "Video", U.video], ["docs", "Documents", U.file],
  ];

  return (
    <>
      <StepHead icon={U.imageBig} title="03. Variants & Media" sub="Manage product variations (e.g. size, color, finish) and upload product images & documents." />
      <div className="ap-cols c-side-wide">
        <div className="ap-stack">
          <section className="ap-panel ap-toggle-row">
            <b>Does this product have variants?</b> {U.info}
            <button type="button" className={`ap-switch ${f.hasVariants ? "on" : ""}`} onClick={() => set("hasVariants", !f.hasVariants)} aria-label="Toggle variants"><i /></button>
          </section>

          {f.hasVariants && (
            <>
              <section className="ap-panel">
                <h3>Variant Setup</h3>
                <p className="ap-hint">Select the attributes for variants.</p>
                <div className="ap-props two">
                  {attrList.map(([k, l]) => (
                    <Check key={k} label={l} checked={f.varAttrs[k]} onChange={(v) => set("varAttrs", { ...f.varAttrs, [k]: v })} />
                  ))}
                </div>
              </section>

              <section className="ap-panel">
                <h3>Variant Options</h3>
                {activeAttrs.map(([k, l]) => (
                  <div key={k} className="ap-vopt">
                    <div className="ap-lbl">{l} <em>*</em></div>
                    <Chips items={f.varOptions[k]} onChange={(v) => set("varOptions", { ...f.varOptions, [k]: v })} placeholder="+ Add" />
                  </div>
                ))}
              </section>
            </>
          )}
        </div>

        <div className="ap-stack">
          {f.hasVariants && (
            <section className="ap-panel">
              <div className="ap-panel-head">
                <h3>Variants ({f.variants.length})</h3>
                <div className="ap-row-btns">
                  <button type="button" className="btn btn-outline ap-addbtn" onClick={generate}>{U.wand} Generate Variants</button>
                  <button type="button" className="btn btn-outline ap-addbtn" onClick={addVariant}>{U.plus} Add Variant</button>
                </div>
              </div>
              <div className="ap-scroll">
                <table className="ap-table tight">
                  <thead><tr><th>#</th><th>Variant Code</th><th>Color</th><th>Size</th><th>Finish</th><th>Price (USD)</th><th>MOQ</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {f.variants.map((v, i) => (
                      <tr key={v.id}>
                        <td>{i + 1}</td>
                        <td><b>{v.code}</b></td>
                        <td><span className="ap-sw" style={{ background: SWATCH[v.color] || "#d9d3ea" }} />{v.color}</td>
                        <td>{v.size}</td><td>{v.finish}</td>
                        <td>{fmt(num(v.price))}</td><td>{v.moq}</td>
                        <td><span className="st draft">Draft</span></td>
                        <td>
                          <div className="ap-acts">
                            <button type="button" className="edit">{U.pencil}</button>
                            <button type="button" className="del" onClick={() => set("variants", f.variants.filter((x) => x.id !== v.id))}>{U.trash}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="ap-panel">
            <div className="ap-panel-head">
              <h3>Product Media ({f.media.length})</h3>
              <div className="ap-mtabs">
                {mediaTabs.map(([k, l, ic]) => (
                  <button type="button" key={k} className={f.mediaTab === k ? "on" : ""} onClick={() => set("mediaTab", k)}>{ic} {l}</button>
                ))}
              </div>
            </div>
            {f.mediaTab === "images" ? (
              <div className="ap-media">
                <button type="button" className="ap-drop" onClick={() => fileRef.current?.click()}>
                  {U.cloud}
                  <span>Drag & drop images here<br />or click to browse</span>
                  <small>JPG, PNG, WEBP (Max 10 MB each)</small>
                </button>
                <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={onFiles} />
                {f.media.map((m, i) => (
                  <div key={m.id} className={`ap-img ${i === 0 ? "cover" : ""}`} style={m.url ? undefined : { background: m.tint }}>
                    {m.url ? <img src={m.url} alt="" /> : <span>{m.emoji}</span>}
                    {i === 0 && <em>★ Cover</em>}
                    <button type="button" aria-label="Remove image" onClick={() => set("media", f.media.filter((x) => x.id !== m.id))}>{U.dots}</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ap-emptytab">Is section ka upload abhi baad me banega.</div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

/* ================= STEP 4 ================= */
function Step4({ f, set }) {
  const rows = f.packing;
  const master = rows[0] || { l: 0, w: 0, h: 0, pcs: 1, unit: "CM" };
  const masterCbm = cbmOf(master.l, master.w, master.h, master.unit);
  const perPiece = masterCbm / (num(master.pcs) || 1);
  const caps = [["20 FT", 28], ["40 FT", 58.5], ["40 HQ", 68.5]];

  const upd = (id, k, v) => set("packing", rows.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= rows.length) return;
    const n = [...rows];
    [n[i], n[j]] = [n[j], n[i]];
    set("packing", n);
  };

  return (
    <>
      <div className="ap-cols c-wide-side">
        <div className="ap-stack">
          <div className="ap-sechead no-border">
            <span className="ap-secicon">{U.cube}</span>
            <div>
              <h2>04. Packing Details</h2>
              <p>Define multiple packing levels (Master, Inner, Dummy) with unit, dimensions and carton configuration.</p>
            </div>
            <div className="ap-struct">
              <b>Packing Structure {U.info}</b>
              <label><input type="radio" checked={f.packStructure === "nested"} onChange={() => set("packStructure", "nested")} /> Nested (Master → Inner)</label>
              <label><input type="radio" checked={f.packStructure === "independent"} onChange={() => set("packStructure", "independent")} /> Independent</label>
            </div>
          </div>

          <div className="ap-panel-head">
            <h3>Packing Levels <span className="ap-count">{rows.length}</span></h3>
            <button type="button" className="btn btn-outline ap-addbtn"
              onClick={() => set("packing", [...rows, { id: Date.now(), type: "Inner", unit: "CM", l: 0, w: 0, h: 0, pcs: 1, wt: 0 }])}>
              {U.plus} Add Packing Level {U.chevDown}
            </button>
          </div>

          {rows.map((r, i) => (
            <section className="ap-level" key={r.id}>
              <div className="ap-level-head">
                <span className="ap-lvlicon">{U.cube}</span>
                <b>{i + 1}. {r.type} Carton</b>
                {i === 0 && <span className="ap-primary">Primary</span>}
                <div className="ap-level-acts">
                  <button type="button" onClick={() => move(i, -1)} aria-label="Move up">{U.chevUp}</button>
                  <button type="button" onClick={() => move(i, 1)} aria-label="Move down">{U.chevDown}</button>
                  <button type="button" onClick={() => set("packing", [...rows.slice(0, i + 1), { ...r, id: Date.now() }, ...rows.slice(i + 1)])} aria-label="Duplicate">{U.copy}</button>
                  <button type="button" onClick={() => set("packing", rows.filter((x) => x.id !== r.id))} aria-label="Delete">{U.trash}</button>
                </div>
              </div>
              <div className="ap-level-grid">
                <Field label="Carton Type" req><div className="ap-ctl sel"><select value={r.type} onChange={(e) => upd(r.id, "type", e.target.value)}>{CARTON_TYPES.map((t) => <option key={t}>{t}</option>)}</select><span className="ap-chev">{U.chevDown}</span></div></Field>
                <Field label="Unit" req><div className="ap-ctl sel"><select value={r.unit} onChange={(e) => upd(r.id, "unit", e.target.value)}><option>CM</option><option>Inch</option></select><span className="ap-chev">{U.chevDown}</span></div></Field>
                <Field label="Length" req><Inp type="number" value={r.l} onChange={(v) => upd(r.id, "l", v)} /></Field>
                <Field label="Width" req><Inp type="number" value={r.w} onChange={(v) => upd(r.id, "w", v)} /></Field>
                <Field label="Height" req><Inp type="number" value={r.h} onChange={(v) => upd(r.id, "h", v)} /></Field>
                <Field label="Box Area"><Inp readOnly className="ro" value={fmt(num(r.l) * num(r.w))} onChange={() => {}} /></Field>
                <Field label="PCS/Carton" req><Inp type="number" value={r.pcs} onChange={(v) => upd(r.id, "pcs", v)} /></Field>
                <Field label="CBM/PCS"><Inp readOnly value={(cbmOf(r.l, r.w, r.h, r.unit) / (num(r.pcs) || 1)).toFixed(4)} onChange={() => {}} /></Field>
                <Field label="Box Wt (Kg.)" req><Inp type="number" step="0.01" value={r.wt} onChange={(v) => upd(r.id, "wt", v)} /></Field>
              </div>
            </section>
          ))}
        </div>

        <div className="ap-stack">
          <section className="ap-panel">
            <h3>{U.cubeSm} Calculated Volumes (Total)</h3>
            <div className="ap-vol3">
              <div><small>Carton CBM</small><b>{masterCbm.toFixed(3)} m³</b></div>
              <div><small>CBM per Piece</small><b>{perPiece.toFixed(3)} m³</b></div>
              <div><small>CFT (per Carton)</small><b>{(masterCbm * 35.3147).toFixed(2)} ft³</b></div>
            </div>
          </section>

          <section className="ap-panel">
            <h3>{U.cubeSm} Container Capacity (Estimated)</h3>
            <div className="ap-caps">
              {caps.map(([n, c]) => {
                const cartons = masterCbm > 0 ? Math.floor(c / masterCbm) : 0;
                return (
                  <div key={n}>
                    <b>{n}</b>
                    <span>≈ {cartons} Cartons</span>
                    <small>({(cartons * num(master.pcs)).toLocaleString()} Pieces)</small>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="ap-panel">
            <h3>{U.cubeSm} Calculation Basis</h3>
            <ul className="ap-basis">
              <li>Based on primary (Master) carton dimensions and pieces.</li>
              <li>Inner and Dummy cartons are included in the packing hierarchy.</li>
              <li>Container capacity may vary by loading method and carton mix.</li>
              <li>CBM = L × W × H ÷ 1,000,000 (in metres).</li>
            </ul>
          </section>

          <section className="ap-panel">
            <h3>{U.file} Packing Remarks</h3>
            <div className="ap-editor plain">
              <textarea rows={4} maxLength={500} placeholder="Add packing, labeling or special shipment instructions..." value={f.packRemarks} onChange={(e) => set("packRemarks", e.target.value)} />
              <small>{f.packRemarks.length} / 500</small>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

/* ================= STEP 5 ================= */
function Step5({ f, set }) {
  const master = f.packing[0] || { l: 0, w: 0, h: 0, pcs: 1, wt: 0, unit: "CM" };
  const cbm = cbmOf(master.l, master.w, master.h, master.unit);
  const cap = (c) => (cbm > 0 ? Math.floor(c / cbm) : 0);
  const inr = num(f.price) * num(f.rate);
  const rows = [
    [U.cubeSm, "Material", f.primaryMaterial], [U.cubeSm, "Finish", f.finish],
    [U.wand, "Color", f.variants.length ? [...new Set(f.variants.map((v) => v.color).filter((c) => c !== "—"))].join(", ") || f.color : f.color],
    [U.pencil, "Dimensions (L × W × H)", `${f.length} × ${f.width} × ${f.height} CM`],
    [U.calendar, "Carton Size (L × W × H)", `${master.l} × ${master.w} × ${master.h} ${master.unit.toUpperCase()}`],
    [U.cubeSm, "Gross / Net Weight", `${fmt(num(master.wt))} KG / ${fmt(Math.max(0, num(master.wt) - 1.5))} KG`],
  ];
  const rows2 = [
    [U.cubeSm, "Pieces per Carton", master.pcs], [U.cubeSm, "Carton CBM", `${cbm.toFixed(3)} m³`],
    [U.cubeSm, "Container (20'/40'/40'HQ)", `≈ ${cap(28)} / ${cap(58.5)} / ${cap(68.5)} Ctns`],
    [U.tag, "Sale Price", `USD ${fmt(num(f.price))}`], [U.cubeSm, "MOQ", `${f.moq} PCS`], [U.calendar, "Lead Time", `${f.lead} Days`],
  ];
  const cover = f.media[0];

  return (
    <>
      <div className="ap-cols c-half">
        <div className="ap-stack">
          <div className="ap-sechead no-border">
            <span className="ap-secicon">{U.tagBig}</span>
            <div>
              <h2>05. Pricing & Review</h2>
              <p>Set commercial details and review all information before submission.</p>
            </div>
          </div>

          <section className="ap-panel">
            <h3>{U.coins} Pricing & Commercial Details</h3>
            <div className="ap-grid g4">
              <Field label="Currency" req><Sel value={f.currency} onChange={(v) => set("currency", v)} options={CURRENCIES} /></Field>
              <Field label="Exchange Rate" note="(1 USD = INR)"><Inp type="number" step="0.01" value={f.rate} onChange={(v) => set("rate", v)} /></Field>
              <Field label="Sale Price (USD)" req><Inp icon={<b>$</b>} type="number" value={f.price} onChange={(v) => set("price", v)} /></Field>
              <Field label="Sale Price (INR)"><Inp icon={<b>₹</b>} readOnly className="ro" value={inr.toLocaleString("en-IN", { minimumFractionDigits: 2 })} onChange={() => {}} /></Field>
              <Field label="MOQ" req><Inp type="number" value={f.moq} onChange={(v) => set("moq", v)} /></Field>
              <Field label="Price Type"><Sel value={f.priceType} onChange={(v) => set("priceType", v)} options={PRICE_TYPES} /></Field>
              <Field label="Lead Time (Days)"><Inp icon={U.calendar} type="number" value={f.lead} onChange={(v) => set("lead", v)} /></Field>
              <Field label="Validity (Days)"><Inp icon={U.calendar} type="number" value={f.validity} onChange={(v) => set("validity", v)} /></Field>
            </div>
          </section>

          <section className="ap-panel">
            <h3>{U.file} Commercial & Catalogue Details</h3>
            <div className="ap-grid g3">
              <Field label="Designer"><Inp icon={U.user} value={f.designer} onChange={(v) => set("designer", v)} /></Field>
              <Field label="Made By / Manufacturer"><Inp icon={U.building} value={f.madeBy} onChange={(v) => set("madeBy", v)} /></Field>
              <Field label="Size Range"><Inp icon={U.tag} value={f.sizeRange} onChange={(v) => set("sizeRange", v)} /></Field>
            </div>
            <div className="ap-lbl block">Search Keywords</div>
            <Chips items={f.keywords} onChange={(v) => set("keywords", v)} icon={U.tag} placeholder="Add keyword..." />
          </section>

          <section className="ap-panel">
            <h3>{U.pencil} Product Remarks <small>(Optional)</small></h3>
            <div className="ap-editor plain">
              <textarea rows={3} maxLength={500} value={f.remarks} onChange={(e) => set("remarks", e.target.value)} />
              <small>{f.remarks.length} / 500</small>
            </div>
          </section>
        </div>

        <div className="ap-stack">
          <section className="ap-panel">
            <div className="ap-panel-head">
              <h3>{U.eye} Product Review Summary</h3>
              <span className="ap-ready">Ready for Submission</span>
            </div>
            <div className="ap-review">
              <div className="ap-rimg" style={cover && !cover.url ? { background: cover.tint } : undefined}>
                {cover?.url ? <img src={cover.url} alt="" /> : <span>{cover?.emoji || "🪑"}</span>}
              </div>
              <div>
                <h4>{f.name || "Untitled product"}</h4>
                <span className="ap-codechip">{f.code}</span>
                <div className="ap-tagrow">
                  <span>{f.category}</span><span>{f.type}</span><span>Variants: {f.variants.length}</span>
                </div>
                <p>{f.desc}</p>
              </div>
            </div>
            <div className="ap-rtable">
              <dl>{rows.map(([ic, k, v]) => <div key={k}>{ic}<dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              <dl>{rows2.map(([ic, k, v]) => <div key={k}>{ic}<dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </div>
          </section>

          <section className="ap-panel">
            <h3>{U.flow} Approval Workflow</h3>
            <div className="ap-flow">
              <div className="draft">{U.file}<span><b>Draft</b><small>(Save & Edit)</small></span></div>
              <i>→</i>
              <div className="pending">{U.hourglassBig}<span><b>Pending Approval</b><small>(By Reviewer)</small></span></div>
              <i>→</i>
              <div className="done">{U.shieldBig}<span><b>Authorized</b><small>(Published)</small></span></div>
            </div>
            <label className="ap-confirm">
              <input type="checkbox" checked={f.confirm} onChange={(e) => set("confirm", e.target.checked)} />
              I confirm that all product information is accurate and ready for review.
            </label>
          </section>
        </div>
      </div>
    </>
  );
}

/* ================= PAGE ================= */
export default function AddProduct() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [f, setF] = useState(initial);
  const [toast, setToast] = useState("");

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const goto = (n) => { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(""), 2200); };
  const last = step === steps.length;

  const submit = () => {
    showToast("Product approval ke liye submit ho gaya");
    setTimeout(() => navigate("/products/library"), 1200);
  };

  const Body = [Step1, Step2, Step3, Step4, Step5][step - 1];

  return (
    <div className="pg ap">
      <div className="pg-head">
        <div>
          <div className="pg-crumb">Products {U.chevR} <b>Add Product</b></div>
          <h1>Create New Product</h1>
          <p>Add complete product details to your product library.</p>
        </div>
        <div className="pg-actions">
          <button className="btn btn-outline" onClick={() => showToast("Draft save ho gaya")}>{U.save} Save Draft</button>
          <button className="btn btn-outline" onClick={() => navigate("/products/library")}>{U.close} Cancel</button>
        </div>
      </div>

      {/* stepper */}
      <div className="ap-steps">
        {steps.map((s, i) => {
          const n = i + 1;
          const state = n < step ? "done" : n === step ? "active" : "";
          return (
            <button key={s.t} type="button" className={`ap-step ${state}`} onClick={() => goto(n)}>
              <span className="ap-num">{n < step ? U.check : n}</span>
              <span className="ap-stxt"><b>{s.t}</b><small>{s.s}</small></span>
            </button>
          );
        })}
      </div>

      <div className="ap-card">
        <Body f={f} set={set} />
      </div>

      {/* footer buttons */}
      <div className="ap-foot">
        <button className="btn btn-outline" disabled={step === 1} onClick={() => goto(step - 1)}>{U.arrowL} Previous</button>
        <div className="ap-foot-r">
          <button className="btn btn-outline" onClick={() => showToast("Draft save ho gaya")}>{U.save} Save Draft</button>
          {last ? (
            <button className="btn btn-primary" disabled={!f.confirm} onClick={submit}>{U.send} Submit for Approval</button>
          ) : (
            <button className="btn btn-primary" onClick={() => goto(step + 1)}>Continue {U.arrowR}</button>
          )}
        </div>
      </div>

      {toast && <div className="ap-toast">{toast}</div>}
    </div>
  );
}
