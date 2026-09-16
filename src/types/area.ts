export interface Locality {
  id: string;
  name: string;
  isActive: boolean;
}

export interface ServiceArea {
  id: string;
  name: string;
  isActive: boolean;
  localities: Locality[];
}

export interface City {
  id: string;
  name: string;
  isActive: boolean;
  areas: ServiceArea[];
}

/**
 * A lightweight demo of the future "which service is available where"
 * relationship. This is NOT wired to real technician matching — it exists
 * so the data structure and UI concept are in place before Phase 4C/backend
 * work needs to make it real (see areaRepository.ts header comment).
 */
export interface ServiceAvailabilityEntry {
  id: string;
  serviceName: string;
  areaName: string;
  isAvailable: boolean;
}
