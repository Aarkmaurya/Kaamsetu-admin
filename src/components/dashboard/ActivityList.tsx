import type { ActivityItem, ActivityType } from "../../types/dashboard";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  JobsIcon,
  UserPlusIcon,
  type IconProps,
} from "../common/icons";
import { BentoCard } from "./BentoCard";
import { EmptyState } from "../common/EmptyState";
import styles from "./ActivityList.module.css";

const ACTIVITY_ICONS: Record<ActivityType, (props: IconProps) => JSX.Element> = {
  technician_application: UserPlusIcon,
  new_request: JobsIcon,
  technician_approved: CheckCircleIcon,
  job_completed: BriefcaseIcon,
};

const ACTIVITY_TONE: Record<ActivityType, string> = {
  technician_application: styles.toneNeutral,
  new_request: styles.tonePrimary,
  technician_approved: styles.toneSuccess,
  job_completed: styles.toneSuccess,
};

export function ActivityList({ items }: { items: ActivityItem[] }) {
  return (
    <BentoCard className={styles.card} aria-label="Recent activity">
      <p className={styles.title}>Recent Activity</p>

      {items.length === 0 ? (
        <EmptyState title="No recent activity" description="New activity will appear here." />
      ) : (
        <ul className={styles.list}>
          {items.map((item) => {
            const Icon = ACTIVITY_ICONS[item.type];
            return (
              <li key={item.id} className={styles.item}>
                <span className={`${styles.iconWrap} ${ACTIVITY_TONE[item.type]}`}>
                  <Icon size={16} />
                </span>
                <div className={styles.textGroup}>
                  <p className={styles.description}>{item.description}</p>
                  <p className={styles.time}>{item.timeAgo}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </BentoCard>
  );
}
