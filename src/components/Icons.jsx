const Ic = ({ children, size = 20, sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

export const ICONS = {
  home: <Ic><path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" /></Ic>,
  box: <Ic><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></Ic>,
  sparkles: <Ic><path d="M9 4l1.6 4.4L15 10l-4.4 1.6L9 16l-1.6-4.4L3 10l4.4-1.6L9 4z" /><path d="M18 3v4M16 5h4M18 15v6M15 18h6" /></Ic>,
  tag: <Ic><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8.5" r="1.3" /></Ic>,
  cart: <Ic><path d="M3 4h2.5l2 11h10l2-8H7" /><circle cx="9" cy="19.5" r="1.5" /><circle cx="17" cy="19.5" r="1.5" /></Ic>,
  users: <Ic><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.3c2.3.7 4 2.6 4 5.7" /></Ic>,
  calendar: <Ic><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Ic>,
  megaphone: <Ic><path d="M3 11v3l12 5V6L3 11z" /><path d="M15 9a3 3 0 0 1 0 6M6 14l1.5 6h3L9 15" /></Ic>,
  chart: <Ic><path d="M5 20v-6M10 20V6M15 20v-9M20 20V9M3 20h18" /></Ic>,
  gear: <Ic><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></Ic>,
  building: <Ic><rect x="4" y="3" width="10" height="18" rx="1" /><path d="M14 9h6v12h-6M8 7h2M8 11h2M8 15h2" /></Ic>,
  folder: <Ic><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" /></Ic>,
  palette: <Ic><path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a4 4 0 0 0 4-4c0-5-4.5-10-9-10z" /><circle cx="8" cy="11" r="1" /><circle cx="12" cy="7.5" r="1" /><circle cx="16" cy="10" r="1" /></Ic>,
  layers: <Ic><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5M3 17.5l9 5 9-5" /></Ic>,
  coins: <Ic><ellipse cx="9" cy="6" rx="6" ry="3" /><path d="M3 6v6c0 1.7 2.7 3 6 3s6-1.3 6-3V6" /><path d="M15 10c3 .2 6 1.3 6 3v5c0 1.7-2.7 3-6 3s-6-1.3-6-3" /></Ic>,
  doc: <Ic><path d="M6 3h9l4 4v14H6V3z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></Ic>,
  plug: <Ic><path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v4" /></Ic>,
  chevUp: <Ic size={18} sw={2.2}><path d="M6 15l6-6 6 6" /></Ic>,
  chevDown: <Ic size={18} sw={2.2}><path d="M6 9l6 6 6-6" /></Ic>,
  collapse: <Ic size={22} sw={2}><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></Ic>,
  search: <Ic size={22}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></Ic>,
  help: <Ic size={24}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01" /></Ic>,
  bell: <Ic size={24}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 0 0 4 0" /></Ic>,
  menu: <Ic size={22}><path d="M4 6h16M4 12h16M4 18h16" /></Ic>,
  logout: <Ic size={18}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Ic>,
};
