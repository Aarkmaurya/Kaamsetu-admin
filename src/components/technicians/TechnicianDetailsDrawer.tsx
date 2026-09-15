import type { Technician } from "../../types/technician";
import { Drawer } from "../common/Drawer";
import { StatusBadge } from "../common/StatusBadge";
import { Button } from "../common/Button";
import { technicianStatusPresentation } from "../../utils/statusPresentation";
import styles from "./TechnicianDetailsDrawer.module.css";

interface TechnicianDetailsDrawerProps {
  technician: Technician | null;
  onClose: () => void;
  onApprove: (technician: Technician) => void;
  onReject: (technician: Technician) => void;
  onSuspend: (technician: Technician) => void;
}

export function TechnicianDetailsDrawer({
  technician,
  onClose,
  onApprove,
  onReject,
  onSuspend,
}: TechnicianDetailsDrawerProps) {
  if (!technician) return null;

  const { label, tone } = technicianStatusPresentation(technician.status);

  return (
    <Drawer
      isOpen={Boolean(technician)}
      onClose={onClose}
      title={technician.name}
      footer={
        <>
          {technician.status === "PENDING" && (
            <>
              <Button variant="primary" onClick={() => onApprove(technician)}>
                Approve
              </Button>
              <Button variant="danger" onClick={() => onReject(technician)}>
                Reject
              </Button>
            </>
          )}
          {technician.status === "APPROVED" && (
            <Button variant="danger" onClick={() => onSuspend(technician)}>
              Suspend
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      <div className={styles.statusRow}>
        <StatusBadge label={label} tone={tone} />
        {technician.isVerified ? (
          <StatusBadge label="Verified" tone="info" />
        ) : (
          <StatusBadge label="Not verified" tone="neutral" />
        )}
      </div>

      <dl className={styles.detailList}>
        <div className={styles.detailRow}>
          <dt>Phone</dt>
          <dd>{technician.phone}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Email</dt>
          <dd>{technician.email ?? "—"}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Skills</dt>
          <dd>{technician.skills.join(", ")}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Service areas</dt>
          <dd>{technician.serviceAreas.join(", ")}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Rating</dt>
          <dd>{technician.rating > 0 ? `⭐ ${technician.rating.toFixed(1)}` : "No ratings yet"}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Joined</dt>
          <dd>{new Date(technician.joinDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}</dd>
        </div>
      </dl>
    </Drawer>
  );
}
