/**
 * Auth types for the Phase 4A MVP.
 *
 * SECURITY NOTE (see also mockAuthService.ts and AuthContext.tsx):
 * Everything in this feature is frontend-only mock scaffolding. There is no
 * real authentication here — no password hashing, no server-issued session,
 * no real token. Production KaamSetu Admin MUST authenticate against a
 * backend that issues a real session/token and MUST re-check the admin's
 * role and permissions on every protected API call server-side. Nothing in
 * this frontend can be trusted as a security boundary on its own.
 */

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  /** True while a login attempt (or initial session restore) is in flight. */
  isLoading: boolean;
  error: string | null;
}

