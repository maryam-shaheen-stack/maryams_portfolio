import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import "./admin.css";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // RequireAuth (Part 5.4) redirects here with the page the visitor was
  // trying to reach in location.state.from, so we can send them back
  // after a successful login instead of always landing on /admin.
  const redirectTo = location.state?.from || "/admin";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-auth-screen">
      <form className="admin-auth-card" onSubmit={handleSubmit}>
        <span className="admin-eyebrow">Admin</span>
        <h1 className="admin-auth-title">Sign in</h1>

        <label className="admin-field">
          <span>Email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && (
          <p className="admin-auth-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
