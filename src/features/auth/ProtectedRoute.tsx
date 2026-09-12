import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { LoadingState } from "../../components/common/LoadingState";

/**
 * Frontend route protection ONLY. This stops the mock UI from rendering
 * dashboard screens when nobody is "logged in" during the demo — it does
 * NOT protect any real data, because there is no real data or backend yet.
 *
 * BACKEND TODO: once real APIs exist, every one of those endpoints must
 * independently verify the admin's session and role server-side. A route
 * guard like this can improve UX (avoid flashing a page you'll be bounced
 * from) but must never be relied on as the actual authorization check.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingState message="Checking session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
