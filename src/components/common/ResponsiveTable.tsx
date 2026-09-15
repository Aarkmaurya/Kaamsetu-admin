import type { ReactNode } from "react";
import { EmptyState } from "./EmptyState";
import styles from "./ResponsiveTable.module.css";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  /** Hide this column on narrow screens to reduce clutter (still shown in the mobile card as usual). */
  hideOnMobile?: boolean;
}

interface ResponsiveTableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyTitle: string;
  emptyDescription?: string;
}

export function ResponsiveTable<T>({
  columns,
  rows,
  getRowId,
  onRowClick,
  emptyTitle,
  emptyDescription,
}: ResponsiveTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className={styles.emptyWrap}>
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={column.hideOnMobile ? styles.hideOnMobile : undefined}
                scope="col"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={getRowId(row)}
              className={onRowClick ? styles.clickableRow : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              role={onRowClick ? "button" : undefined}
              onKeyDown={
                onRowClick
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onRowClick(row);
                      }
                    }
                  : undefined
              }
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  data-label={column.header}
                  className={column.hideOnMobile ? styles.hideOnMobile : undefined}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
