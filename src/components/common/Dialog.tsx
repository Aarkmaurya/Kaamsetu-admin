import { useEffect, type ReactNode } from "react";
import styles from "./Dialog.module.css";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Dialog({ isOpen, onClose, title, children, footer }: DialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className={styles.header}>
          <h2 id="dialog-title" className={styles.title}>
            {title}
          </h2>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
