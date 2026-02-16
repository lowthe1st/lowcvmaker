import { extractFirstJson } from '../utils/extractJson.js'

const DEFAULT_MODEL = import.meta.env.VITE_WEBLLM_MODEL || 'Llama-3.2-1B-Instruct-q4f32_1-MLC'
let enginePromise = null

function buildPromptMessages(input) {
  if (typeof input === 'string') {
    return {
      messages: [{ role: 'user', content: input }],
      schemaHint: '',
      onProgress: null,
    }
  }

  const safe = input && typeof input === 'object' ? input : {}
  const baseMessages = Array.isArray(safe.messages) ? safe.messages : []
  const messages = baseMessages
    .filter((m) => m && typeof m.content === 'string' && (m.role === 'system' || m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({ role: m.role, content: m.content }))

  return {
    messages,
    schemaHint: typeof safe.schemaHint === 'string' ? safe.schemaHint : '',
    onProgress: typeof safe.onProgress === 'function' ? safe.onProgress : null,
  }
}

async function getEngine(onProgress) {
  if (!enginePromise) {
    enginePromise = (async () => {
      const { CreateMLCEngine } = await import('@mlc-ai/web-llm')

      return CreateMLCEngine(DEFAULT_MODEL, {
        initProgressCallback: (report) => {
          if (onProgress) {
            const progress = typeof report?.progress === 'number'
              ? Math.max(0, Math.min(1, report.progress))
              : null
            onProgress({
              text: report?.text || report?.progressText || `Loading model: ${Math.round((report?.progress || 0) * 100)}%`,
              progress,
              report,
            })
          }
        },
      })
    })()
  }

  return enginePromise
}

async function runModel(input) {
  const { messages, schemaHint, onProgress } = buildPromptMessages(input)
  const engine = await getEngine(onProgress)

  const systemParts = ['Return ONLY valid JSON. No markdown. No explanations. No extra text.']
  const nonSystemMessages = []

  for (const msg of messages) {
    if (msg.role === 'system') {
      systemParts.push(msg.content)
    } else {
      nonSystemMessages.push(msg)
    }
  }

  if (schemaHint) {
    nonSystemMessages.push({ role: 'user', content: `Schema hint:\n${schemaHint}` })
  }

  const response = await engine.chat.completions.create({
    messages: [{ role: 'system', content: systemParts.join('\n\n') }, ...nonSystemMessages],
    temperature: 0,
  })

  const content = response?.choices?.[0]?.message?.content
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part?.text === 'string' ? part.text : ''))
      .join('')
      .trim()
  }

  return ''
}

export async function runAiJson(userPrompt) {
  const rawText = await runModel(userPrompt)

  console.log('[AI raw response]', rawText)

  // 1) försök parse direkt
  let obj = null
  if (typeof rawText === 'string') {
    try { obj = JSON.parse(rawText) } catch { /* ignore */ }
  } else if (rawText && typeof rawText === 'object') {
    obj = rawText
  }

  // 2) annars plocka ut första JSON-biten
  if (!obj && typeof rawText === 'string') {
    obj = extractFirstJson(rawText)
  }

  if (!obj) {
    throw new Error('AI returned invalid JSON.')
  }

  // enkel validering så UI inte kraschar
  if ('suggestions' in obj && !Array.isArray(obj.suggestions)) {
    throw new Error('AI JSON field "suggestions" must be an array when present.')
  }

  return obj
}
