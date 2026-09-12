import { useAuth } from "../../features/auth/AuthContext";
import { useDashboardData } from "../../hooks/useDashboardData";
import { PageHeader } from "../../components/layout/PageHeader";
import { LoadingState } from "../../components/common/LoadingState";
import { ErrorState } from "../../components/common/ErrorState";
import { WelcomeCard } from "../../components/dashboard/WelcomeCard";
import { StatCard } from "../../components/dashboard/StatCard";
import { JobOverviewCard } from "../../components/dashboard/JobOverviewCard";
import { ActivityList } from "../../components/dashboard/ActivityList";
import { SystemStatusCard } from "../../components/dashboard/SystemStatusCard";
import styles from "./DashboardPage.module.css";

export function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useDashboardData();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="An overview built from demo data for Phase 4A — not live production statistics."
      />

      {isLoading && <LoadingState message="Loading dashboard..." />}

      {!isLoading && error && <ErrorState message={error} onRetry={refetch} />}

      {!isLoading && !error && data && (
        <div className={styles.grid}>
          <div className={styles.welcomeArea}>
            <WelcomeCard adminName={user?.name ?? "Admin"} summary={data.summary} />
          </div>

          <div className={styles.statsRow}>
            {data.stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>

          <div className={styles.jobOverviewArea}>
            <JobOverviewCard data={data.jobOverview} />
          </div>

          <div className={styles.activityArea}>
            <ActivityList items={data.activity} />
          </div>

          <div className={styles.insightsArea}>
            <SystemStatusCard insights={data.insights} />
          </div>
        </div>
      )}
    </div>
  );
}
