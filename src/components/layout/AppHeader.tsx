import { MenuIcon } from "../common/icons";
import { useAuth } from "../../features/auth/AuthContext";
import styles from "./AppHeader.module.css";

interface AppHeaderProps {
  onOpenMenu: () => void;
}

export function AppHeader({ onOpenMenu }: AppHeaderProps) {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
      >
        <MenuIcon size={22} />
      </button>

      <div className={styles.mobileBrand}>
        <span className={styles.brandMark}>KS</span>
        <span className={styles.brandName}>KaamSetu Admin</span>
      </div>

      <div className={styles.spacer} />

      <div className={styles.userChip}>
        <span className={styles.userAvatar} aria-hidden="true">
          {user?.name.charAt(0) ?? "A"}
        </span>
        <span className={styles.userName}>{user?.name ?? "Admin"}</span>
      </div>
    </header>
  );
}
