import { useEffect, useRef, useState } from 'react'
import { watchAuthState } from './models/appModel.js'
import { useHomePresenter } from './presenters/home.jsx'
import { useLogInPresenter } from './presenters/logIn.jsx'
import { useSignUpPresenter } from './presenters/signUp.jsx'
import { getInternalTemplateById, jsonResumeThemes } from './templates.js'
import { mapToJsonResume } from './templates/jsonresume/mapToJsonResume.js'
import { renderResumeHtml } from './templates/jsonresume/renderTheme.js'
import { sampleResumeData } from './templates/jsonresume/sampleResumeData.js'
import AppView from './views/AppView.jsx'
import LandingView from './views/LandingView.jsx'
import LogInView from './views/logInView.jsx'
import SignUpView from './views/signUpView.jsx'

const DEFAULT_THEME_ID = 'even'

function createInitialResumeDraft() {
  return {
    name: sampleResumeData.basics.name,
    label: sampleResumeData.basics.label,
    email: sampleResumeData.basics.email,
    phone: sampleResumeData.basics.phone,
    website: sampleResumeData.basics.website,
    summary: sampleResumeData.basics.summary,
    city: sampleResumeData.basics.location.city,
    region: sampleResumeData.basics.location.region,
    countryCode: sampleResumeData.basics.location.countryCode,
    profileNetwork: sampleResumeData.basics.profiles[0]?.network || '',
    profileUsername: sampleResumeData.basics.profiles[0]?.username || '',
    profileUrl: sampleResumeData.basics.profiles[0]?.url || '',
    workCompany: sampleResumeData.work[0]?.name || '',
    workPosition: sampleResumeData.work[0]?.position || '',
    workStartDate: sampleResumeData.work[0]?.startDate || '',
    workEndDate: sampleResumeData.work[0]?.endDate || '',
    workSummary: sampleResumeData.work[0]?.summary || '',
    workHighlights: (sampleResumeData.work[0]?.highlights || []).join('\n'),
    educationInstitution: sampleResumeData.education[0]?.institution || '',
    educationArea: sampleResumeData.education[0]?.area || '',
    educationStudyType: sampleResumeData.education[0]?.studyType || '',
    educationStartDate: sampleResumeData.education[0]?.startDate || '',
    educationEndDate: sampleResumeData.education[0]?.endDate || '',
    educationScore: sampleResumeData.education[0]?.score || '',
    educationCourses: (sampleResumeData.education[0]?.courses || []).join('\n'),
    skillsCategory: sampleResumeData.skills[0]?.name || 'Core Skills',
    skillsLevel: sampleResumeData.skills[0]?.level || '',
    skillsKeywords: (sampleResumeData.skills[0]?.keywords || []).join(', '),
    projectName: sampleResumeData.projects[0]?.name || '',
    projectDescription: sampleResumeData.projects[0]?.description || '',
    projectUrl: sampleResumeData.projects[0]?.url || '',
    projectHighlights: (sampleResumeData.projects[0]?.highlights || []).join('\n'),
  }
}

function buildFallbackThemeHtml(message = 'Unable to render preview.') {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body { font-family: Inter, Arial, sans-serif; margin: 0; padding: 24px; color: #273042; }
  .box { border: 1px solid #d6dbe7; padding: 20px; background: #fff; max-width: 760px; margin: 0 auto; }
  h1 { margin: 0 0 8px; font-size: 20px; }
  p { margin: 0; color: #57617a; }
</style>
</head>
<body>
  <div class="box">
    <h1>Resume preview unavailable</h1>
    <p>${message}</p>
  </div>
</body>
</html>`
}

function ensureHtmlDocument(htmlString) {
  if (/<html[\s>]/i.test(htmlString)) {
    return htmlString
  }

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>${htmlString}</body>
</html>`
}

function App() {
  const signUpPresenter = useSignUpPresenter()
  const logInPresenter = useLogInPresenter()
  const homePresenter = useHomePresenter()

  const [authUser, setAuthUser] = useState(null)
  const [screen, setScreen] = useState('landing')
  const [screenHistory, setScreenHistory] = useState([])
  const [pendingTemplateId, setPendingTemplateId] = useState(null)
  const [pendingThemeId, setPendingThemeId] = useState(null)

  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  const [logInEmail, setLogInEmail] = useState('')
  const [logInPassword, setLogInPassword] = useState('')

  const [cv, setCv] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [resumeDraft, setResumeDraft] = useState(createInitialResumeDraft())
  const [selectedThemeId, setSelectedThemeId] = useState(DEFAULT_THEME_ID)
  const [renderedPreviewHtml, setRenderedPreviewHtml] = useState(buildFallbackThemeHtml('Preparing preview...'))

  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const screenRef = useRef(screen)
  const historyRef = useRef(screenHistory)
  const renderTimeoutRef = useRef(null)

  useEffect(() => {
    screenRef.current = screen
  }, [screen])

  useEffect(() => {
    historyRef.current = screenHistory
  }, [screenHistory])

  useEffect(() => {
    window.history.replaceState({ appScreen: 'landing' }, '')
    window.history.pushState({ appScreen: 'landing' }, '')

    function handlePopState() {
      if (historyRef.current.length > 0) {
        goBack(true)
        return
      }

      setScreen('landing')
      screenRef.current = 'landing'
      setScreenHistory([])
      historyRef.current = []
      window.history.pushState({ appScreen: 'landing' }, '')
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    return watchAuthState((user) => {
      setAuthUser(user)
    })
  }, [])

  useEffect(() => {
    async function run() {
      if (!authUser?.id) {
        setCv('')
        setCoverLetter('')
        setResumeDraft(createInitialResumeDraft())
        setSelectedThemeId(DEFAULT_THEME_ID)
        return
      }

      try {
        setError('')
        const latest = await homePresenter.loadLatestCvAndCoverLetter(authUser.id)
        setCv(latest.cv || '')
        setCoverLetter(latest.coverLetter || '')
        setResumeDraft((previous) => ({ ...previous, ...(latest.resumeDraft || {}) }))
        const themeExists = jsonResumeThemes.some((theme) => theme.id === latest.selectedThemeId)
        setSelectedThemeId(themeExists ? latest.selectedThemeId : DEFAULT_THEME_ID)
      } catch (err) {
        setError(err.message || 'Failed to load your data.')
      }
    }

    run()
  }, [authUser, homePresenter])

  useEffect(() => {
    async function runRender() {
      const resumeJson = mapToJsonResume({
        ...resumeDraft,
        summary: resumeDraft.summary || cv,
        projectDescription: resumeDraft.projectDescription || coverLetter,
      })

      const result = await renderResumeHtml({
        themeId: selectedThemeId,
        resumeJson,
      })

      if (result.ok) {
        setRenderedPreviewHtml(ensureHtmlDocument(result.html))
        return
      }

      setRenderedPreviewHtml(buildFallbackThemeHtml(result.error))
    }

    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current)
    }

    renderTimeoutRef.current = setTimeout(() => {
      runRender()
    }, 400)

    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current)
      }
    }
  }, [resumeDraft, selectedThemeId, cv, coverLetter])

  useEffect(() => {
    if (authUser && screenRef.current !== 'home') {
      navigateTo('home', { clearHistory: true })
      return
    }

    if (!authUser && screenRef.current === 'home') {
      navigateTo('landing', { clearHistory: true })
    }
  }, [authUser])

  function clearFeedback() {
    setStatus('')
    setError('')
  }

  function navigateTo(nextScreen, options = {}) {
    const { clearHistory = false } = options

    if (screenRef.current === nextScreen && !clearHistory) {
      return
    }

    if (clearHistory) {
      setScreenHistory([])
      historyRef.current = []
    } else {
      const nextHistory = [...historyRef.current, screenRef.current]
      setScreenHistory(nextHistory)
      historyRef.current = nextHistory
    }

    setScreen(nextScreen)
    screenRef.current = nextScreen
    window.history.pushState({ appScreen: nextScreen }, '')
  }

  function goBack(isPopState = false) {
    if (historyRef.current.length > 0) {
      const previousScreen = historyRef.current[historyRef.current.length - 1]
      const nextHistory = historyRef.current.slice(0, -1)
      setScreenHistory(nextHistory)
      historyRef.current = nextHistory
      setScreen(previousScreen)
      screenRef.current = previousScreen
      if (!isPopState) {
        window.history.pushState({ appScreen: previousScreen }, '')
      }
      return
    }

    setScreen('landing')
    screenRef.current = 'landing'
    if (!isPopState) {
      window.history.pushState({ appScreen: 'landing' }, '')
    }
  }

  function applyTemplate(templateId) {
    const selectedTemplate = getInternalTemplateById(templateId)
    if (!selectedTemplate) {
      return
    }

    setCv(selectedTemplate.starterCv)
    setCoverLetter(selectedTemplate.starterCoverLetter)
    setResumeDraft((previous) => ({
      ...previous,
      summary: selectedTemplate.starterCv.split('\n\n')[1] || previous.summary,
      projectDescription: selectedTemplate.starterCoverLetter.split('\n\n')[1] || previous.projectDescription,
      skillsKeywords: selectedTemplate.sectionsOrder.join(', '),
    }))
    setStatus(`Loaded template: ${selectedTemplate.name}`)
    setError('')
  }

  function handleUseTemplate(templateId) {
    if (authUser?.id) {
      applyTemplate(templateId)
      navigateTo('home')
      return
    }

    setPendingTemplateId(templateId)
    clearFeedback()
    navigateTo('signup')
  }

  function handleUseJsonTheme(themeId) {
    if (authUser?.id) {
      setSelectedThemeId(themeId)
      setStatus('Theme updated.')
      setError('')
      navigateTo('home')
      return
    }

    setPendingThemeId(themeId)
    clearFeedback()
    navigateTo('signup')
  }

  function handleResumeDraftChange(key, value) {
    setResumeDraft((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  async function handleSignUpWithEmail() {
    try {
      setError('')
      await signUpPresenter.signUpWithEmail(signUpUsername, signUpEmail, signUpPassword)

      if (pendingTemplateId) {
        applyTemplate(pendingTemplateId)
        setPendingTemplateId(null)
      }

      if (pendingThemeId) {
        setSelectedThemeId(pendingThemeId)
        setPendingThemeId(null)
      }

      setStatus('Signed up successfully.')
      navigateTo('home', { clearHistory: true })
    } catch (err) {
      setError(err.message || 'Sign-up failed.')
    }
  }

  async function handleLogInWithEmail() {
    try {
      setError('')
      await logInPresenter.logInWithEmail(logInEmail, logInPassword)

      if (pendingTemplateId) {
        applyTemplate(pendingTemplateId)
        setPendingTemplateId(null)
      }

      if (pendingThemeId) {
        setSelectedThemeId(pendingThemeId)
        setPendingThemeId(null)
      }

      setStatus('Logged in successfully.')
      navigateTo('home', { clearHistory: true })
    } catch (err) {
      setError(err.message || 'Log-in failed.')
    }
  }

  async function handleSignInWithGoogleFromSignUp() {
    try {
      setError('')
      await signUpPresenter.signInWithGoogle()
      setStatus('Signed in with Google.')
      navigateTo('home', { clearHistory: true })
    } catch (err) {
      setError(err.message || 'Google sign-in failed.')
    }
  }

  async function handleSignInWithGoogleFromLogIn() {
    try {
      setError('')
      await logInPresenter.signInWithGoogle()
      setStatus('Signed in with Google.')
      navigateTo('home', { clearHistory: true })
    } catch (err) {
      setError(err.message || 'Google sign-in failed.')
    }
  }

  async function handleSignInWithAppleFromSignUp() {
    try {
      setError('')
      await signUpPresenter.signInWithApple()
      setStatus('Signed in with Apple.')
      navigateTo('home', { clearHistory: true })
    } catch (err) {
      setError(err.message || 'Apple sign-in failed.')
    }
  }

  async function handleSignInWithAppleFromLogIn() {
    try {
      setError('')
      await logInPresenter.signInWithApple()
      setStatus('Signed in with Apple.')
      navigateTo('home', { clearHistory: true })
    } catch (err) {
      setError(err.message || 'Apple sign-in failed.')
    }
  }

  async function handleSave() {
    try {
      setError('')
      if (!authUser?.id) {
        throw new Error('You must be logged in to save content.')
      }

      const latest = await homePresenter.saveUpdates(authUser.id, {
        cv,
        coverLetter,
        resumeDraft,
        selectedThemeId,
      })

      setCv(latest.cv || '')
      setCoverLetter(latest.coverLetter || '')
      setResumeDraft((previous) => ({ ...previous, ...(latest.resumeDraft || {}) }))
      const savedThemeExists = jsonResumeThemes.some((theme) => theme.id === latest.selectedThemeId)
      setSelectedThemeId(savedThemeExists ? latest.selectedThemeId : selectedThemeId)
      setStatus('Saved.')
    } catch (err) {
      setError(err.message || 'Save failed.')
    }
  }

  async function handleDownloadHtml() {
    const downloadBlob = new Blob([renderedPreviewHtml], { type: 'text/html;charset=utf-8' })
    const objectUrl = URL.createObjectURL(downloadBlob)
    const link = document.createElement('a')
    link.href = objectUrl
    link.download = 'resume.html'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(objectUrl)
    setStatus('Downloaded resume.html')
  }

  async function handleDownloadPdf() {
    const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=980,height=900')
    if (!printWindow) {
      setError('Unable to open print window. Please allow popups and try again.')
      return
    }

    printWindow.document.open()
    printWindow.document.write(renderedPreviewHtml)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 250)
    setStatus('Print dialog opened. Choose Save as PDF.')
  }

  async function handleLogOut() {
    try {
      setError('')
      await homePresenter.logOut()
      setPendingTemplateId(null)
      setPendingThemeId(null)
      setStatus('Logged out.')
      navigateTo('landing', { clearHistory: true })
    } catch (err) {
      setError(err.message || 'Log out failed.')
    }
  }

  if (screen === 'home' && authUser) {
    return (
      <AppView
        user={authUser}
        cv={cv}
        coverLetter={coverLetter}
        resumeDraft={resumeDraft}
        selectedThemeId={selectedThemeId}
        themeOptions={jsonResumeThemes}
        previewHtml={renderedPreviewHtml}
        status={status}
        error={error}
        onCvChange={setCv}
        onCoverLetterChange={setCoverLetter}
        onResumeDraftChange={handleResumeDraftChange}
        onThemeChange={setSelectedThemeId}
        onSave={handleSave}
        onDownloadHtml={handleDownloadHtml}
        onDownloadPdf={handleDownloadPdf}
        onLogOut={handleLogOut}
      />
    )
  }

  if (screen === 'signup' && !authUser) {
    return (
      <SignUpView
        username={signUpUsername}
        email={signUpEmail}
        password={signUpPassword}
        status={status}
        error={error}
        onUsernameChange={setSignUpUsername}
        onEmailChange={setSignUpEmail}
        onPasswordChange={setSignUpPassword}
        onSignUpEmail={handleSignUpWithEmail}
        onSignInGoogle={handleSignInWithGoogleFromSignUp}
        onSignInApple={handleSignInWithAppleFromSignUp}
        onGoToLogIn={() => {
          clearFeedback()
          navigateTo('login')
        }}
        onBack={() => goBack(false)}
      />
    )
  }

  if (screen === 'login' && !authUser) {
    return (
      <LogInView
        email={logInEmail}
        password={logInPassword}
        status={status}
        error={error}
        onEmailChange={setLogInEmail}
        onPasswordChange={setLogInPassword}
        onLogInEmail={handleLogInWithEmail}
        onSignInGoogle={handleSignInWithGoogleFromLogIn}
        onSignInApple={handleSignInWithAppleFromLogIn}
        onGoToSignUp={() => {
          clearFeedback()
          navigateTo('signup')
        }}
        onBack={() => goBack(false)}
      />
    )
  }

  return (
    <LandingView
      isAuthenticated={Boolean(authUser)}
      onGoToLogIn={() => {
        clearFeedback()
        navigateTo('login')
      }}
      onGoToSignUp={() => {
        clearFeedback()
        navigateTo('signup')
      }}
      onCreateCv={() => {
        clearFeedback()
        navigateTo('signup')
      }}
      onUseTemplate={handleUseTemplate}
      onUseJsonTheme={handleUseJsonTheme}
    />
  )
}

export default App
