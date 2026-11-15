import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { ICONS } from "../components/Icons.jsx";
import "./DashboardLayout.css";

// Abhi static hai, baad me login ke data se aayega
const user = { name: "Vivek Dixit", role: "Administrator", initials: "VD" };

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const searchRef = useRef(null);

  // Ctrl/Cmd + K se search focus
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main">
        <header className="topbar">
          <button className="hd-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            {ICONS.menu}
          </button>

          <div className="hd-search">
            {ICONS.search}
            <input
              ref={searchRef}
              type="text"
              placeholder="Search products, buyers, catalogues, enquiries..."
            />
            <kbd>⌘ K</kbd>
          </div>

          <div className="hd-right">
            <button className="hd-icon hd-help" aria-label="Help">{ICONS.help}</button>
            <button className="hd-icon hd-bell" aria-label="Notifications">
              {ICONS.bell}
              <i className="hd-dot" />
            </button>
            <span className="hd-sep" />

            <div className="hd-user-wrap">
              <button className="hd-user" onClick={() => setUserMenu(!userMenu)}>
                <span className="hd-avatar">{user.initials}</span>
                <span className="hd-user-text">
                  <b>{user.name}</b>
                  <small>{user.role}</small>
                </span>
                <span className="hd-chev">{ICONS.chevDown}</span>
              </button>

              {userMenu && (
                <>
                  <div className="hd-menu-backdrop" onClick={() => setUserMenu(false)} />
                  <div className="hd-dropdown">
                    <button onClick={handleLogout}>{ICONS.logout} Logout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
