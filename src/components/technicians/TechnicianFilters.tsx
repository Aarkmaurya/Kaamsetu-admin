import { useMemo } from "react";
import { SearchInput } from "../common/SearchInput";
import { FilterSelect, type FilterOption } from "../common/FilterSelect";
import type { Technician } from "../../types/technician";
import styles from "../common/FilterRow.module.css";

export interface TechnicianFilterState {
  search: string;
  status: string;
  skill: string;
  area: string;
}

const STATUS_OPTIONS: FilterOption[] = [
  { value: "ALL", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "SUSPENDED", label: "Suspended" },
];

interface TechnicianFiltersProps {
  technicians: Technician[];
  filters: TechnicianFilterState;
  onChange: (filters: TechnicianFilterState) => void;
}

export function TechnicianFilters({ technicians, filters, onChange }: TechnicianFiltersProps) {
  const skillOptions = useMemo<FilterOption[]>(() => {
    const skills = new Set<string>();
    technicians.forEach((t) => t.skills.forEach((skill) => skills.add(skill)));
    return [
      { value: "ALL", label: "All skills" },
      ...Array.from(skills)
        .sort()
        .map((skill) => ({ value: skill, label: skill })),
    ];
  }, [technicians]);

  const areaOptions = useMemo<FilterOption[]>(() => {
    const areas = new Set<string>();
    technicians.forEach((t) => t.serviceAreas.forEach((area) => areas.add(area)));
    return [
      { value: "ALL", label: "All areas" },
      ...Array.from(areas)
        .sort()
        .map((area) => ({ value: area, label: area })),
    ];
  }, [technicians]);

  return (
    <div className={styles.row}>
      <SearchInput
        id="technician-search"
        label="Search technicians"
        placeholder="Search by name, skill, or area..."
        value={filters.search}
        onChange={(search) => onChange({ ...filters, search })}
      />
      <FilterSelect
        id="technician-status-filter"
        label="Status"
        value={filters.status}
        options={STATUS_OPTIONS}
        onChange={(status) => onChange({ ...filters, status })}
      />
      <FilterSelect
        id="technician-skill-filter"
        label="Skill"
        value={filters.skill}
        options={skillOptions}
        onChange={(skill) => onChange({ ...filters, skill })}
      />
      <FilterSelect
        id="technician-area-filter"
        label="Area"
        value={filters.area}
        options={areaOptions}
        onChange={(area) => onChange({ ...filters, area })}
      />
    </div>
  );
}
