import type { DashboardData } from "../types/dashboard";

/**
 * Static demo data for Phase 4A. This is intentionally NOT presented to the
 * admin as real production statistics anywhere in the UI (see DashboardPage
 * and StatCard, which label this section clearly as an overview built from
 * demo data). Replace this file's role with a real backend response once
 * ApiDashboardService exists — the shape (DashboardData) does not need to
 * change for that swap to work.
 */
export const dashboardMockData: DashboardData = {
  summary: "Here's what's happening across KaamSetu today.",
  stats: [
    {
      id: "total-jobs",
      label: "Total Jobs",
      value: 1284,
      changeLabel: "+8% this week",
      trend: "up",
    },
    {
      id: "active-technicians",
      label: "Active Technicians",
      value: 96,
      changeLabel: "+4 this week",
      trend: "up",
    },
    {
      id: "completed-jobs",
      label: "Completed Jobs",
      value: 1042,
      changeLabel: "+11% this week",
      trend: "up",
    },
    {
      id: "pending-requests",
      label: "Pending Requests",
      value: 37,
      changeLabel: "-5% this week",
      trend: "down",
    },
  ],
  jobOverview: {
    weeklyRequests: [
      { label: "Mon", count: 42 },
      { label: "Tue", count: 58 },
      { label: "Wed", count: 51 },
      { label: "Thu", count: 66 },
      { label: "Fri", count: 74 },
      { label: "Sat", count: 89 },
      { label: "Sun", count: 60 },
    ],
    statusBreakdown: [
      { status: "Completed", count: 1042 },
      { status: "In Progress", count: 168 },
      { status: "Pending", count: 37 },
      { status: "Cancelled", count: 37 },
    ],
  },
  activity: [
    {
      id: "act-1",
      type: "technician_application",
      description: "Suresh Yadav applied to become a Plumber partner.",
      timeAgo: "12 minutes ago",
    },
    {
      id: "act-2",
      type: "new_request",
      description: "New Electrician request created in Gomti Nagar, Lucknow.",
      timeAgo: "38 minutes ago",
    },
    {
      id: "act-3",
      type: "technician_approved",
      description: "Anil Sharma (Mobile Repair) was approved as a partner.",
      timeAgo: "1 hour ago",
    },
    {
      id: "act-4",
      type: "job_completed",
      description: "AC Repair job in Kanpur marked completed by Vikram Singh.",
      timeAgo: "2 hours ago",
    },
    {
      id: "act-5",
      type: "new_request",
      description: "New Plumber request created in Indira Nagar, Lucknow.",
      timeAgo: "3 hours ago",
    },
  ],
  insights: [
    {
      id: "insight-status",
      label: "System status",
      value: "Operational",
      tone: "positive",
    },
    {
      id: "insight-pending-reviews",
      label: "Technician applications awaiting review",
      value: "6 pending",
      tone: "warning",
    },
    {
      id: "insight-attention",
      label: "Jobs needing attention",
      value: "2 jobs",
      tone: "warning",
    },
    {
      id: "insight-uptime",
      label: "Last data refresh",
      value: "Just now",
      tone: "neutral",
    },
  ],
};
    
