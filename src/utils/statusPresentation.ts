import type { BadgeTone } from "../components/common/StatusBadge";
import type { TechnicianStatus } from "../types/technician";
import type { JobStatus } from "../types/job";
import type { ServiceStatus } from "../types/service";

interface StatusPresentation {
  label: string;
  tone: BadgeTone;
}

export function technicianStatusPresentation(status: TechnicianStatus): StatusPresentation {
  switch (status) {
    case "APPROVED":
      return { label: "Approved", tone: "success" };
    case "PENDING":
      return { label: "Pending", tone: "warning" };
    case "REJECTED":
      return { label: "Rejected", tone: "danger" };
    case "SUSPENDED":
      return { label: "Suspended", tone: "danger" };
  }
}

const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  REQUEST_CREATED: "Request Created",
  FINDING_PROFESSIONALS: "Finding Professionals",
  QUOTES_RECEIVED: "Quotes Received",
  TECHNICIAN_SELECTED: "Technician Selected",
  ON_THE_WAY: "On The Way",
  ARRIVED: "Arrived",
  WORK_STARTED: "Work Started",
  WORK_COMPLETED: "Work Completed",
  CANCELLED: "Cancelled",
};

export function jobStatusPresentation(status: JobStatus): StatusPresentation {
  const label = JOB_STATUS_LABELS[status];
  switch (status) {
    case "WORK_COMPLETED":
      return { label, tone: "success" };
    case "CANCELLED":
      return { label, tone: "danger" };
    case "REQUEST_CREATED":
    case "FINDING_PROFESSIONALS":
    case "QUOTES_RECEIVED":
      return { label, tone: "warning" };
    default:
      return { label, tone: "info" };
  }
}

export function serviceStatusPresentation(status: ServiceStatus): StatusPresentation {
  return status === "ACTIVE"
    ? { label: "Active", tone: "success" }
    : { label: "Disabled", tone: "neutral" };
}
