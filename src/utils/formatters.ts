/** Formats a count with thousands separators, e.g. 1284 -> "1,284". */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

