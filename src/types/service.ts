export type ServiceStatus = "ACTIVE" | "DISABLED";

export interface AdminService {
  id: string;
  name: string;
  category: string;
  description?: string;
  status: ServiceStatus;
  createdDate: string; // ISO date
}

export interface ServiceFormValues {
  name: string;
  category: string;
  description: string;
}
