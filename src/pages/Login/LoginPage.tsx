import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate, type Location } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import { DEMO_LOGIN_HINT } from "../../services/mock/mockAuthService";
import { EyeIcon, EyeOffIcon } from "../../components/common/icons";
import styles from "./LoginPage.module.css";

interface FormErrors {
  email?: string;
  password?: string;
}

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Already "logged in" (mock session restored) — skip the login screen.
  if (isAuthenticated) {
    const redirectTo = (location.state as { from?: Location } | null)?.from?.pathname ?? "/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ email, password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            KS
          </span>
          <div>
            <p className={styles.brandName}>KaamSetu</p>
            <p className={styles.brandSubtitle}>Admin</p>
          </div>
        </div>

        <h1 className={styles.heading}>Sign in to your dashboard</h1>
        <p className={styles.subheading}>
          Manage technicians, jobs, and operations across KaamSetu.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="admin-email" className={styles.label}>
              Email address
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              className={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "admin-email-error" : undefined}
            />
            {errors.email && (
              <p id="admin-email-error" className={styles.fieldError}>
                {errors.email}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="admin-password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordRow}>
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className={styles.input}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "admin-password-error" : undefined}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            {errors.password && (
              <p id="admin-password-error" className={styles.fieldError}>
                {errors.password}
              </p>
            )}
          </div>

          {submitError && (
            <p className={styles.formError} role="alert">
              {submitError}
            </p>
          )}

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className={styles.demoHint}>
          Phase 4A demo login (mock authentication, not a real account):
          <br />
          <code>{DEMO_LOGIN_HINT}</code>
        </p>
      </div>
    </div>
  );
}
