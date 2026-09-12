import type { JobOverviewData } from "../../types/dashboard";
import { BentoCard } from "./BentoCard";
import styles from "./JobOverviewCard.module.css";

export function JobOverviewCard({ data }: { data: JobOverviewData }) {
  const maxCount = Math.max(...data.weeklyRequests.map((point) => point.count), 1);

  return (
    <BentoCard className={styles.card} aria-label="Job overview">
      <div className={styles.headerRow}>
        <div>
          <p className={styles.eyebrow}>Job Overview</p>
          <h3 className={styles.title}>Requests this week</h3>
        </div>
      </div>

      <div
        className={styles.chart}
        role="img"
        aria-label={`Weekly requests: ${data.weeklyRequests
          .map((point) => `${point.label} ${point.count}`)
          .join(", ")}`}
      >
        {data.weeklyRequests.map((point) => (
          <div className={styles.barColumn} key={point.label}>
            <span className={styles.barValue} aria-hidden="true">
              {point.count}
            </span>
            <div className={styles.barTrack}>
              <div
                className={styles.bar}
                style={{ height: `${(point.count / maxCount) * 100}%` }}
              />
            </div>
            <span className={styles.barLabel} aria-hidden="true">
              {point.label}
            </span>
          </div>
        ))}
      </div>

      <ul className={styles.breakdown} aria-label="Job status breakdown">
        {data.statusBreakdown.map((item) => (
          <li key={item.status} className={styles.breakdownItem}>
            <span className={styles.breakdownDot} data-status={item.status.toLowerCase().replace(" ", "-")} />
            <span className={styles.breakdownLabel}>{item.status}</span>
            <span className={styles.breakdownValue}>{item.count}</span>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
