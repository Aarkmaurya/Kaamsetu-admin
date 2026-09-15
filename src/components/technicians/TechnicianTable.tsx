import type { Technician } from "../../types/technician";
import { ResponsiveTable, type TableColumn } from "../common/ResponsiveTable";
import { StatusBadge } from "../common/StatusBadge";
import { Button } from "../common/Button";
import { technicianStatusPresentation } from "../../utils/statusPresentation";
import styles from "./TechnicianTable.module.css";

interface TechnicianTableProps {
  technicians: Technician[];
  onView: (technician: Technician) => void;
  onApprove: (technician: Technician) => void;
  onReject: (technician: Technician) => void;
  onSuspend: (technician: Technician) => void;
}

export function TechnicianTable({
  technicians,
  onView,
  onApprove,
  onReject,
  onSuspend,
}: TechnicianTableProps) {
  const columns: TableColumn<Technician>[] = [
    {
      key: "name",
      header: "Technician",
      render: (technician) => (
        <div className={styles.nameCell}>
          <span className={styles.avatar} aria-hidden="true">
            {technician.name.charAt(0)}
          </span>
          <div>
            <p className={styles.name}>{technician.name}</p>
            <p className={styles.phone}>{technician.phone}</p>
          </div>
        </div>
      ),
    },
    {
      key: "skills",
      header: "Skills",
      render: (technician) => technician.skills.join(", "),
      hideOnMobile: true,
    },
    {
      key: "area",
      header: "Area",
      render: (technician) => technician.serviceAreas.join(", "),
      hideOnMobile: true,
    },
    {
      key: "rating",
      header: "Rating",
      render: (technician) => (technician.rating > 0 ? `⭐ ${technician.rating.toFixed(1)}` : "—"),
    },
    {
      key: "verified",
      header: "Verified",
      render: (technician) =>
        technician.isVerified ? (
          <StatusBadge label="Verified" tone="info" />
        ) : (
          <StatusBadge label="Not verified" tone="neutral" />
        ),
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Status",
      render: (technician) => {
        const { label, tone } = technicianStatusPresentation(technician.status);
        return <StatusBadge label={label} tone={tone} />;
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (technician) => (
        <div className={styles.actions} onClick={(event) => event.stopPropagation()}>
          <Button variant="ghost" onClick={() => onView(technician)}>
            View
          </Button>
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
        </div>
      ),
    },
  ];

  return (
    <ResponsiveTable
      columns={columns}
      rows={technicians}
      getRowId={(technician) => technician.id}
      onRowClick={onView}
      emptyTitle="No technicians found"
      emptyDescription="Try adjusting your search or filters."
    />
  );
}
