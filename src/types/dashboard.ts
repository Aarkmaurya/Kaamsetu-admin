/**
 * Dashboard types. These describe the SHAPE of dashboard data regardless of
 * where it comes from — today that's src/services/mock/mockDashboardService,
 * later it will be an ApiDashboardService hitting a real backend. UI
 * components only ever depend on these types, never on the mock data files
 * directly, which is what makes that swap possible without touching the UI.
 */

export type TrendDirection = "up" | "down" | "flat";

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  /** e.g. "+12% this week" — presentation-ready, computed by the service layer. */
  changeLabel?: string;
  trend?: TrendDirection;
}

export interface JobStatusBreakdownItem {
  status: string;
  count: number;
}

export interface WeeklyRequestPoint {
  label: string;
  count: number;
}

export interface JobOverviewData {
  weeklyRequests: WeeklyRequestPoint[];
  statusBreakdown: JobStatusBreakdownItem[];
}

export type ActivityType =
  | "technician_application"
  | "new_request"
  | "technician_approved"
  | "job_completed";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  description: string;
  /** Mock relative time text (e.g. "12 minutes ago"), pre-formatted by the service layer. */
  timeAgo: string;
}

export type InsightTone = "positive" | "warning" | "neutral";

export interface SystemInsight {
  id: string;
  label: string;
  value: string;
  tone: InsightTone;
}

export interface DashboardData {
  summary: string;
  stats: DashboardStat[];
  jobOverview: JobOverviewData;
  activity: ActivityItem[];
  insights: SystemInsight[];
}
