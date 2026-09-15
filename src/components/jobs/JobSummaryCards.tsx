import type { JobCounts } from "../../types/job";
import type { DashboardStat } from "../../types/dashboard";
import { StatCard } from "../dashboard/StatCard";
import styles from "../common/SummaryGrid.module.css";

export function JobSummaryCards({ counts }: { counts: JobCounts }) {
  const stats: DashboardStat[] = [
    { id: "total", label: "Total Jobs", value: counts.total },
    { id: "active", label: "Active Jobs", value: counts.active },
    { id: "pending", label: "Pending Requests", value: counts.pending },
    { id: "completed", label: "Completed Jobs", value: counts.completed },
    { id: "cancelled", label: "Cancelled Jobs", value: counts.cancelled },
  ];

  return (
    <div className={styles.grid}>
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
