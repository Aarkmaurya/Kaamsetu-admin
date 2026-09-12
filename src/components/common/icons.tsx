import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function baseProps({ size = 20, ...rest }: IconProps): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...rest,
  };
}

export function DashboardIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

export function TechniciansIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M14.7 6.3a4 4 0 1 1-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 1 5.4-5.4l-3 3-2-2 3-3Z" />
    </svg>
  );
}

export function JobsIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function ServicesIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export function AreasIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ComplaintsIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 3.9 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A9.4 9.4 0 0 1 12 5c6.4 0 10 7 10 7a16.4 16.4 0 0 1-4.2 4.9" />
      <path d="M6.2 6.2C3.6 8 2 12 2 12a16.3 16.3 0 0 0 5 5.6" />
      <path d="M9.5 9.5a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </svg>
  );
}

export function UserPlusIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21v-1a6 6 0 0 1 6-6h2" />
      <path d="M18 9v6" />
      <path d="M15 12h6" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 5-5" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M10.3 3.9 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
