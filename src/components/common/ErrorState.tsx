import { AlertIcon } from "./icons";
import styles from "./States.module.css";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title = "Something went wrong", message, onRetry }: ErrorStateProps) {
  return (
    <div className={styles.container} role="alert">
      <span className={`${styles.iconWrap} ${styles.iconDanger}`}>
        <AlertIcon size={22} />
      </span>
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
