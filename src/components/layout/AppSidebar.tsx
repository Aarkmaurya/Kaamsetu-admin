import { NavLink } from "react-router-dom";
import {
  AreasIcon,
  ComplaintsIcon,
  DashboardIcon,
  JobsIcon,
  LogoutIcon,
  ServicesIcon,
  TechniciansIcon,
} from "../common/icons";
import { useAuth } from "../../features/auth/AuthContext";
import styles from "./AppSidebar.module.css";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { to: "/technicians", label: "Technicians", icon: TechniciansIcon },
  { to: "/jobs", label: "Jobs", icon: JobsIcon },
  { to: "/services", label: "Services", icon: ServicesIcon },
  { to: "/areas", label: "Areas", icon: AreasIcon },
  { to: "/complaints", label: "Complaints", icon: ComplaintsIcon },
] as const;

interface AppSidebarProps {
  /** "drawer" adds nothing visually different today, but lets callers close the
   *  mobile drawer on navigation via onNavigate without affecting the desktop sidebar. */
  variant?: "desktop" | "drawer";
  onNavigate?: () => void;
}

export function AppSidebar({ variant = "desktop", onNavigate }: AppSidebarProps) {
  const { user, logout } = useAuth();

  return (
    <div className={styles.sidebar} data-variant={variant}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>KS</span>
        <div>
          <p className={styles.brandName}>KaamSetu</p>
          <p className={styles.brandSubtitle}>Admin</p>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Admin navigation">
        <ul className={styles.navList}>
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                }
              >
                <Icon size={19} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.userRow}>
          <span className={styles.userAvatar} aria-hidden="true">
            {user?.name.charAt(0) ?? "A"}
          </span>
          <div>
            <p className={styles.userName}>{user?.name ?? "Admin"}</p>
            <p className={styles.userEmail}>{user?.email ?? ""}</p>
          </div>
        </div>
        <button type="button" className={styles.logoutButton} onClick={() => void logout()}>
          <LogoutIcon size={18} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
