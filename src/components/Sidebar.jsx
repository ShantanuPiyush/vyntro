import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ICONS } from "./Icons.jsx";
import { homeItem, menu } from "../config/menu.js";
import "./Sidebar.css";

function Leaf({ item, onClose }) {
  if (item.path) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) => `sb-leaf ${isActive ? "active" : ""}`}
        onClick={onClose}
      >
        {item.label}
      </NavLink>
    );
  }
  // Page abhi nahi bana
  return (
    <button type="button" className="sb-leaf soon" title="Coming soon">
      {item.label}
    </button>
  );
}

function Node({ node, depth, closed, toggle, onClose }) {
  if (!node.children) return <Leaf item={node} onClose={onClose} />;

  const isClosed = closed.has(node.id);
  return (
    <div className={`sb-group d${depth} ${node.accent ? "accent" : ""} ${isClosed ? "closed" : ""}`}>
      <button
        type="button"
        className="sb-group-head"
        onClick={() => toggle(node.id)}
        aria-expanded={!isClosed}
      >
        <span className="sb-icon">{ICONS[node.icon]}</span>
        <span className="sb-label">{node.label}</span>
        <span className="sb-chev">{ICONS.chevUp}</span>
      </button>

      {!isClosed && (
        <div className="sb-children">
          {node.children.map((c) => (
            <Node
              key={c.id || c.label}
              node={c}
              depth={depth + 1}
              closed={closed}
              toggle={toggle}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ open, onClose }) {
  // closed = jin groups ko band kiya gaya hai (shuru me sab khule hain)
  const [closed, setClosed] = useState(new Set());

  const toggle = (id) =>
    setClosed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // Esc dabane par sidebar band
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div className={`sb-backdrop ${open ? "show" : ""}`} onClick={onClose} />

      <aside className={`sb ${open ? "open" : ""}`}>
        <div className="sb-head">
          <div className="sb-logo">B</div>
          <div className="sb-brand">
            <b>BizBridge</b>
            <small>Trade Fair &amp; Sales Platform</small>
          </div>
          <button type="button" className="sb-collapse" onClick={onClose} aria-label="Close menu">
            {ICONS.collapse}
          </button>
        </div>

        <nav className="sb-scroll">
          <NavLink
            to={homeItem.path}
            className={({ isActive }) => `sb-home ${isActive ? "active" : ""}`}
            onClick={onClose}
          >
            <span className="sb-icon">{ICONS[homeItem.icon]}</span>
            {homeItem.label}
          </NavLink>

          {menu.map((m) => (
            <Node key={m.id} node={m} depth={0} closed={closed} toggle={toggle} onClose={onClose} />
          ))}
        </nav>
      </aside>
    </>
  );
}
