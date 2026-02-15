import { internalTemplates, jsonResumeThemes } from '../templates.js'

function TemplatePreview({ previewClass, accentColor }) {
  return (
    <div
      className={`template-preview ${previewClass}`}
      aria-hidden="true"
      style={{ '--template-accent': accentColor }}
    >
      <div className="tpl-page">
        <div className="tpl-header" />
        <div className="tpl-body">
          <div className="tpl-sidebar-col">
            <span className="tpl-chip" />
            <span className="tpl-chip" />
            <span className="tpl-chip short" />
          </div>
          <div className="tpl-main-col">
            <span className="tpl-line" />
            <span className="tpl-line" />
            <span className="tpl-line short" />
            <ul className="tpl-bullets">
              <li />
              <li />
              <li />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapPreviewClass(layoutType) {
  switch (layoutType) {
    case 'modern':
      return 'tpl-modern'
    case 'classic':
      return 'tpl-classic'
    case 'sidebar':
      return 'tpl-sidebar'
    case 'two-column':
      return 'tpl-two-column'
    case 'bold':
      return 'tpl-bold'
    case 'dark':
      return 'tpl-dark'
    default:
      return 'tpl-modern'
  }
}

function LandingView({
  onGoToLogIn,
  onGoToSignUp,
  onCreateCv,
  onUseTemplate,
  onUseJsonTheme,
  isAuthenticated,
  onGoToDashboard,
  signedInAs, // OPTIONAL: skicka in text om du vill
}) {
  return (
    <main className="page-shell landing-shell">
      <div className="landing-frame">
        <header className="site-nav card">
          <a href="#top" className="brand">Low CV Maker</a>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#templates">Templates</a>
            <a href="#reviews">Reviews</a>

            {isAuthenticated ? (
              <>
                {signedInAs ? <span className="nav-user">Signed in: {signedInAs}</span> : null}
                <button type="button" className="nav-primary" onClick={onGoToDashboard}>
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={onGoToLogIn}>Log in</button>
                <button type="button" className="nav-primary" onClick={onGoToSignUp}>Create account</button>
              </>
            )}
          </nav>
        </header>

        <section id="top" className="landing-hero card">
          <h1>Build a CV that actually gets interviews</h1>
          <p className="hero-subtext">
            Create a professional CV and cover letter in minutes with clean templates and simple editing.
          </p>

          <div className="landing-actions">
            {isAuthenticated ? (
              <>
                <button type="button" className="btn btn-primary" onClick={onGoToDashboard}>
                  Continue editing
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => window.location.hash = '#templates'}>
                  Browse templates
                </button>
              </>
            ) : (
              <>
                <button type="button" className="btn btn-primary" onClick={onCreateCv}>Create CV</button>
                <button type="button" className="btn btn-ghost" onClick={onGoToLogIn}>Log in</button>
              </>
            )}
          </div>
        </section>

        <section id="reviews" className="card section-card">
          <div className="section-head">
            <h2>Reviews</h2>
          </div>

          <div className="review-grid">
            <article className="review-card">
              <p className="stars" aria-label="Five stars">★★★★★</p>
              <p className="review-name">Peter</p>
              <p>
                I updated my CV in one evening and got two interview calls the same week. The templates look polished and
                easy to tailor.
              </p>
            </article>

            <article className="review-card">
              <p className="stars" aria-label="Five stars">★★★★★</p>
              <p className="review-name">Gerald</p>
              <p>
                Finally a CV tool that feels focused and practical. I could rewrite my experience quickly without fighting
                formatting.
              </p>
            </article>

            <article className="review-card">
              <p className="stars" aria-label="Five stars">★★★★★</p>
              <p className="review-name">Ida</p>
              <p>
                The structure helped me present my profile much better. It feels like a real product, not a generic form.
              </p>
            </article>

            <article className="review-card">
              <p className="stars" aria-label="Five stars">★★★★★</p>
              <p className="review-name">Ahmed</p>
              <p>
                I came from TikTok and did not expect this service to be free, but it was. Wishing you all the best.
              </p>
            </article>
          </div>
        </section>

        <section id="templates" className="card section-card">
          <div className="section-head">
            <h2>Internal Starter Templates</h2>
            <p>{isAuthenticated ? 'Pick a starter and prefill your editor.' : 'Choose a starter and continue to sign up.'}</p>
          </div>

          <div className="template-grid">
            {internalTemplates.map((template) => (
              <article className="template-card" key={template.id}>
                <TemplatePreview
                  previewClass={mapPreviewClass(template.layoutType)}
                  accentColor={template.accentColor}
                />
                <h3>{template.name}</h3>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onUseTemplate(template.id)}
                >
                  {isAuthenticated ? 'Use & open editor' : 'Use this template'}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="card section-card">
          <div className="section-head">
            <h2>JSON Resume Themes</h2>
            <p>Theme packages that render resume JSON into production-ready HTML.</p>
          </div>

          <div className="theme-grid">
            {jsonResumeThemes.map((theme) => (
              <article className="theme-card" key={theme.id}>
                <h3>{theme.displayName}</h3>
                <p>{theme.description}</p>
                <p className="theme-meta">
                  Source:{' '}
                  <a href={theme.sourceUrl} target="_blank" rel="noreferrer">
                    {theme.packageName}
                  </a>{' '}
                  | License: {theme.license}
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onUseJsonTheme(theme.id)}
                >
                  {isAuthenticated ? 'Apply & open editor' : 'Use this theme'}
                </button>
              </article>
            ))}
          </div>
        </section>

        <footer className="site-footer">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </footer>
      </div>
    </main>
  )
}

export default LandingView
