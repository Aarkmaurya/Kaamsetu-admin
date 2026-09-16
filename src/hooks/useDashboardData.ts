import { useEffect, useState } from "react";
import type { DashboardData } from "../types/dashboard";
import { dashboardService } from "../services/mock/mockDashboardService";

interface UseDashboardDataResult {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * This hook is the ONLY place DashboardPage touches data-fetching. It talks
 * to `dashboardService` (see services/mock/mockDashboardService.ts) purely
 * through the DashboardService interface — swapping in a real
 * ApiDashboardService later means changing that one import, not this hook
 * or the page that consumes it.
 */
export function useDashboardData(): UseDashboardDataResult {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    dashboardService
      .getDashboardData()
      .then((result) => {
        if (!cancelled) {
          setData(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Unable to load dashboard data. Please try again.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  return {
    data,
    isLoading,
    error,
    refetch: () => setReloadToken((token) => token + 1),
  };
      }
