import type { AdminService, ServiceFormValues, ServiceStatus } from "../../types/service";
import { serviceMockData } from "../mock/serviceMockData";
import { ListStore } from "./ListStore";

class ServiceRepository {
  private store = new ListStore<AdminService>(serviceMockData);
  private nextId = serviceMockData.length + 1;

  subscribe = this.store.subscribe;
  getSnapshot = this.store.getSnapshot;

  add(values: ServiceFormValues) {
    const service: AdminService = {
      id: `svc_custom_${this.nextId++}`,
      name: values.name.trim(),
      category: values.category.trim() || "Other",
      description: values.description.trim() || undefined,
      status: "ACTIVE",
      createdDate: new Date().toISOString().slice(0, 10),
    };
    this.store.add(service);
  }

  update(id: string, values: ServiceFormValues) {
    this.store.update(
      (service) => service.id === id,
      (service) => ({
        ...service,
        name: values.name.trim(),
        category: values.category.trim() || "Other",
        description: values.description.trim() || undefined,
      })
    );
  }

  setStatus(id: string, status: ServiceStatus) {
    this.store.update(
      (service) => service.id === id,
      (service) => ({ ...service, status })
    );
  }
}

export const serviceRepository = new ServiceRepository();
