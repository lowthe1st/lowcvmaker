import { useMemo, useState } from 'react'
import AiPanel from './AiPanel.jsx'
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
  onGoHome,
  profileAnswers,
  onProfileAnswersChange,
  onApplyAiSuggestion,
  onSaveAiState,
  resumeJsonForReview,

}) {
  const [mobileMode, setMobileMode] = useState('edit')

  const identity = user?.email || user?.provider || 'Unknown user'
  const signedInAs = user?.username ? `${user.username} (${identity})` : identity

  const themeLabel = useMemo(() => {
    const found = themeOptions?.find((t) => t.id === selectedThemeId)
    return found?.displayName || found?.name || selectedThemeId
  }, [themeOptions, selectedThemeId])

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <div className="brandTitle">Home</div>
          <div className="brandSub">
            Signed in as: <span className="badge">{user?.username || 'User'}</span>{' '}
            <span className="muted">({identity})</span>
            <span className="muted"> · Theme: {themeLabel}</span>
          </div>
        </div>

        <div className="actions">

          <button type="button" className="btn" onClick={onGoHome}>
            ← Back to landing
          </button>

          <button type="button" className="btn btnPrimary" onClick={onSave}>
            Save
          </button>
          <button type="button" className="btn" onClick={onDownloadHtml}>
            Download HTML
          </button>
          <button type="button" className="btn" onClick={onDownloadPdf}>
            Download PDF
          </button>
          <button type="button" className="btn btnDanger" onClick={onLogOut}>
            Log out
          </button>
        </div>
      </header>

      {(status || error) && (
        <div className={`notice ${error ? 'noticeError' : 'noticeOk'}`}>
          {error || status}
        </div>
      )}

      {/* Mobil toggle (syns med din responsiva CSS när grid blir 1 kolumn) */}
      <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`btn ${mobileMode === 'edit' ? 'btnPrimary' : ''}`}
          onClick={() => setMobileMode('edit')}
          aria-selected={mobileMode === 'edit'}
        >
          Edit
        </button>
        <button
          type="button"
          className={`btn ${mobileMode === 'preview' ? 'btnPrimary' : ''}`}
          onClick={() => setMobileMode('preview')}
          aria-selected={mobileMode === 'preview'}
        >
          Preview
        </button>
      </div>

      <AiPanel
  mode="cv"
  profileAnswers={profileAnswers}
  onProfileAnswersChange={onProfileAnswersChange}
  resumeJsonForReview={resumeJsonForReview}
  onApplySuggestion={onApplyAiSuggestion}
  onSaveAiState={onSaveAiState}
/>


      <main className="grid" style={{ marginTop: 12 }}>
        {/* LEFT: Editor */}
        <section
          className="panel"
          style={{
            display: mobileMode === 'preview' ? 'none' : 'block',
          }}
        >
          <div className="panelHeader">
            <h2>Editor</h2>
            <p className="muted">Update fields — preview refreshes automatically.</p>
          </div>

          <div className="formGrid">
            <div className="field">
              <label htmlFor="theme-select">Theme</label>
              <select
                id="theme-select"
                value={selectedThemeId}
                onChange={(event) => onThemeChange(event.target.value)}
              >
                {themeOptions.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.displayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="resume-name">Full name</label>
              <input
                id="resume-name"
                value={resumeDraft.name}
                onChange={(event) => onResumeDraftChange('name', event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="resume-label">Professional title</label>
              <input
                id="resume-label"
                value={resumeDraft.label}
                onChange={(event) => onResumeDraftChange('label', event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="resume-email">Email</label>
              <input
                id="resume-email"
                value={resumeDraft.email}
                onChange={(event) => onResumeDraftChange('email', event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="resume-phone">Phone</label>
              <input
                id="resume-phone"
                value={resumeDraft.phone}
                onChange={(event) => onResumeDraftChange('phone', event.target.value)}
              />
            </div>

            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="resume-summary">Summary</label>
              <textarea
                id="resume-summary"
                rows={4}
                value={resumeDraft.summary}
                onChange={(event) => onResumeDraftChange('summary', event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="resume-work-company">Current company</label>
              <input
                id="resume-work-company"
                value={resumeDraft.workCompany}
                onChange={(event) => onResumeDraftChange('workCompany', event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="resume-work-position">Current role</label>
              <input
                id="resume-work-position"
                value={resumeDraft.workPosition}
                onChange={(event) => onResumeDraftChange('workPosition', event.target.value)}
              />
            </div>

            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="resume-work-highlights">Work highlights (one per line)</label>
              <textarea
                id="resume-work-highlights"
                rows={5}
                value={resumeDraft.workHighlights}
                onChange={(event) => onResumeDraftChange('workHighlights', event.target.value)}
              />
            </div>

            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="resume-skills">Skills (comma separated)</label>
              <input
                id="resume-skills"
                value={resumeDraft.skillsKeywords}
                onChange={(event) => onResumeDraftChange('skillsKeywords', event.target.value)}
              />
            </div>

            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="cv-content">CV notes</label>
              <textarea
                id="cv-content"
                rows={7}
                value={cv}
                onChange={(event) => onCvChange(event.target.value)}
              />
            </div>

            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="cover-letter-content">Cover letter draft</label>
              <textarea
                id="cover-letter-content"
                rows={7}
                value={coverLetter}
                onChange={(event) => onCoverLetterChange(event.target.value)}
              />
            </div>
          </div>
        </section>

        {/* RIGHT: Preview */}
        <aside
          className="preview"
          style={{
            display: mobileMode === 'edit' ? 'none' : 'flex',
          }}
        >
          <div className="previewHeader">
            <h2>Preview</h2>
            <span className="muted">A4</span>
          </div>

          <div className="previewFrame">
            <ResumePreviewFrame html={previewHtml} />
          </div>
        </aside>
      </main>
    </div>
  )
}

export default AppView
