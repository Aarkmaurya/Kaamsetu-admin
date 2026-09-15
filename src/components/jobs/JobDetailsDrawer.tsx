import type { AdminJob } from "../../types/job";
import { Drawer } from "../common/Drawer";
import { StatusBadge } from "../common/StatusBadge";
import { jobStatusPresentation } from "../../utils/statusPresentation";
import styles from "../technicians/TechnicianDetailsDrawer.module.css";
import ownStyles from "./JobDetailsDrawer.module.css";

interface JobDetailsDrawerProps {
  job: AdminJob | null;
  onClose: () => void;
}

export function JobDetailsDrawer({ job, onClose }: JobDetailsDrawerProps) {
  if (!job) return null;

  const { label, tone } = jobStatusPresentation(job.status);

  return (
    <Drawer isOpen={Boolean(job)} onClose={onClose} title={`Job ${job.id}`}>
      <div className={styles.statusRow}>
        <StatusBadge label={label} tone={tone} />
      </div>

      <dl className={styles.detailList}>
        <div className={styles.detailRow}>
          <dt>Requested service</dt>
          <dd>{job.serviceName}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Problem description</dt>
          <dd>{job.problemDescription}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Approximate area</dt>
          <dd>{job.approximateArea}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Preferred time</dt>
          <dd>{job.preferredTime}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Assigned technician</dt>
          <dd>{job.assignedTechnicianName ?? "Not yet assigned"}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Requested date</dt>
          <dd>{new Date(job.requestedDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}</dd>
        </div>
      </dl>

      <p className={ownStyles.privacyNote}>
        Customer phone number and exact address are private and are intentionally not shown here —
        this admin view only ever has access to the fields listed above.
      </p>
    </Drawer>
  );
}
