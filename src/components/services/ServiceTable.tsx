import type { AdminService } from "../../types/service";
import { ResponsiveTable, type TableColumn } from "../common/ResponsiveTable";
import { StatusBadge } from "../common/StatusBadge";
import { Button } from "../common/Button";
import { serviceStatusPresentation } from "../../utils/statusPresentation";
import styles from "./ServiceTable.module.css";

interface ServiceTableProps {
  services: AdminService[];
  onEdit: (service: AdminService) => void;
  onToggleStatus: (service: AdminService) => void;
}

export function ServiceTable({ services, onEdit, onToggleStatus }: ServiceTableProps) {
  const columns: TableColumn<AdminService>[] = [
    {
      key: "name",
      header: "Service Name",
      render: (service) => <span className={styles.name}>{service.name}</span>,
    },
    {
      key: "category",
      header: "Category",
      render: (service) => service.category,
    },
    {
      key: "status",
      header: "Status",
      render: (service) => {
        const { label, tone } = serviceStatusPresentation(service.status);
        return <StatusBadge label={label} tone={tone} />;
      },
    },
    {
      key: "createdDate",
      header: "Created",
      render: (service) => new Date(service.createdDate).toLocaleDateString("en-IN", { dateStyle: "medium" }),
      hideOnMobile: true,
    },
    {
      key: "actions",
      header: "Actions",
      render: (service) => (
        <div className={styles.actions}>
          <Button variant="ghost" onClick={() => onEdit(service)}>
            Edit
          </Button>
          <Button
            variant={service.status === "ACTIVE" ? "danger" : "primary"}
            onClick={() => onToggleStatus(service)}
          >
            {service.status === "ACTIVE" ? "Disable" : "Enable"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ResponsiveTable
      columns={columns}
      rows={services}
      getRowId={(service) => service.id}
      emptyTitle="No services found"
      emptyDescription="Try a different search, or add a new service."
    />
  );
}
