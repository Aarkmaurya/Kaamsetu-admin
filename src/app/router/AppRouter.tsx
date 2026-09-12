import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../../features/auth/ProtectedRoute";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { LoginPage } from "../../pages/Login/LoginPage";
import { DashboardPage } from "../../pages/Dashboard/DashboardPage";
import { PlaceholderPage } from "../../pages/Placeholder/PlaceholderPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* ProtectedRoute is frontend MVP scaffolding only — see that file's
            header comment for what a real backend must additionally enforce. */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/technicians"
              element={<PlaceholderPage title="Technicians" phase="4B" />}
            />
            <Route path="/jobs" element={<PlaceholderPage title="Jobs" phase="4B" />} />
            <Route
              path="/services"
              element={<PlaceholderPage title="Services" phase="4B" />}
            />
            <Route path="/areas" element={<PlaceholderPage title="Areas" phase="4B" />} />
            <Route
              path="/complaints"
              element={<PlaceholderPage title="Complaints" phase="4C" />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
          }

