import type { TechnicianCounts } from "../../types/technician";
import type { DashboardStat } from "../../types/dashboard";
import { StatCard } from "../dashboard/StatCard";
import styles from "../common/SummaryGrid.module.css";

export function TechnicianSummaryCards({ counts }: { counts: TechnicianCounts }) {
  const stats: DashboardStat[] = [
    { id: "total", label: "Total Technicians", value: counts.total },
    { id: "pending", label: "Pending Verification", value: counts.pending },
    { id: "approved", label: "Approved Technicians", value: counts.approved },
    { id: "suspended", label: "Suspended Technicians", value: counts.suspended },
  ];

  return (
    <div className={styles.grid}>
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
