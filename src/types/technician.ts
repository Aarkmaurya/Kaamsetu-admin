export type TechnicianStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export interface Technician {
  id: string;
  name: string;
  phone: string;
  email?: string;
  skills: string[];
  serviceAreas: string[];
  rating: number;
  isVerified: boolean;
  status: TechnicianStatus;
  joinDate: string; // ISO date
}

export interface TechnicianCounts {
  total: number;
  pending: number;
  approved: number;
  suspended: number;
}
