import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 40 }}>
      <h1>404 - Page not found</h1>
      <Link to="/dashboard">Dashboard par jao</Link>
    </div>
  );
}
