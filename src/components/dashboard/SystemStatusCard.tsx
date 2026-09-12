import type { InsightTone, SystemInsight } from "../../types/dashboard";
import { BentoCard } from "./BentoCard";
import styles from "./SystemStatusCard.module.css";

const TONE_CLASS: Record<InsightTone, string> = {
  positive: styles.tonePositive,
  warning: styles.toneWarning,
  neutral: styles.toneNeutral,
};

export function SystemStatusCard({ insights }: { insights: SystemInsight[] }) {
  return (
    <BentoCard className={styles.card} aria-label="System status and quick insights">
      <p className={styles.title}>System Status &amp; Quick Insights</p>
      <ul className={styles.list}>
        {insights.map((insight) => (
          <li key={insight.id} className={styles.item}>
            <span className={styles.label}>{insight.label}</span>
            <span className={`${styles.badge} ${TONE_CLASS[insight.tone]}`}>{insight.value}</span>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
