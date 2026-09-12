/**
 * Placeholder for the future real API client (Phase 4B/4C+, once a backend
 * exists). Nothing in Phase 4A calls this — every service currently comes
 * from src/services/mock and talks to no network at all.
 *
 * The intent: when a real backend exists, an ApiDashboardService (etc.) can
 * be built on top of this client and swapped in wherever a Mock*Service is
 * constructed today (see mockDashboardService.ts and mockAuthService.ts),
 * without changing any hook, page, or component.
 *
 * Do not put real base URLs, API keys, or secrets here or anywhere else in
 * this frontend — those must be supplied by a backend-for-frontend or a
 * securely configured deployment environment, never hardcoded in source.
 */
export interface HttpClientConfig {
  baseUrl: string;
}

export class HttpClient {
  constructor(private readonly config: HttpClientConfig) {}

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.config.baseUrl}${path}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`GET ${path} failed with status ${response.status}`);
    }
    return (await response.json()) as T;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.config.baseUrl}${path}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`POST ${path} failed with status ${response.status}`);
    }
    return (await response.json()) as T;
  }
      }
  
