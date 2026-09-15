import type { ReactNode } from "react";
import styles from "./StatusBadge.module.css";

export type BadgeTone = "success" | "warning" | "danger" | "neutral" | "info";

interface StatusBadgeProps {
  label: string;
  tone: BadgeTone;
  icon?: ReactNode;
}

export function StatusBadge({ label, tone, icon }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[tone]}`}>
      {icon}
      {label}
    </span>
  );
}
