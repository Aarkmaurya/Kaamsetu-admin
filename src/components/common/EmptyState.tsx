import type { ReactNode } from "react";
import styles from "./States.module.css";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      {icon && <span className={`${styles.iconWrap} ${styles.iconNeutral}`}>{icon}</span>}
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.message}>{description}</p>}
    </div>
  );
}

