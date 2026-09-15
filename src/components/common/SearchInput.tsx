import type { ChangeEvent } from "react";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ id, label, value, onChange, placeholder }: SearchInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className={styles.field}>
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <input
        id={id}
        type="search"
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder={placeholder ?? label}
      />
    </div>
  );
}
