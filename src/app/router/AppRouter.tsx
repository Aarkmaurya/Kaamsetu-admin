import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../../features/auth/ProtectedRoute";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { LoginPage } from "../../pages/Login/LoginPage";
import { DashboardPage } from "../../pages/Dashboard/DashboardPage";
import { PlaceholderPage } from "../../pages/Placeholder/PlaceholderPage";
import { TechniciansPage } from "../../pages/Technicians/TechniciansPage";
import { JobsPage } from "../../pages/Jobs/JobsPage";
import { ServicesPage } from "../../pages/Services/ServicesPage";
import { AreasPage } from "../../pages/Areas/AreasPage";

export function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* ProtectedRoute is frontend MVP scaffolding only — see that file's
            header comment for what a real backend must additionally enforce. */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/technicians" element={<TechniciansPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/areas" element={<AreasPage />} />
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

