import { useMemo, useState } from 'react'
import { runAiJson } from '../ai/aiEngine.js'
import { buildOnboardingPrompt, buildReviewPrompt } from '../ai/prompts.js'

const CV_QUESTIONS = [
  { key: 'targetRole', label: 'Which role are you applying for?' },
  { key: 'years', label: 'Years of experience (approx)?' },
  { key: 'topStrengths', label: 'Top 3 strengths (comma separated)' },
  { key: 'bestAchievement', label: 'Your biggest achievement (with numbers if possible)' },
  { key: 'tools', label: 'Tools/skills you use (comma separated)' },
]

const CL_QUESTIONS = [
  { key: 'jobAd', label: 'Paste the job ad or describe the role (short).' },
  { key: 'whyCompany', label: 'Why this company?' },
  { key: 'bestProof', label: 'Best proof you can do the job (achievement)' },
  { key: 'tone', label: 'Tone: formal / friendly / bold?' },
]

const ONBOARDING_SCHEMA_HINT = `
Return JSON with OPTIONAL fields:
{
  "summary": "string",
  "workHighlights": ["string"],
  "skillsKeywords": ["string"],
  "coverLetterDraft": "string"
}
Rules:
- If you don't know a field, omit it.
- Strings must be plain text (no markdown).
- Replace placeholder examples with actual content based on the user answers.
- Never output the literal value "string".
`.trim()

const REVIEW_SCHEMA_HINT = `
Return JSON EXACTLY with this shape:
{
  "score": 0,
  "issues": [
    { "severity": "low|medium|high", "title": "string", "detail": "string" }
  ],
  "suggestions": [
    {
      "id": "string",
      "label": "string",
      "field": "summary|workHighlights|skillsKeywords|coverLetterDraft",
      "before": "string",
      "after": "string",
      "reason": "string"
    }
  ]
}
Rules:
- score is 0..100 integer.
- suggestions.after must be the full improved text for that field.
- Return ONLY JSON.
- Replace placeholder examples with actual values.
- Never output the literal values "string" or "number".
- If score is below 100, include at least 1 suggestion.
- If score is 60 or below, include at least 3 suggestions.
`.trim()

function normalizeReview(obj) {
  const safe = obj && typeof obj === 'object' ? obj : {}
  return {
    score: typeof safe.score === 'number' ? safe.score : null,
    issues: Array.isArray(safe.issues) ? safe.issues : [],
    suggestions: Array.isArray(safe.suggestions) ? safe.suggestions : [],
  }
}

function isPlaceholderText(value) {
  const t = String(value || '').trim().toLowerCase()
  return (
    t === 'string' ||
    t === 'number' ||
    t === 'n/a' ||
    t === 'tbd' ||
    t === '...' ||
    t === 'low|medium|high' ||
    t === 'summary|workhighlights|skillskeywords|coverletterdraft'
  )
}

function toCleanText(value) {
  if (typeof value !== 'string') return ''
  const t = value.trim()
  return isPlaceholderText(t) ? '' : t
}

function normalizeSeverity(value) {
  const v = String(value || '').trim().toLowerCase()
  return v === 'low' || v === 'medium' || v === 'high' ? v : ''
}

function sanitizeReview(reviewObj) {
  const base = normalizeReview(reviewObj)
  const score = typeof base.score === 'number' ? Math.max(0, Math.min(100, Math.round(base.score))) : null

  const issues = base.issues
    .map((it) => {
      const severity = normalizeSeverity(it?.severity)
      const title = toCleanText(it?.title)
      const detail = toCleanText(it?.detail)
      if (!severity || !title || !detail) return null
      return { severity, title, detail }
    })
    .filter(Boolean)

  const allowedFields = new Set(['summary', 'workHighlights', 'skillsKeywords', 'coverLetterDraft'])
  const suggestions = base.suggestions
    .map((it, idx) => {
      const field = String(it?.field || '').trim()
      const after = toCleanText(it?.after)
      if (!allowedFields.has(field) || !after) return null
      return {
        id: toCleanText(it?.id) || `ai_suggestion_${idx + 1}`,
        label: toCleanText(it?.label) || `Apply improved ${field}`,
        field,
        before: typeof it?.before === 'string' ? it.before : '',
        after,
        reason: toCleanText(it?.reason),
      }
    })
    .filter(Boolean)

  return { score, issues, suggestions }
}

export default function AiPanel({
  mode, // 'cv' | 'coverLetter'
  profileAnswers,
  onProfileAnswersChange,
  resumeJsonForReview,
  onApplySuggestion,
  onSaveAiState,
}) {
  const answers = profileAnswers || {}
  const questions = useMemo(() => (mode === 'cv' ? CV_QUESTIONS : CL_QUESTIONS), [mode])

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [progressValue, setProgressValue] = useState(null)
  const [aiError, setAiError] = useState('')
  const [review, setReview] = useState(null)

  const currentQ = questions[step]
  const currentValue = answers?.[currentQ?.key] ?? ''
  const loadingLabel = loading
    ? (mode === 'coverLetter' ? 'Generating your cover letter suggestions...' : 'Generating your CV suggestions...')
    : ''
  const loadingPercent = typeof progressValue === 'number' ? Math.round(progressValue * 100) : null

  async function runOnboarding() {
    setLoading(true)
    setAiError('')
    setProgressValue(null)

    try {
      const messages = buildOnboardingPrompt({ mode, answers })

      const data = await runAiJson({
        messages,
        schemaHint: ONBOARDING_SCHEMA_HINT,
        onProgress: (info) => {
          const raw = info?.progress ?? info?.report?.progress
          setProgressValue(typeof raw === 'number' ? Math.max(0, Math.min(1, raw)) : null)
        },
      })

      // Convert onboarding output -> your "suggestions" UI format
      const suggestions = []

      if (typeof data.summary === 'string' && data.summary.trim() && !isPlaceholderText(data.summary)) {
        suggestions.push({
          id: 'ai_summary',
          label: 'Apply improved summary',
          field: 'summary',
          before: '',
          after: data.summary.trim(),
          reason: 'AI rewrite based on your answers',
        })
      }

      const workHighlights = Array.isArray(data.workHighlights)
        ? data.workHighlights.filter((x) => x && !isPlaceholderText(x))
        : []
      if (workHighlights.length) {
        suggestions.push({
          id: 'ai_workHighlights',
          label: 'Apply improved work highlights',
          field: 'workHighlights',
          before: '',
          after: workHighlights.join('\n'),
          reason: 'Clear, impact-focused bullet points',
        })
      }

      const skillsKeywords = Array.isArray(data.skillsKeywords)
        ? data.skillsKeywords.filter((x) => x && !isPlaceholderText(x))
        : []
      if (skillsKeywords.length) {
        suggestions.push({
          id: 'ai_skills',
          label: 'Apply improved skills',
          field: 'skillsKeywords',
          before: '',
          after: skillsKeywords.join(', '),
          reason: 'Better keyword coverage',
        })
      }

      if (
        mode === 'coverLetter' &&
        typeof data.coverLetterDraft === 'string' &&
        data.coverLetterDraft.trim() &&
        !isPlaceholderText(data.coverLetterDraft)
      ) {
        suggestions.push({
          id: 'ai_coverLetter',
          label: 'Apply cover letter draft',
          field: 'coverLetterDraft',
          before: '',
          after: data.coverLetterDraft.trim(),
          reason: 'Draft tailored to your inputs',
        })
      }

      const nextReview = normalizeReview({
        score: null,
        issues: [],
        suggestions,
      })

      setReview(nextReview)

      onSaveAiState?.({
        aiEnabled: true,
        profileAnswers: answers,
        aiLastReview: nextReview,
      })
    } catch (e) {
      setAiError(e?.message || 'AI onboarding failed.')
    } finally {
      setLoading(false)
      setProgressValue(null)
    }
  }

  async function runReview() {
    setLoading(true)
    setAiError('')
    setProgressValue(null)

    try {
      const messages = buildReviewPrompt({
        resumeJson: resumeJsonForReview,
        targetRole: answers?.targetRole || '',
      })

      const data = await runAiJson({
        messages,
        schemaHint: REVIEW_SCHEMA_HINT,
        onProgress: (info) => {
          const raw = info?.progress ?? info?.report?.progress
          setProgressValue(typeof raw === 'number' ? Math.max(0, Math.min(1, raw)) : null)
        },
      })

      let nextReview = sanitizeReview(data)

      if (
        typeof nextReview.score === 'number' &&
        nextReview.score < 100 &&
        nextReview.suggestions.length === 0
      ) {
        const retryMessages = [
          ...messages,
          {
            role: 'user',
            content:
              'You returned a low score but no suggestions. Retry now and include concrete field-level replacements in suggestions.',
          },
        ]

        const retryData = await runAiJson({
          messages: retryMessages,
          schemaHint: `${REVIEW_SCHEMA_HINT}\nCritical: suggestions must not be empty when score < 100.`,
          onProgress: (info) => {
            const raw = info?.progress ?? info?.report?.progress
            setProgressValue(typeof raw === 'number' ? Math.max(0, Math.min(1, raw)) : null)
          },
        })

        nextReview = sanitizeReview(retryData)
      }

      setReview(nextReview)

      onSaveAiState?.({
        aiEnabled: true,
        profileAnswers: answers,
        aiLastReview: nextReview,
      })
    } catch (e) {
      setAiError(e?.message || 'AI review failed.')
    } finally {
      setLoading(false)
      setProgressValue(null)
    }
  }

  return (
    <section className="card ai-panel ai-panel-modern">
      <div className="ai-head">
        <div className="ai-head-icon" aria-hidden="true">AI</div>
        <div>
          <h3>Smart CV Assistant</h3>
          <p className="muted">Answer a few questions and get tailored improvements.</p>
        </div>
      </div>

      <div className="ai-wizard">
        <h4 className="ai-step-title">
          Step {step + 1} / {questions.length}
        </h4>

        <label className="field-label ai-question-label">{currentQ?.label}</label>
        <input
          className="auth-input"
          value={currentValue}
          onChange={(e) =>
            onProfileAnswersChange?.({ ...answers, [currentQ.key]: e.target.value })
          }
          placeholder="Type here..."
        />

        <div className="ai-actions">
          <button
            className="btn btn-secondary"
            type="button"
            disabled={step === 0 || loading}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </button>

          {step < questions.length - 1 ? (
            <button
              className="btn btn-primary"
              type="button"
              disabled={loading}
              onClick={() => setStep((s) => Math.min(questions.length - 1, s + 1))}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-primary"
              type="button"
              disabled={loading}
              onClick={runOnboarding}
            >
              Generate suggestions
            </button>
          )}

          <button
            className="btn btn-ghost"
            type="button"
            disabled={loading}
            onClick={runReview}
          >
            Review current CV
          </button>
        </div>

        {loading ? (
          <div className="ai-loading" aria-live="polite" aria-busy="true">
            <div className="ai-loading-head">
              <div className="ai-loading-label">{loadingLabel}</div>
              {loadingPercent !== null ? <div className="ai-loading-percent">{loadingPercent}%</div> : null}
            </div>
            <div className="ai-loading-track">
              <div
                className={`ai-loading-fill ${typeof progressValue === 'number' ? '' : 'is-indeterminate'}`}
                style={typeof progressValue === 'number' ? { width: `${Math.max(8, Math.round(progressValue * 100))}%` } : undefined}
              />
            </div>
            <div className="ai-loading-sub">PLEASE WAIT...</div>
          </div>
        ) : null}
        {aiError ? <p className="error-message">{aiError}</p> : null}
      </div>

      {review ? (
        <div className="ai-review">
          {typeof review.score === 'number' ? (
            <p className="ai-score">
              <b>Score:</b> {review.score}/100
            </p>
          ) : null}

          {Array.isArray(review.issues) && review.issues.length ? (
            <>
              <h4>Issues</h4>
              <ul className="ai-issues-list">
                {review.issues.map((it, idx) => (
                  <li key={idx}>
                    <b className={`ai-severity ai-severity-${it.severity}`}>{it.severity.toUpperCase()}</b> {it.title} - {it.detail}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {Array.isArray(review.suggestions) && review.suggestions.length ? (
            <>
              <h4>Suggestions (click apply)</h4>
              <div className="ai-suggestions">
                {review.suggestions.map((s) => (
                  <div className="ai-suggestion card" key={s.id}>
                    <div className="ai-suggestion-row">
                      <div>
                        <b>{s.label}</b>
                        <div className="muted">Field: {s.field}</div>
                        {s.reason ? <div className="muted">Why: {s.reason}</div> : null}
                      </div>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => onApplySuggestion?.(s)}
                      >
                        Apply
                      </button>
                    </div>

                    <details>
                      <summary>Preview</summary>
                      <div className="ai-diff">
                        <div>
                          <div className="muted">After</div>
                          <pre>{s.after}</pre>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="muted" style={{ marginTop: 8 }}>
              No suggestions yet.
            </p>
          )}
        </div>
      ) : null}
    </section>
  )
}

