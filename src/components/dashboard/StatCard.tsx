import type { DashboardStat } from "../../types/dashboard";
import { ArrowDownIcon, ArrowUpIcon } from "../common/icons";
import { formatNumber } from "../../utils/formatters";
import { BentoCard } from "./BentoCard";
import styles from "./StatCard.module.css";

export function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <BentoCard className={styles.card} aria-label={stat.label}>
      <p className={styles.label}>{stat.label}</p>
      <p className={styles.value}>{formatNumber(stat.value)}</p>
      {stat.changeLabel && (
        <p className={`${styles.change} ${styles[`trend-${stat.trend ?? "flat"}`]}`}>
          {stat.trend === "up" && <ArrowUpIcon size={14} />}
          {stat.trend === "down" && <ArrowDownIcon size={14} />}
          <span>{stat.changeLabel}</span>
        </p>
      )}
    </BentoCard>
  );
}
