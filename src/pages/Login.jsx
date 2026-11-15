import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

/* ---------- chhote icons (inline SVG) ---------- */
const Icon = ({ children, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const UserIcon = () => (
  <Icon>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </Icon>
);
const LockIcon = () => (
  <Icon>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Icon>
);
const EyeIcon = () => (
  <Icon>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
const EyeOffIcon = () => (
  <Icon>
    <path d="M3 3l18 18" />
    <path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4.4-1" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </Icon>
);
const ArrowIcon = () => (
  <Icon>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);
const ShieldIcon = () => (
  <Icon>
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);
const BoxIcon = () => (
  <Icon size={30}>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
  </Icon>
);
const LayersIcon = () => (
  <Icon size={30}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5M3 17.5l9 5 9-5" />
  </Icon>
);
const UsersIcon = () => (
  <Icon size={30}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.3c2.3.7 4 2.6 4 5.7" />
  </Icon>
);
const ChartIcon = () => (
  <Icon size={30}>
    <rect x="4" y="13" width="4" height="7" rx="1" />
    <rect x="10" y="8" width="4" height="12" rx="1" />
    <rect x="16" y="3" width="4" height="17" rx="1" />
  </Icon>
);

const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
    <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);
const MicrosoftLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
    <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
    <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
    <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
  </svg>
);

const Logo = () => (
  <div className="bb-logo">
    <span className="bb-logo-mark">B</span>
    <span className="bb-logo-text">BizBridge</span>
  </div>
);

const features = [
  { icon: <BoxIcon />, label: "Product Management" },
  { icon: <LayersIcon />, label: "Digital Catalogues" },
  { icon: <UsersIcon />, label: "Buyer Collaboration" },
  { icon: <ChartIcon />, label: "Business Insights" },
];

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    // Abhi fake login hai. Baad me yahan API call lagana.
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div className="bb-page">
      {/* ---------- Left: branding ---------- */}
      <section className="bb-left">
        <Logo />

        <div className="bb-hero">
          <span className="bb-tag">B2B TRADE &amp; PRODUCT PLATFORM</span>
          <h1>
            From Products to <span>Global Buyers</span>
          </h1>
          <p>
            Showcase catalogues, manage enquiries, and grow your business
            across trade fairs and global markets.
          </p>
        </div>

        {/* Design wala background image chahiye to .bb-globe ki jagah apni image laga sakte ho */}
        <div className="bb-globe" aria-hidden="true" />

        <div className="bb-features">
          {features.map((f) => (
            <div className="bb-feature" key={f.label}>
              {f.icon}
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Right: form ---------- */}
      <section className="bb-right">
        <form className="bb-form" onSubmit={handleLogin}>
          <h2>
            Welcome to <span>BizBridge</span>
          </h2>
          <p className="bb-sub">Sign in to access your business workspace.</p>

          <label className="bb-label" htmlFor="username">
            Username / Email
          </label>
          <div className="bb-input">
            <UserIcon />
            <input
              id="username"
              type="text"
              placeholder="Enter username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="bb-label-row">
            <label className="bb-label" htmlFor="password">
              Password
            </label>
            <a
              href="#"
              className="bb-link"
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </a>
          </div>
          <div className="bb-input">
            <LockIcon />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="bb-eye"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>

          <label className="bb-check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <button type="submit" className="bb-submit">
            Sign In <ArrowIcon />
          </button>

          <div className="bb-divider">
            <span>or sign in with</span>
          </div>

          <div className="bb-social">
            <button type="button">
              <GoogleLogo /> Continue with Google
            </button>
            <button type="button">
              <MicrosoftLogo /> Continue with Microsoft
            </button>
          </div>

          <p className="bb-secure">
            <ShieldIcon /> Secure • Reliable • Business Focused
          </p>
        </form>
      </section>
    </div>
  );
}
