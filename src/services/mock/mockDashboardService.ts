import type { DashboardData } from "../../types/dashboard";
import { dashboardMockData } from "../../data/dashboardMockData";

/**
 * Any dashboard data source implements this. A future ApiDashboardService
 * (calling the real backend via HttpClient) implements the exact same
 * interface, so swapping `dashboardService` below for it is a one-line
 * change wherever it's constructed — no page or hook needs to change.
 */
export interface DashboardService {
  getDashboardData(): Promise<DashboardData>;
}

const MOCK_NETWORK_DELAY_MS = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockDashboardService implements DashboardService {
  async getDashboardData(): Promise<DashboardData> {
    // Simulated latency so loading states are actually visible/testable in
    // Phase 4A, the same way they would be against a real API later.
    await delay(MOCK_NETWORK_DELAY_MS);
    return dashboardMockData;
  }
}

export const dashboardService: DashboardService = new MockDashboardService();
