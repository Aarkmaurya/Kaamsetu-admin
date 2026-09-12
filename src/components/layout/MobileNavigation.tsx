import { useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { CloseIcon } from "../common/icons";
import styles from "./MobileNavigation.module.css";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Off-canvas drawer shown on tablet/mobile widths (see AppHeader's menu
 * button, which toggles `isOpen`). Hidden entirely on desktop via CSS in
 * DashboardLayout.module.css, so this never renders visibly on large screens.
 */
export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  // Prevent background scroll while the drawer is open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={styles.root} data-open={isOpen} aria-hidden={!isOpen}>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
      <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close menu">
          <CloseIcon size={20} />
        </button>
        <AppSidebar variant="drawer" onNavigate={onClose} />
      </div>
    </div>
  );
}
