import styles from "./States.module.css";

export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </div>
  );
}
