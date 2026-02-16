export function extractFirstJson(text) {
  if (typeof text !== 'string') return null

  // 1) Försök hitta ```json ... ```
  const fenced = text.match(/```json\s*([\s\S]*?)\s*```/i)
  if (fenced?.[1]) {
    const candidate = fenced[1].trim()
    return tryParse(candidate)
  }

  // 2) Försök hitta första {...} med enkel "balansering"
  const start = text.indexOf('{')
  if (start === -1) return null

  let depth = 0
  let inString = false
  let escape = false

  for (let i = start; i < text.length; i++) {
    const ch = text[i]

    if (inString) {
      if (escape) {
        escape = false
      } else if (ch === '\\') {
        escape = true
      } else if (ch === '"') {
        inString = false
      }
      continue
    }

    if (ch === '"') inString = true
    if (ch === '{') depth++
    if (ch === '}') depth--

    if (depth === 0) {
      const candidate = text.slice(start, i + 1).trim()
      return tryParse(candidate)
    }
  }

  return null
}

function tryParse(candidate) {
  try {
    return JSON.parse(candidate)
  } catch {
    return null
  }
}
