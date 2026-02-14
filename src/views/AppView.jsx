import { useState } from 'react'
import SupabaseTest from '../components/SupabaseTest.jsx'
import ResumePreviewFrame from './ResumePreviewFrame.jsx'

function AppView({
  user,
  cv,
  coverLetter,
  resumeDraft,
  selectedThemeId,
  themeOptions,
  previewHtml,
  status,
  error,
  onCvChange,
  onCoverLetterChange,
  onResumeDraftChange,
  onThemeChange,
  onSave,
  onDownloadHtml,
  onDownloadPdf,
  onLogOut,
}) {
  const [mobileMode, setMobileMode] = useState('edit')
  const identity = user?.email || user?.provider || 'Unknown user'
  const signedInAs = user?.username ? `${user.username} (${identity})` : identity

  return (
    <main className="page-shell auth-shell">
      <section className="home-container card home-layout">
        <div className="home-header-row">
          <div>
            <h1>Home</h1>
            <p className="auth-subtext">Signed in as: {signedInAs}</p>
          </div>
          <div className="home-top-actions">
            <button type="button" className="btn btn-secondary" onClick={onSave}>Save</button>
            <button type="button" className="btn btn-secondary" onClick={onDownloadHtml}>Download HTML</button>
            <button type="button" className="btn btn-secondary" onClick={onDownloadPdf}>Download PDF</button>
            <button type="button" className="btn btn-ghost" onClick={onLogOut}>Log out</button>
          </div>
        </div>

        <div className="home-mobile-toggle" role="tablist" aria-label="Editor mode">
          <button
            type="button"
            className={`btn btn-secondary ${mobileMode === 'edit' ? 'is-active' : ''}`}
            onClick={() => setMobileMode('edit')}
            aria-selected={mobileMode === 'edit'}
          >
            Edit
          </button>
          <button
            type="button"
            className={`btn btn-secondary ${mobileMode === 'preview' ? 'is-active' : ''}`}
            onClick={() => setMobileMode('preview')}
            aria-selected={mobileMode === 'preview'}
          >
            Preview
          </button>
        </div>

        <div className={`home-panels mode-${mobileMode}`}>
          <div className="home-editor-panel">
            <div className="form-grid">
              <label htmlFor="theme-select">Theme</label>
              <select
                id="theme-select"
                className="auth-input"
                value={selectedThemeId}
                onChange={(event) => onThemeChange(event.target.value)}
              >
                {themeOptions.map((theme) => (
                  <option key={theme.id} value={theme.id}>{theme.displayName}</option>
                ))}
              </select>

              <label htmlFor="resume-name">Full name</label>
              <input id="resume-name" className="auth-input" value={resumeDraft.name} onChange={(event) => onResumeDraftChange('name', event.target.value)} />

              <label htmlFor="resume-label">Professional title</label>
              <input id="resume-label" className="auth-input" value={resumeDraft.label} onChange={(event) => onResumeDraftChange('label', event.target.value)} />

              <label htmlFor="resume-email">Email</label>
              <input id="resume-email" className="auth-input" value={resumeDraft.email} onChange={(event) => onResumeDraftChange('email', event.target.value)} />

              <label htmlFor="resume-phone">Phone</label>
              <input id="resume-phone" className="auth-input" value={resumeDraft.phone} onChange={(event) => onResumeDraftChange('phone', event.target.value)} />

              <label htmlFor="resume-summary">Summary</label>
              <textarea id="resume-summary" className="auth-input" rows={4} value={resumeDraft.summary} onChange={(event) => onResumeDraftChange('summary', event.target.value)} />

              <label htmlFor="resume-work-company">Current company</label>
              <input id="resume-work-company" className="auth-input" value={resumeDraft.workCompany} onChange={(event) => onResumeDraftChange('workCompany', event.target.value)} />

              <label htmlFor="resume-work-position">Current role</label>
              <input id="resume-work-position" className="auth-input" value={resumeDraft.workPosition} onChange={(event) => onResumeDraftChange('workPosition', event.target.value)} />

              <label htmlFor="resume-work-highlights">Work highlights (one per line)</label>
              <textarea id="resume-work-highlights" className="auth-input" rows={5} value={resumeDraft.workHighlights} onChange={(event) => onResumeDraftChange('workHighlights', event.target.value)} />

              <label htmlFor="resume-skills">Skills (comma separated)</label>
              <input id="resume-skills" className="auth-input" value={resumeDraft.skillsKeywords} onChange={(event) => onResumeDraftChange('skillsKeywords', event.target.value)} />

              <label htmlFor="cv-content">CV notes</label>
              <textarea id="cv-content" className="auth-input" rows={8} value={cv} onChange={(event) => onCvChange(event.target.value)} />

              <label htmlFor="cover-letter-content">Cover letter draft</label>
              <textarea id="cover-letter-content" className="auth-input" rows={8} value={coverLetter} onChange={(event) => onCoverLetterChange(event.target.value)} />
            </div>
          </div>

          <div className="home-preview-panel">
            <ResumePreviewFrame html={previewHtml} />
          </div>
        </div>

        {status ? <p className="status-message">{status}</p> : null}
        {error ? <p className="error-message">{error}</p> : null}
        <SupabaseTest />
      </section>
    </main>
  )
}

export default AppView
