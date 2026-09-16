import { useSyncExternalStore } from "react";
import { serviceRepository } from "../data/repositories/serviceRepository";
import type { ServiceFormValues, ServiceStatus } from "../types/service";

export function useServices() {
  const services = useSyncExternalStore(serviceRepository.subscribe, serviceRepository.getSnapshot);

  return {
    services,
    addService: (values: ServiceFormValues) => serviceRepository.add(values),
    updateService: (id: string, values: ServiceFormValues) => serviceRepository.update(id, values),
    setStatus: (id: string, status: ServiceStatus) => serviceRepository.setStatus(id, status),
  };
}
