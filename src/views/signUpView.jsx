function BackIcon() {
  return <span aria-hidden="true">←</span>
}

function MailIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h18v12H3z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M3 7l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 109.8 12h-9.8v-4h5.6A6 6 0 1112 6a5.9 5.9 0 014.2 1.7l2.8-2.8A10 10 0 0012 2z" fill="currentColor" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16.5 12.6c0-2.1 1.7-3.2 1.8-3.2-1-1.4-2.6-1.6-3.1-1.6-1.3-.1-2.5.8-3.2.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.8.9-3.6 2.2-1.6 2.8-.4 7 1.1 9.1.7 1 1.6 2.1 2.8 2 .8 0 1.2-.5 2.3-.5 1.1 0 1.5.5 2.3.5 1.2 0 1.9-1 2.7-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.3-.9-2.3-4.2zM14.4 6.2c.6-.7 1.1-1.7 1-2.7-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.6-1.3z"
        fill="currentColor"
      />
    </svg>
  )
}

function SignUpView({
  username,
  email,
  password,
  status,
  error,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onSignUpEmail,
  onSignInGoogle,
  onSignInApple,
  onGoToLogIn,
  onBack,
}) {
  return (
    <main className="page-shell auth-shell">
      <section className="auth-container card">
        <div className="auth-topbar">
          <button type="button" className="back-button" onClick={onBack} aria-label="Go back">
            <BackIcon />
            <span>Back</span>
          </button>
        </div>

        <h1>Create account</h1>
        <p className="auth-subtext">Set up your profile to start building your CV and cover letter.</p>

        <div className="form-grid">
          <label htmlFor="signup-username">Username</label>
          <input
            id="signup-username"
            className="auth-input"
            type="text"
            value={username}
            onChange={(event) => onUsernameChange(event.target.value)}
            placeholder="yourname"
          />

          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            className="auth-input"
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="you@example.com"
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            className="auth-input"
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="At least 8 characters"
          />
        </div>

        <div className="auth-buttons">
          <button type="button" className="auth-button btn-email" onClick={onSignUpEmail}>
            <MailIcon />
            <span>Create account with Email</span>
          </button>
          <button type="button" className="auth-button btn-google" onClick={onSignInGoogle}>
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>
          <button type="button" className="auth-button btn-apple" onClick={onSignInApple}>
            <AppleIcon />
            <span>Continue with Apple</span>
          </button>
        </div>

        {status ? <p className="status-message">{status}</p> : null}
        {error ? <p className="error-message">{error}</p> : null}

        <button type="button" className="text-button auth-switch-link" onClick={onGoToLogIn}>
          Already have an account? Log in
        </button>
      </section>
    </main>
  )
}

export default SignUpView
