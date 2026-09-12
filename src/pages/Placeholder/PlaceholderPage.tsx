import { PageHeader } from "../../components/layout/PageHeader";
import { EmptyState } from "../../components/common/EmptyState";
import { AlertIcon } from "../../components/common/icons";
import styles from "./PlaceholderPage.module.css";

interface PlaceholderPageProps {
  title: string;
  /** Which upcoming phase will implement this section. */
  phase: "4B" | "4C";
}

export function PlaceholderPage({ title, phase }: PlaceholderPageProps) {
  return (
    <div>
      <PageHeader title={title} />
      <div className={styles.wrapper}>
        <EmptyState
          icon={<AlertIcon size={22} />}
          title={`${title} management is coming in Phase ${phase}`}
          description="This section is intentionally a placeholder in Phase 4A — only the Dashboard is fully implemented so far."
        />
      </div>
    </div>
  );
}
