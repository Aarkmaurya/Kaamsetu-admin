import type { AdminJob } from "../../types/job";
import { ResponsiveTable, type TableColumn } from "../common/ResponsiveTable";
import { StatusBadge } from "../common/StatusBadge";
import { jobStatusPresentation } from "../../utils/statusPresentation";

interface JobTableProps {
  jobs: AdminJob[];
  onView: (job: AdminJob) => void;
}

export function JobTable({ jobs, onView }: JobTableProps) {
  const columns: TableColumn<AdminJob>[] = [
    {
      key: "id",
      header: "Job ID",
      render: (job) => <span>{job.id}</span>,
    },
    {
      key: "service",
      header: "Service",
      render: (job) => job.serviceName,
    },
    {
      key: "area",
      header: "Approximate Area",
      render: (job) => job.approximateArea,
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Status",
      render: (job) => {
        const { label, tone } = jobStatusPresentation(job.status);
        return <StatusBadge label={label} tone={tone} />;
      },
    },
    {
      key: "requestedDate",
      header: "Requested Date",
      render: (job) => new Date(job.requestedDate).toLocaleDateString("en-IN", { dateStyle: "medium" }),
      hideOnMobile: true,
    },
    {
      key: "technician",
      header: "Assigned Technician",
      render: (job) => job.assignedTechnicianName ?? "Unassigned",
    },
  ];

  return (
    <ResponsiveTable
      columns={columns}
      rows={jobs}
      getRowId={(job) => job.id}
      onRowClick={onView}
      emptyTitle="No jobs match your filters"
      emptyDescription="Try adjusting your search or filters."
    />
  );
}
