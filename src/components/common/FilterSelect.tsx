import type { ChangeEvent } from "react";
import styles from "./FilterSelect.module.css";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export function FilterSelect({ id, label, value, options, onChange }: FilterSelectProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select id={id} className={styles.select} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
