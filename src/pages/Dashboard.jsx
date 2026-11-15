import "./Dashboard.css";

/* ---------- icons ---------- */
const Ic = ({ children, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const I = {
  revenue: <Ic size={26}><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></Ic>,
  buyers: <Ic size={26}><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.3c2.3.7 4 2.6 4 5.7" /></Ic>,
  mail: <Ic size={26}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Ic>,
  bag: <Ic size={26}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></Ic>,
  percent: <Ic size={26}><path d="M19 5L5 19" /><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="17" r="2.5" /></Ic>,
  calendar: <Ic><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Ic>,
  download: <Ic><path d="M12 4v11M7 11l5 5 5-5M4 20h16" /></Ic>,
  up: <Ic size={16}><path d="M12 19V5M6 11l6-6 6 6" /></Ic>,
  clock: <Ic size={16}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Ic>,
  clockBig: <Ic size={22}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Ic>,
  layers: <Ic size={22}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></Ic>,
  send: <Ic size={22}><path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z" /></Ic>,
  arrow: <Ic size={16}><path d="M5 12h14M13 6l6 6-6 6" /></Ic>,
  trend: <Ic size={22}><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></Ic>,
  users: <Ic size={14}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></Ic>,
};

/* ---------- data (baad me API se aayega) ---------- */
const kpis = [
  { id: "rev", label: "Total Revenue", value: "$128.5K", icon: I.revenue, color: "#7c3aed", cls: "purple", note: "+12.8% vs last month", up: true, data: [20, 26, 22, 30, 27, 36, 40] },
  { id: "buy", label: "Active Buyers", value: "386", icon: I.buyers, color: "#10b981", cls: "green", note: "+8.4% growth", up: true, data: [18, 22, 20, 28, 25, 34, 38] },
  { id: "enq", label: "Open Enquiries", value: "42", icon: I.mail, color: "#f97316", cls: "orange", note: "12 follow-ups", clock: true, data: [20, 18, 26, 22, 30, 28, 34] },
  { id: "ord", label: "Orders Confirmed", value: "96", icon: I.bag, color: "#2563eb", cls: "blue", note: "+16.2% growth", up: true, data: [16, 22, 19, 26, 24, 32, 36] },
  { id: "con", label: "Conversion Rate", value: "25.0%", icon: I.percent, color: "#ec4899", cls: "pink", note: "+3.2% growth", up: true, data: [20, 24, 22, 28, 26, 33, 36] },
];

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const revenue = [70, 80, 77, 100, 108, 125]; // $K
const orders = [20, 26, 22, 29, 33, 42];

const funnel = [
  { n: 120, label: "Enquiries", w: 100, color: "linear-gradient(#7c4dff,#5b2bd6)" },
  { n: 82, label: "Shortlisted", w: 80, color: "linear-gradient(#a98bff,#8b6cf0)" },
  { n: 54, label: "Quotation", w: 62, color: "linear-gradient(#6aa8ff,#4b8cf5)" },
  { n: 30, label: "Orders", w: 44, color: "linear-gradient(#4fd8c4,#2bb9a5)" },
];

const status = [
  { label: "New", n: 18, pct: "42.9%", color: "#6d3df2" },
  { label: "Replied", n: 12, pct: "28.6%", color: "#2dd4bf" },
  { label: "Follow-up", n: 8, pct: "19.0%", color: "#fbbf24" },
  { label: "Closed", n: 4, pct: "9.5%", color: "#f472b6" },
];

const categories = [
  { label: "Furniture", n: 840, color: "linear-gradient(#a78bfa,#7c3aed)" },
  { label: "Lighting", n: 620, color: "linear-gradient(#60a5fa,#3b82f6)" },
  { label: "Decor", n: 490, color: "linear-gradient(#5eead4,#14b8a6)" },
  { label: "Textiles", n: 310, color: "linear-gradient(#bae6fd,#7dd3fc)" },
];

const regions = [
  { label: "Europe", pct: "42%", color: "#7c3aed" },
  { label: "North America", pct: "24%", color: "#8b5cf6" },
  { label: "Asia", pct: "18%", color: "#a78bfa" },
  { label: "Middle East", pct: "10%", color: "#c4b5fd" },
  { label: "Others", pct: "6%", color: "#ddd6fe" },
];

const recent = [
  { init: "NI", buyer: "Nordic Interiors", product: "Oak Bed", date: "10 Nov 2026", status: "New", cls: "new" },
  { init: "UL", buyer: "Urban Living Co.", product: "Chandelier", date: "09 Nov 2026", status: "Replied", cls: "replied" },
  { init: "CD", buyer: "Casa Design", product: "Sideboard", date: "08 Nov 2026", status: "Follow-up", cls: "followup" },
];

const attention = [
  { icon: I.clockBig, tone: "orange", title: "12 overdue follow-ups", sub: "Buyer responses pending", level: "High" },
  { icon: I.layers, tone: "purple", title: "8 products pending approval", sub: "Awaiting authorization", level: "Medium" },
  { icon: I.send, tone: "green", title: "5 quotations not sent", sub: "Drafts awaiting action", level: "Medium" },
];

/* ---------- helpers ---------- */
function sparkPath(data) {
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * 100,
    32 - ((v - min) / (max - min || 1)) * 26,
  ]);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

function KpiCard({ k }) {
  const line = sparkPath(k.data);
  return (
    <div className={`db-kpi ${k.cls}`}>
      <div className="db-kpi-top" style={{ color: k.color }}>
        {k.icon}
        <span>{k.label}</span>
      </div>
      <div className="db-kpi-mid">
        <strong>{k.value}</strong>
        <svg className="db-spark" viewBox="0 0 100 36" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`g-${k.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={k.color} stopOpacity="0.25" />
              <stop offset="1" stopColor={k.color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${line} L 100 36 L 0 36 Z`} fill={`url(#g-${k.id})`} />
          <path d={line} fill="none" stroke={k.color} strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className={`db-kpi-note ${k.up ? "up" : "warn"}`}>
        {k.up ? I.up : I.clock}
        {k.note}
      </div>
    </div>
  );
}

/* Revenue & Orders chart (pure SVG) */
function TrendChart() {
  const W = 640, H = 270, L = 62, R = 578, T = 18, B = 224;
  const x = (i) => L + 30 + i * ((R - L - 60) / (months.length - 1));
  const yRev = (v) => B - (v / 140) * (B - T);
  const yOrd = (v) => B - (v / 70) * (B - T);
  const revPts = revenue.map((v, i) => [x(i), yRev(v)]);
  const ordPts = orders.map((v, i) => [x(i), yOrd(v)]);
  const line = (p) => p.map((q) => q.join(",")).join(" ");
  const area = (p) => `${line(p)} ${p[p.length - 1][0]},${B} ${p[0][0]},${B}`;
  const leftTicks = [0, 20, 40, 60, 80, 100, 120, 140];
  const rightTicks = [0, 10, 20, 30, 40, 50, 60, 70];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="db-chart" role="img" aria-label="Revenue and orders trend">
      <defs>
        <linearGradient id="areaRev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7c3aed" stopOpacity="0.28" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="areaOrd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.22" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {leftTicks.map((t) => (
        <g key={t}>
          <line x1={L} x2={R} y1={yRev(t)} y2={yRev(t)} stroke="#eceaf5" />
          <text x={L - 8} y={yRev(t) + 4} textAnchor="end" className="db-axis">
            ${t}K
          </text>
        </g>
      ))}
      {rightTicks.map((t) => (
        <text key={t} x={R + 8} y={yOrd(t) + 4} className="db-axis">{t}</text>
      ))}

      <polygon points={area(revPts)} fill="url(#areaRev)" />
      <polygon points={area(ordPts)} fill="url(#areaOrd)" />
      <polyline points={line(revPts)} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      <polyline points={line(ordPts)} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
      {revPts.map(([cx, cy], i) => <circle key={`r${i}`} cx={cx} cy={cy} r="4.5" fill="#fff" stroke="#7c3aed" strokeWidth="2.5" />)}
      {ordPts.map(([cx, cy], i) => <circle key={`o${i}`} cx={cx} cy={cy} r="4.5" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />)}
      {months.map((m, i) => (
        <text key={m} x={x(i)} y={B + 22} textAnchor="middle" className="db-axis">{m}</text>
      ))}
    </svg>
  );
}

/* Enquiry status donut */
function Donut() {
  const total = status.reduce((s, a) => s + a.n, 0);
  const r = 52, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 140 140" className="db-donut">
      <g transform="rotate(-90 70 70)">
        {status.map((s) => {
          const len = (s.n / total) * c;
          const el = (
            <circle key={s.label} cx="70" cy="70" r={r} fill="none" stroke={s.color}
              strokeWidth="20" strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} />
          );
          offset += len;
          return el;
        })}
      </g>
      <text x="70" y="70" textAnchor="middle" className="db-donut-n">{total}</text>
      <text x="70" y="88" textAnchor="middle" className="db-donut-l">Enquiries</text>
    </svg>
  );
}

export default function Dashboard() {
  const maxCat = Math.max(...categories.map((c) => c.n));

  return (
    <div className="db">
      {/* ---------- Header ---------- */}
      <div className="db-head">
        <div>
          <div className="db-crumb">WORKSPACE <span>/</span> OVERVIEW</div>
          <h1>Business Overview</h1>
          <p>Here's what's happening across your business today.</p>
        </div>
        <div className="db-actions">
          <label className="db-select">
            {I.calendar}
            <select defaultValue="30">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </label>
          <button className="db-export">{I.download} Export</button>
        </div>
      </div>

      {/* ---------- KPI cards ---------- */}
      <div className="db-kpis">
        {kpis.map((k) => <KpiCard key={k.id} k={k} />)}
      </div>

      {/* ---------- Row: trend + funnel ---------- */}
      <div className="db-row r-trend">
        <div className="db-card">
          <div className="db-card-head">
            <div>
              <h3>Revenue &amp; Orders Trend</h3>
              <small>Monthly performance for the selected period</small>
            </div>
            <div className="db-legend-inline">
              <span><i style={{ background: "#7c3aed" }} /> Revenue</span>
              <span><i style={{ background: "#3b82f6" }} /> Orders</span>
            </div>
          </div>
          <TrendChart />
        </div>

        <div className="db-card">
          <div className="db-card-head">
            <div>
              <h3>Enquiry Conversion Funnel</h3>
              <small>From enquiry to confirmed order</small>
            </div>
          </div>
          <div className="db-funnel-wrap">
            <div className="db-funnel">
              {funnel.map((f) => (
                <div className="db-funnel-row" key={f.label}>
                  <div className="db-funnel-bar-cell">
                    <div className="db-funnel-bar" style={{ width: `${f.w}%`, background: f.color }}>
                      {I.users}
                    </div>
                  </div>
                  <div className="db-funnel-text"><b>{f.n}</b> {f.label}</div>
                </div>
              ))}
            </div>
            <div className="db-conv">
              {I.trend}
              <strong>25.0%</strong>
              <span>Overall Conversion</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Row: status + categories + regions ---------- */}
      <div className="db-row r-three">
        <div className="db-card">
          <h3>Enquiry Status</h3>
          <div className="db-status">
            <Donut />
            <ul className="db-list">
              {status.map((s) => (
                <li key={s.label}>
                  <i style={{ background: s.color }} />
                  <span>{s.label}</span>
                  <b>{s.n} ({s.pct})</b>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="db-card">
          <h3>Top Product Categories</h3>
          <small>By product views (last 30 days)</small>
          <div className="db-bars">
            {categories.map((c) => (
              <div className="db-bar-col" key={c.label}>
                <b>{c.n}</b>
                <div className="db-bar" style={{ height: `${(c.n / maxCat) * 100}%`, background: c.color }} />
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="db-card">
          <h3>Buyer Regions</h3>
          <div className="db-regions">
            {/* Simple placeholder map. Baad me real map component laga sakte ho */}
            <svg viewBox="0 0 200 100" className="db-map" aria-hidden="true">
              <g fill="#ddd5fb">
                <path d="M15 20 L45 12 L62 22 L55 38 L42 48 L30 40 L18 32 Z" />
                <path d="M48 52 L62 54 L64 72 L54 88 L48 70 Z" />
                <path d="M88 20 L108 16 L112 28 L98 34 L88 30 Z" />
                <path d="M90 38 L112 38 L118 58 L106 78 L94 62 Z" />
                <path d="M112 14 L170 14 L178 36 L150 48 L128 46 L114 32 Z" />
                <path d="M150 66 L172 64 L176 78 L156 80 Z" />
              </g>
              <g fill="#6d28d9">
                <circle cx="35" cy="28" r="2.4" /><circle cx="100" cy="26" r="2.4" />
                <circle cx="140" cy="30" r="2.4" /><circle cx="163" cy="72" r="2.4" />
              </g>
            </svg>
            <ul className="db-list">
              {regions.map((r) => (
                <li key={r.label}>
                  <i style={{ background: r.color }} />
                  <span>{r.label}</span>
                  <b>{r.pct}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- Row: recent + attention ---------- */}
      <div className="db-row r-bottom">
        <div className="db-card">
          <div className="db-card-head">
            <h3>Recent Enquiries</h3>
            <a href="#" className="db-viewall" onClick={(e) => e.preventDefault()}>
              View all enquiries {I.arrow}
            </a>
          </div>
          <div className="db-table-wrap">
            <table className="db-table">
              <thead>
                <tr><th>BUYER</th><th>PRODUCT</th><th>ENQUIRY DATE</th><th>STATUS</th></tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.buyer}>
                    <td><span className="db-av">{r.init}</span><b>{r.buyer}</b></td>
                    <td>{r.product}</td>
                    <td>{r.date}</td>
                    <td><span className={`db-pill ${r.cls}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="db-card">
          <h3>Needs Attention</h3>
          <div className="db-attn">
            {attention.map((a) => (
              <div className="db-attn-row" key={a.title}>
                <span className={`db-attn-ic ${a.tone}`}>{a.icon}</span>
                <div className="db-attn-text">
                  <b>{a.title}</b>
                  <small>{a.sub}</small>
                </div>
                <span className={`db-level ${a.level.toLowerCase()}`}>{a.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
