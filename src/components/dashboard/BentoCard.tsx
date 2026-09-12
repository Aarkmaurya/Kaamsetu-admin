import type { ReactNode } from "react";
import styles from "./BentoCard.module.css";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  /** Adds a subtle lift-on-hover, appropriate for interactive/clickable cards. Off by default. */
  interactive?: boolean;
  as?: "div" | "section";
  "aria-label"?: string;
}

export function BentoCard({
  children,
  className = "",
  interactive = false,
  as = "section",
  ...rest
}: BentoCardProps) {
  const Component = as;
  const classes = [styles.card, interactive ? styles.interactive : ""].filter(Boolean).join(" ");

  return (
    <Component className={`${classes} ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
}
