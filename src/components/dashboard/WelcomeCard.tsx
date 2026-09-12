import { BentoCard } from "./BentoCard";
import styles from "./WelcomeCard.module.css";

interface WelcomeCardProps {
  adminName: string;
  summary: string;
}

export function WelcomeCard({ adminName, summary }: WelcomeCardProps) {
  return (
    <BentoCard className={styles.card} aria-label="Welcome">
      <p className={styles.eyebrow}>Overview</p>
      <h2 className={styles.title}>Welcome back, {adminName}</h2>
      <p className={styles.summary}>{summary}</p>
    </BentoCard>
  );
}
