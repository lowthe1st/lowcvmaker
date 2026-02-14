import Handlebars from 'handlebars'
import * as evenThemeModule from 'jsonresume-theme-even'
import * as projectsThemeModule from 'jsonresume-theme-projects'
import { getThemeById } from './themeRegistry.js'
import shortTemplate from 'jsonresume-theme-short/resume.template?raw'
import shortCss from 'jsonresume-theme-short/style.css?raw'
import flatTemplate from 'jsonresume-theme-flat/resume.template?raw'
import flatCss from 'jsonresume-theme-flat/style.css?raw'

const themeLoaders = {
  even: async () => evenThemeModule,
  projects: async () => projectsThemeModule,
  short: async () => ({ render: renderShortTheme }),
  flat: async () => ({ render: renderFlatTheme }),
}

function createShortThemeRenderer() {
  const hbs = Handlebars.create()

  hbs.registerHelper('date', (date) => {
    if (!date) {
      return ''
    }

    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) {
      return ''
    }

    return parsed.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
  })

  hbs.registerHelper('paragraphSplit', (plaintext) => {
    const lines = String(plaintext || '')
      .split(/\r\n|\r|\n/g)
      .filter(Boolean)
      .map((line) => `<p>${hbs.escapeExpression(line)}</p>`)
      .join('')

    return new hbs.SafeString(lines)
  })

  const template = hbs.compile(shortTemplate)
  return (resumeJson) => template({ css: shortCss, resume: resumeJson })
}

function createFlatThemeRenderer() {
  const hbs = Handlebars.create()
  hbs.registerHelper('nl2br', (value) => String(value || '').replace(/\n/g, '</p><p>'))
  const template = hbs.compile(flatTemplate)
  return (resumeJson) => template({ css: flatCss, resume: resumeJson })
}

const renderShortTheme = createShortThemeRenderer()
const renderFlatTheme = createFlatThemeRenderer()

const themeAdapters = {
  short: () => renderShortTheme,
  flat: () => renderFlatTheme,
}

function resolveRenderFunction(themeId, themeModule) {
  const adapter = themeAdapters[themeId]
  if (typeof adapter === 'function') {
    return adapter(themeModule)
  }

  if (typeof themeModule?.render === 'function') {
    return themeModule.render
  }

  if (typeof themeModule?.default?.render === 'function') {
    return themeModule.default.render
  }

  if (typeof themeModule?.default === 'function') {
    return themeModule.default
  }

  if (typeof themeModule === 'function') {
    return themeModule
  }

  return null
}

export async function renderResumeHtml({ themeId, resumeJson }) {
  try {
    const themeEntry = getThemeById(themeId)

    if (!themeEntry) {
      return { ok: false, error: `Unknown theme id: ${themeId}` }
    }

    const themeLoader = themeLoaders[themeId]
    if (!themeLoader) {
      return { ok: false, error: `No loader configured for theme id: ${themeId}` }
    }

    const themeModule = await themeLoader()
    const render = resolveRenderFunction(themeId, themeModule)

    if (typeof render !== 'function') {
      return {
        ok: false,
        error: `Theme ${themeEntry.packageName} has unsupported exports. Expected render(resumeJson).`,
      }
    }

    const html = await render(resumeJson)

    if (!html || typeof html !== 'string') {
      return {
        ok: false,
        error: `Theme ${themeEntry.packageName} returned invalid HTML output.`,
      }
    }

    return { ok: true, html }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown rendering error.'
    return {
      ok: false,
      error: `Failed to render theme "${themeId}" (${getThemeById(themeId)?.packageName || 'unknown package'}): ${message}`,
    }
  }
}
