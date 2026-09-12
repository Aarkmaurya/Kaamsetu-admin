import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { MobileNavigation } from "./MobileNavigation";
import styles from "./DashboardLayout.module.css";

export function DashboardLayout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <aside className={styles.desktopSidebar}>
        <AppSidebar variant="desktop" />
      </aside>

      <MobileNavigation isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      <div className={styles.content}>
        <AppHeader onOpenMenu={() => setIsMobileNavOpen(true)} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
