import type { AdminJob, JobCounts } from "../../types/job";
import { jobMockData } from "../mock/jobMockData";
import { ListStore } from "./ListStore";

const ACTIVE_STATUSES: AdminJob["status"][] = [
  "FINDING_PROFESSIONALS",
  "QUOTES_RECEIVED",
  "TECHNICIAN_SELECTED",
  "ON_THE_WAY",
  "ARRIVED",
  "WORK_STARTED",
];

class JobRepository {
  private store = new ListStore<AdminJob>(jobMockData);

  subscribe = this.store.subscribe;
  getSnapshot = this.store.getSnapshot;

  findById(id: string): AdminJob | undefined {
    return this.store.getSnapshot().find((job) => job.id === id);
  }

  getCounts(): JobCounts {
    const all = this.store.getSnapshot();
    return {
      total: all.length,
      active: all.filter((job) => ACTIVE_STATUSES.includes(job.status)).length,
      pending: all.filter((job) => job.status === "REQUEST_CREATED").length,
      completed: all.filter((job) => job.status === "WORK_COMPLETED").length,
      cancelled: all.filter((job) => job.status === "CANCELLED").length,
    };
  }
}

export const jobRepository = new JobRepository();
