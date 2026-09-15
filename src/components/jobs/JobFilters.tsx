import { useMemo } from "react";
import { SearchInput } from "../common/SearchInput";
import { FilterSelect, type FilterOption } from "../common/FilterSelect";
import type { AdminJob } from "../../types/job";
import { jobStatusPresentation } from "../../utils/statusPresentation";
import styles from "../common/FilterRow.module.css";

export interface JobFilterState {
  search: string;
  status: string;
  service: string;
  area: string;
}

interface JobFiltersProps {
  jobs: AdminJob[];
  filters: JobFilterState;
  onChange: (filters: JobFilterState) => void;
}

const ALL_STATUSES: AdminJob["status"][] = [
  "REQUEST_CREATED",
  "FINDING_PROFESSIONALS",
  "QUOTES_RECEIVED",
  "TECHNICIAN_SELECTED",
  "ON_THE_WAY",
  "ARRIVED",
  "WORK_STARTED",
  "WORK_COMPLETED",
  "CANCELLED",
];

export function JobFilters({ jobs, filters, onChange }: JobFiltersProps) {
  const statusOptions: FilterOption[] = useMemo(
    () => [
      { value: "ALL", label: "All statuses" },
      ...ALL_STATUSES.map((status) => ({
        value: status,
        label: jobStatusPresentation(status).label,
      })),
    ],
    []
  );

  const serviceOptions = useMemo<FilterOption[]>(() => {
    const services = new Set(jobs.map((job) => job.serviceName));
    return [
      { value: "ALL", label: "All services" },
      ...Array.from(services)
        .sort()
        .map((service) => ({ value: service, label: service })),
    ];
  }, [jobs]);

  const areaOptions = useMemo<FilterOption[]>(() => {
    const areas = new Set(jobs.map((job) => job.approximateArea));
    return [
      { value: "ALL", label: "All areas" },
      ...Array.from(areas)
        .sort()
        .map((area) => ({ value: area, label: area })),
    ];
  }, [jobs]);

  return (
    <div className={styles.row}>
      <SearchInput
        id="job-search"
        label="Search jobs"
        placeholder="Search by job ID, service, area, or technician..."
        value={filters.search}
        onChange={(search) => onChange({ ...filters, search })}
      />
      <FilterSelect
        id="job-status-filter"
        label="Status"
        value={filters.status}
        options={statusOptions}
        onChange={(status) => onChange({ ...filters, status })}
      />
      <FilterSelect
        id="job-service-filter"
        label="Service"
        value={filters.service}
        options={serviceOptions}
        onChange={(service) => onChange({ ...filters, service })}
      />
      <FilterSelect
        id="job-area-filter"
        label="Area"
        value={filters.area}
        options={areaOptions}
        onChange={(area) => onChange({ ...filters, area })}
      />
    </div>
  );
}
