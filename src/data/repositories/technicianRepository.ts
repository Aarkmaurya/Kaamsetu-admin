import type { Technician, TechnicianCounts, TechnicianStatus } from "../../types/technician";
import { technicianMockData } from "../mock/technicianMockData";
import { ListStore } from "./ListStore";

/**
 * BACKEND TODO: every mutation here (approve/reject/suspend) currently only
 * updates an in-memory array. A production admin panel MUST perform these
 * as authenticated, authorized backend API calls — the backend must
 * independently verify the admin's permissions before changing a
 * technician's status. Nothing client-side here is a real authorization
 * boundary.
 */
class TechnicianRepository {
  private store = new ListStore<Technician>(technicianMockData);

  subscribe = this.store.subscribe;
  getSnapshot = this.store.getSnapshot;

  findById(id: string): Technician | undefined {
    return this.store.getSnapshot().find((technician) => technician.id === id);
  }

  getCounts(): TechnicianCounts {
    const all = this.store.getSnapshot();
    return {
      total: all.length,
      pending: all.filter((t) => t.status === "PENDING").length,
      approved: all.filter((t) => t.status === "APPROVED").length,
      suspended: all.filter((t) => t.status === "SUSPENDED").length,
    };
  }

  private setStatus(id: string, status: TechnicianStatus) {
    this.store.update(
      (technician) => technician.id === id,
      (technician) => ({ ...technician, status })
    );
  }

  approve(id: string) {
    this.setStatus(id, "APPROVED");
  }

  reject(id: string) {
    this.setStatus(id, "REJECTED");
  }

  suspend(id: string) {
    this.setStatus(id, "SUSPENDED");
  }
}

export const technicianRepository = new TechnicianRepository();
