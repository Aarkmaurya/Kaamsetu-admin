export type JobStatus =
  | "REQUEST_CREATED"
  | "FINDING_PROFESSIONALS"
  | "QUOTES_RECEIVED"
  | "TECHNICIAN_SELECTED"
  | "ON_THE_WAY"
  | "ARRIVED"
  | "WORK_STARTED"
  | "WORK_COMPLETED"
  | "CANCELLED";

export interface AdminJob {
  id: string;
  serviceName: string;
  problemDescription: string;
  approximateArea: string;
  preferredTime: string;
  status: JobStatus;
  requestedDate: string; // ISO date
  assignedTechnicianName: string | null;
  /**
   * Intentionally omitted from this type: customer phone number and exact
   * address. The admin mock dataset does not carry them at all, so there is
   * no private field to accidentally render anywhere in this module — see
   * JobDetailsDrawer, which only ever reads fields defined here.
   */
}

export interface JobCounts {
  total: number;
  active: number;
  pending: number;
  completed: number;
  cancelled: number;
}
