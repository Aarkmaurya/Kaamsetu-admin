import type { AdminUser, LoginCredentials } from "../../types/auth";

/**
 * MOCK AUTHENTICATION — Phase 4A frontend scaffolding only.
 *
 * This is NOT real authentication:
 * - There is no backend, no password hashing, no real session token.
 * - The "credential" below is a publicly-documented DEMO login for trying
 *   the UI, not a real account. It is intentionally not a secret.
 * - The "session" is just a JSON blob in sessionStorage, trivially readable
 *   and editable from devtools — it proves nothing to a real server.
 *
 * BACKEND TODO (required before production): replace this entire file with
 * calls to a real backend auth endpoint that verifies credentials server-side
 * and returns a real session/token (e.g. an httpOnly cookie or short-lived
 * JWT). The backend must also re-check the admin's role/permissions on every
 * protected API request — this file, and the ProtectedRoute component that
 * reads it, are UX conveniences only and enforce nothing on their own.
 */

export interface AuthService {
  login(credentials: LoginCredentials): Promise<AdminUser>;
  logout(): Promise<void>;
  getStoredSession(): AdminUser | null;
}

const MOCK_NETWORK_DELAY_MS = 600;
const SESSION_STORAGE_KEY = "kaamsetu_admin_mock_session";

/** Publicly documented demo login — not a real credential, see file header. */
const DEMO_ADMIN_EMAIL = "admin@kaamsetu.test";
const DEMO_ADMIN_PASSWORD = "Demo@1234";

const DEMO_ADMIN_USER: AdminUser = {
  id: "admin_demo",
  name: "Demo Admin",
  email: DEMO_ADMIN_EMAIL,
  role: "ADMIN",
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockAuthService implements AuthService {
  async login(credentials: LoginCredentials): Promise<AdminUser> {
    await delay(MOCK_NETWORK_DELAY_MS);

    const emailMatches =
      credentials.email.trim().toLowerCase() === DEMO_ADMIN_EMAIL;
    const passwordMatches = credentials.password === DEMO_ADMIN_PASSWORD;

    if (!emailMatches || !passwordMatches) {
      throw new Error("Invalid email or password.");
    }

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(DEMO_ADMIN_USER));
    return DEMO_ADMIN_USER;
  }

  async logout(): Promise<void> {
    await delay(150);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }

  getStoredSession(): AdminUser | null {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AdminUser;
    } catch {
      return null;
    }
  }
}

export const authService: AuthService = new MockAuthService();

/** Shown on the Login page so the demo credential is discoverable, not hidden. */
export const DEMO_LOGIN_HINT = `${DEMO_ADMIN_EMAIL} / ${DEMO_ADMIN_PASSWORD}`;
  
