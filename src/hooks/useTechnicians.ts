import { useSyncExternalStore } from "react";
import { technicianRepository } from "../data/repositories/technicianRepository";

export function useTechnicians() {
  const technicians = useSyncExternalStore(
    technicianRepository.subscribe,
    technicianRepository.getSnapshot
  );

  return {
    technicians,
    counts: technicianRepository.getCounts(),
    approve: (id: string) => technicianRepository.approve(id),
    reject: (id: string) => technicianRepository.reject(id),
    suspend: (id: string) => technicianRepository.suspend(id),
  };
}
