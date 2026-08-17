import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";

/**
 * Guards every /admin/* route except /admin/login. Renders the
 * matched child route via <Outlet /> when authenticated; otherwise
 * bounces to the login page, remembering where the visitor was headed.
 */
export default function RequireAuth() {
  const { isAuthenticated, checking } = useAdminAuth();
  const location = useLocation();

  // AdminAuthContext is still validating a token it found in
  // localStorage — wait rather than flashing the login page on every
  // refresh of an already-signed-in admin.
  if (checking) {
    return <div className="admin-route-checking">Checking session…</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
