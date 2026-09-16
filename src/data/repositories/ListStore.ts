/**
 * Minimal observable store for an in-memory array of records, built on top
 * of React's built-in `useSyncExternalStore` (no external state-management
 * dependency needed). Every Phase 4B repository wraps one of these.
 *
 * BACKEND TODO: a real implementation would replace `items`/`emit` with
 * actual network calls (fetch + refetch, or a cache from a data-fetching
 * library) behind the exact same `subscribe`/`getSnapshot` contract, so
 * hooks and UI would not need to change.
 */
export class ListStore<T> {
  private items: T[];
  private listeners = new Set<() => void>();

  constructor(initialItems: T[]) {
    this.items = initialItems;
  }

  getSnapshot = (): T[] => {
    return this.items;
  };

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private emit() {
    for (const listener of this.listeners) listener();
  }

  set(nextItems: T[]) {
    this.items = nextItems;
    this.emit();
  }

  add(item: T) {
    this.items = [item, ...this.items];
    this.emit();
  }

  update(predicate: (item: T) => boolean, updater: (item: T) => T) {
    this.items = this.items.map((item) => (predicate(item) ? updater(item) : item));
    this.emit();
  }
}
