import type { City, ServiceAvailabilityEntry } from "../../types/area";

export const areaMockData: City[] = [
  {
    id: "city_sultanpur",
    name: "Sultanpur",
    isActive: true,
    areas: [
      {
        id: "area_lambhua",
        name: "Lambhua",
        isActive: true,
        localities: [
          { id: "loc_lambhua_market", name: "Lambhua Market", isActive: true },
          { id: "loc_lambhua_station_road", name: "Station Road", isActive: true },
        ],
      },
    ],
  },
  {
    id: "city_lucknow",
    name: "Lucknow",
    isActive: true,
    areas: [
      {
        id: "area_gomti_nagar",
        name: "Gomti Nagar",
        isActive: true,
        localities: [
          { id: "loc_gomti_sector4", name: "Sector 4", isActive: true },
          { id: "loc_gomti_vibhuti_khand", name: "Vibhuti Khand", isActive: true },
        ],
      },
      {
        id: "area_indira_nagar",
        name: "Indira Nagar",
        isActive: true,
        localities: [{ id: "loc_indira_sector11", name: "Sector 11", isActive: false }],
      },
    ],
  },
  {
    id: "city_kanpur",
    name: "Kanpur",
    isActive: true,
    areas: [
      {
        id: "area_kanpur_civil_lines",
        name: "Civil Lines",
        isActive: false,
        localities: [],
      },
    ],
  },
];

export const serviceAvailabilityMockData: ServiceAvailabilityEntry[] = [
  { id: "avail_1", serviceName: "Electrician", areaName: "Lambhua, Sultanpur", isAvailable: true },
  { id: "avail_2", serviceName: "Plumber", areaName: "Sultanpur", isAvailable: true },
  { id: "avail_3", serviceName: "AC Repair", areaName: "Kanpur", isAvailable: true },
  { id: "avail_4", serviceName: "Electrician", areaName: "Gomti Nagar, Lucknow", isAvailable: true },
  { id: "avail_5", serviceName: "CCTV Technician", areaName: "Indira Nagar, Lucknow", isAvailable: false },
];
    
